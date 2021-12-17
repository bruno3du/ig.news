/** @format */

import { NextApiRequest, NextApiResponse } from 'next';

export default function webHooks(req: NextApiRequest, res: NextApiResponse) {
	console.log('Evento Recebido');

	res.status(200).json({ ok: true });
}
