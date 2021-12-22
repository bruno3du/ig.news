/** @format */

import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';

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

const relevantEvents = new Set(['checkout.session.completed']);

export default async function webHooks(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const buf = await buffer(req);
		const secret = await req.headers['stripe-signature'];
		const stripeWebhooks = process.env.STRIPE_WEBHOOK_SECRET;

		if (!stripeWebhooks) {
			throw new Error('Erro no serviço de Pagamento');
		}

		if (!secret) {
			throw new Error('Erro no serviço de Pagamento');
		}

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(buf, secret, stripeWebhooks);
		} catch (err: any) {
			return res.status(400).send(`Webhooks error: ${err.message}`);
		}

		const { type } = event;

		if (relevantEvents.has(type)) {
			console.log('evento recebido', event);
		}

		res.status(200).json({ received: true });
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method not allowed');
	}
}
