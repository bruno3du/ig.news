/** @format */

import Stripe from 'stripe';

const apiKey = process.env.STRIPE_API_KEY;

if (typeof apiKey === 'undefined' || apiKey === '') {
	console.error('The FAUNADB_SECRET environment variable is not set, exiting.');
	process.exit(1);
}

export const stripe = new Stripe(apiKey, {
	apiVersion: '2020-08-27',
	appInfo: {
		name: 'News',
		version: '1.0.1',
	},
});
