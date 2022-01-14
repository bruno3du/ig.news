/** @format */

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
	priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
	const { data: session } = useSession();
	const router = useRouter();

	async function handleSubscribe() {
		if (!session) {
			await signIn('github');
			return;
		}

		if (session.activeSubscription) {
			router.push('/posts');

			return;
		}
		//checkout session
		try {
			const response = await api.post('/subscribe');
			const { sessionId } = await response.data;
			const stripe = await getStripeJs();
			await stripe?.redirectToCheckout({ sessionId });
		} catch (err: any) {
			alert(err.message);
		}
	}
	return (
		<button
			type='button'
			onClick={handleSubscribe}
			className={styles.subscribeButton}>
			Subscribe now
		</button>
	);
}
