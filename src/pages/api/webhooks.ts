/** @format */

import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

async function buffer(readable: Readable) {
	const chunks = [];

	for await (const chunk of readable) {
		chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
	}

	return Buffer.concat(chunks);
}

export const config = {
	bodyParser: false,
};

const relevantEvents = new Set([
	'checkout.session.completed',
	'checkout.session.created',
	'checkout.session.updated',
	'checkout.session.deleted',
]);

export default async function webHooks(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const buf = await buffer(req);
		const secret = await req.headers['stripe-signature'];
		const stripeWebhooks = process.env.STRIPE_WEBHOOK_SECRET;

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(buf, secret, stripeWebhooks);
		} catch (err: any) {
			return res.status(400).send(`Webhooks error: ${err.message}`);
		}

		const { type } = event;

		if (relevantEvents.has(type)) {
			try {
				switch (type) {
					case 'checkout.session.completed':
						const checkoutSession = event.data
							.object as Stripe.Checkout.Session;

						await saveSubscription(
							checkoutSession.subscription.toString(),
							checkoutSession.customer.toString()
						);
						break;
					default:
						throw new Error('Unhandled event.');
				}
			} catch (err: any) {
				return res.json({ error: 'Webhook handler failed' });
			}
		}

		res.status(200).json({ received: true });
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method not allowed');
	}
}
