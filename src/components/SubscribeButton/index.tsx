/** @format */

import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
	priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
	const { data: session } = useSession();

	function handleSubscribe() {
		if (!session) {
			signIn('github');
			return;
		}
	}
	return (
		<button type='button' className={styles.subscribeButton}>
			Subscribe now
		</button>
	);
}
