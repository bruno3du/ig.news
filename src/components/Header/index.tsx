/** @format */

import Img from 'next/image';
import Link from 'next/link';
import SignInButton from '../SignInButton';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink';

export function Header() {
	const { asPath } = useRouter();
	console.log(asPath);
	return (
		<div>
			<header className={styles.headerContainer}>
				<div className={styles.headerContent}>
					<div>
						<Link passHref href='/'>
							<Img
								src='/images/logo.svg'
								alt='ig.news'
								width='180px'
								height='120px'
							/>
						</Link>
					</div>
					<nav>
						<ActiveLink activeClassName={styles.active} href='/'>
							<a>Home</a>
						</ActiveLink>
						<ActiveLink activeClassName={styles.active} href='/posts'>
							<a>Posts</a>
						</ActiveLink>
					</nav>
					<SignInButton />
				</div>
			</header>
		</div>
	);
}
