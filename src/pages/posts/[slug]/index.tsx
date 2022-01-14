/** @format */

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../../services/prismic';
import styles from './styles.module.scss';

type Post = {
	slug: string;
	title: string;
	content: string;
	updateAt: string;
};

type PostProps = {
	post: Post;
};

export default function Post({ post }: PostProps) {
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
						className={styles.postContent}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</article>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	const session = await getSession({ req });
	const { slug } = params;

	console.log(slug);

	const prismic = getPrismicClient(req);

	const response = await prismic.getByUID('posts', String(slug));

	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content),
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
	};
};
