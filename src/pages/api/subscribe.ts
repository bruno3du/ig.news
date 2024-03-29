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

export default async function nextAuth(req: NextApiRequest, res: NextApiResponse) {
	const sucessUrl = process.env.STRIPE_SUCCESS_URL;
	const cancelUrl = process.env.STRIPE_CANCEL_URL;

	const session = await getSession({ req });

	const user = await fauna.query<User>(
		q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
	);

	let customerId = user.data.stripe_customer_id;

	if (!customerId) {
		const stripeCustomer = await stripe.customers.create({
			email: session.user.email,
		});

		await fauna.query(
			q.Update(q.Ref(q.Collection('users'), user.ref.id), {
				data: {
					stripe_customer_id: stripeCustomer.id,
				},
			})
		);

		customerId = user.data.stripe_customer_id;
		// verificar possivel erro de customerid === stripeCustomer
	}

	if (req.method === 'POST') {

		const stripeCheckoutSession = await stripe.checkout.sessions.create({
			customer: customerId,
			payment_method_types: ['card'],
			billing_address_collection: 'required',
			line_items: [{ price: 'price_1KGY9zIcn69nOO2TuFFFktER', quantity: 1 }],
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
