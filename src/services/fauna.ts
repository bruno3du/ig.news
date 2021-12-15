/** @format */

import { Client } from 'faunadb';

const faunaKey = process.env.FAUNADB_KEY;

if (typeof faunaKey === 'undefined' || faunaKey === '') {
	console.error('The FAUNADB_SECRET environment variable is not set, exiting.');
	process.exit(1);
}

export const fauna = new Client({
	secret: faunaKey,
});
