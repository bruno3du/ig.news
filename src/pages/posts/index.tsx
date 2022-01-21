/** @format */

import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as prismic from '@prismicio/client';
import styles from './styles.module.scss';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Posts = {
	slug: string;
	title: string;
	excerpt: string;
	updateAt: string;
};

type PostsProps = {
	posts: Posts[];
};

export default function Posts({ posts }: PostsProps) {
	const { data: session } = useSession();

	function sendToPath(path) {
		if (session?.activeSubscription) {
			const pathToSubscribers = `/posts/${path}`;
			return pathToSubscribers;
		} else {
			const pathToVisitors = `/posts/preview/${path}`;
			return pathToVisitors;
		}
	}
	return (
		<>
			<Head>
				<title>Posts | ignews</title>
			</Head>

			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map((post) => (
						<Link key={post.slug} href={sendToPath(post.slug)}>
							<a>
								<time>{post.updateAt}</time>
								<strong>{post.title}</strong>
								<p>{post.excerpt}</p>
							</a>
						</Link>
					))}
				</div>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const prismicClient = getPrismicClient();

	const response = await prismicClient.get<any>({
		predicates: prismic.predicate.at('document.type', 'posts'),
		lang: 'pt-br',
		fetch: ['posts.title', 'posts.content'],
		pageSize: 100,
	});

	const posts = response.results.map<Posts>((post) => {
		const text = post.data.content;

		return {
			slug: post.uid,
			title: RichText.asText(post.data.title),
			excerpt: text.find((content) => content.type === 'paragraph').text ?? '',
			updateAt: new Date(post.last_publication_date).toLocaleDateString(
				'pt-br',
				{
					day: '2-digit',
					month: 'long',
					year: 'numeric',
				}
			),
		};
	});

	return {
		props: {
			posts,
		},
	};
};
