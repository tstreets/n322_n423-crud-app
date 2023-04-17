import React from 'react';
import '@/styles/globals.css';
import useFirebase from '../useHooks/useFirebase';
import Link from 'next/link';
import { GlobalProvider } from '../useHooks/useGlobalValues';

export default function App({ Component, pageProps }) {
	const initialGlobalValues = {
		booksList: [],
		error: '',
	};
	const [globalValues, setGlobalValues] = React.useState(initialGlobalValues);

	function updateGlobalValues(newValues) {
		setGlobalValues({ ...globalValues, ...newValues });
	}

	const firebase = useFirebase();
	return (
		<>
			<GlobalProvider value={{ ...globalValues, update: updateGlobalValues }}>
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
			</GlobalProvider>
		</>
	);
}
