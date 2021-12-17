/** @format */

import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../services/stripe';
import { getSession } from 'next-auth/react';
import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

type User = {
	ref: {
		id: string;
	};
	data: {
		stripe_customer_id: string;
	};
};

export default async function subscribe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const sucessUrl = process.env.STRIPE_SUCCESS_URL;
	const cancelUrl = process.env.STRIPE_CANCEL_URL;

	const session = await getSession({ req });
	if (!session?.user?.email) return;

	const user = await fauna.query<User>(
		q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
	);

	let customerId = user.data.stripe_customer_id;

	if (!customerId) {
		const stripeCustomer = await stripe.customers.create({
			email: session.user?.email,
		});

		await fauna.query(
			q.Update(q.Ref(q.Collection('users'), user.ref.id), {
				data: {
					stripe_customer_id: stripeCustomer.id,
				},
			})
		);

		customerId = user.data.stripe_customer_id
	}



	if (typeof sucessUrl === 'undefined' || sucessUrl === '') {
		console.error(
			'The FAUNADB_SECRET environment variable is not set, exiting.'
		);
		process.exit(1);
	}

	if (typeof cancelUrl === 'undefined' || cancelUrl === '') {
		console.error(
			'The FAUNADB_SECRET environment variable is not set, exiting.'
		);
		process.exit(1);
	}

	if (req.method === 'POST') {
		const stripeCheckoutSession = await stripe.checkout.sessions.create({
			customer: customerId,
			payment_method_types: ['card'],
			billing_address_collection: 'required',
			line_items: [{ price: 'price_1K6IKYIcn69nOO2TCYRijbPm', quantity: 1 }],
			mode: 'subscription',
			allow_promotion_codes: true,
			success_url: sucessUrl,
			cancel_url: cancelUrl,
		});

		return res.status(200).json({
			sessionId: stripeCheckoutSession.id,
		});
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method not allowed');
	}
}
