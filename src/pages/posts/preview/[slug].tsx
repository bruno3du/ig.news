/** @format */

import { GetStaticPaths, GetStaticProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { getPrismicClient } from '../../../services/prismic';
import styles from '../[slug]/styles.module.scss';

type Post = {
	slug: string;
	title: string;
	content: string;
	updateAt: string;
};

type PreviewProps = {
	post: Post;
};

export default function Preview({ post }: PreviewProps) {
	const router = useRouter();
	const { data: session } = useSession();

	useEffect(() => {
		if (session?.activeSubscription) {
			router.push(`/posts/${post.slug}`);
		}
		//eslint-disable-next-line
	}, [session]);

	return (
		<>
			<Head>
				<title>{post.title} | | Ignews</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<time>{post.updateAt}</time>
					<div
						className={`${styles.postContent} ${styles.previewContent}`}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
					<div className={styles.continueReading}>
						Wanna Continue Reading?
						<Link href='/'>
							<a>Subscribe now 🤗</a>
						</Link>
					</div>
				</article>
			</main>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params;

	const prismic = getPrismicClient();
	const response = await prismic.getByUID<any>('posts', String(slug));

	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content.splice(0, 3)),
		updateAt: new Date(response.last_publication_date).toLocaleDateString(
			'pt-br',
			{
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}
		),
	};

	return {
		props: {
			post,
		},
		revalidate: 60 * 30, // 30 minutos
	};
};
