/** @format */

import Stripe from 'stripe';

const apiKey = process.env.STRIPE_API_KEY;

export const stripe = new Stripe(apiKey ? apiKey : '', {
	apiVersion: '2020-08-27',
	appInfo: {
		name: 'News',
		version: '1.0.1',
	},
});
