/** @format */

import Img from 'next/image';
import SignInButton from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
	return (
		<div>
			<header className={styles.headerContainer}>
				<div className={styles.headerContent}>
					<div>
						<Img
							src='/images/logo.svg'
							alt='ig.news'
							width='180px'
							height='120px'
						/>
					</div>
					<nav>
						<a className={styles.active}>Home</a>
						<a href='#'>Posts</a>
					</nav>
					<SignInButton />
				</div>
			</header>
		</div>
	);
}
