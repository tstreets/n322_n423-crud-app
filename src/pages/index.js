import React from 'react';
import useFirebase from '../useHooks/useFirebase';
import Message from '../components/Message';
import useGlobalValues from '../useHooks/useGlobalValues';

export default function HomePage() {
	const firebase = useFirebase();
	const { booksList, update, error } = useGlobalValues();

	const booksListComponents = booksList.map(book => {
		return <li key={book.id}>{book.name}</li>;
	});

	async function pullBooksFromDb() {
		try {
			if (!firebase.currentUser.email) throw { code: 'auth-failed', name: 'Firebase Auth' };
			const books = await firebase.getBooks();
			update({ booksList: books, error: '' });
		} catch (e) {
			if (e.code === 'auth-failed' && e.name === 'Firebase Auth') {
				update({ error: `${e.name} (${e.code}): You need to login for getting the book list.` });
			} else {
				update({ error: e.toString() });
			}
		}
	}

	return (
		<>
			<h1>My Name: {firebase.currentUser.displayName || '--'}</h1>
			<button onClick={pullBooksFromDb}>Get Books</button>
			<ul>{booksListComponents}</ul>
			{error ? (
				<>
					<Message type='error'>{error}</Message>
				</>
			) : (
				<></>
			)}
		</>
	);
}
