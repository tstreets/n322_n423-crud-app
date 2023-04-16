import React from 'react';
import '@/styles/globals.css';
import useFirebase from '../useHooks/useFirebase';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
	const firebase = useFirebase();
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						{firebase.currentUser.email ? (
							<button onClick={firebase.logoutUser}>Logout</button>
						) : (
							<button onClick={firebase.loginUser}>Login</button>
						)}
					</li>
				</ul>
			</nav>
			<Component {...pageProps} />
		</>
	);
}
