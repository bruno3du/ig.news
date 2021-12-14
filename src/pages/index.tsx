/** @format */

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import SubscribeButton from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from '../styles/home.module.scss';
import format from '../utils/format';

interface HomeProps {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }: HomeProps) {
	return (
		<>
			<Head>
				<title>Home | ig.news</title>
			</Head>

			<main className={styles.contentContainer}>
				<section className={styles.hero}>
					<span>👏 Hey, welcome</span>
					<h1>
						News about the <span>React</span> world.
					</h1>
					<p>
						Get access to all the publications <br />
						<span>for {format(product.amount)} month</span>
					</p>
					<SubscribeButton priceId={product.priceId} />
				</section>
				<Image
					src='/images/avatar.svg'
					alt='Girl coding'
					width='336px'
					height='521px'
				/>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const price = await stripe.prices.retrieve('price_1K6IKYIcn69nOO2TCYRijbPm', {
		expand: ['product'],
	});

	const product = {
		priceId: price.id,
		amount: price.unit_amount ? price.unit_amount / 100 : 0,
	};
	return {
		props: {
			product,
		},
	};
};
