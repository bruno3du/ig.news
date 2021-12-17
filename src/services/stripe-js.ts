/** @format */

import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {
	const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

	if (!stripePublicKey) {
		console.error(
			'The STRIPE_PUBLIC_KEY environment variable is not set, exiting.'
		);
		process.exit(1);
	}

	const stripeJs = await loadStripe(stripePublicKey);
	return stripeJs
}
