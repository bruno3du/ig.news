/** @format */

import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../services/stripe';
import { getSession } from 'next-auth/react';

export default async function subscribe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const sucessUrl = process.env.STRIPE_SUCCESS_URL;
	const cancelUrl = process.env.STRIPE_CANCEL_URL;

	const session = await getSession({ req });
	if (!session?.user?.email) return;

	const stripeCustomer = await stripe.customers.create({
		email: session.user?.email,
	});

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
			customer: stripeCustomer.id,
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
