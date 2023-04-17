import React from 'react';
import useFirebase from '../useHooks/useFirebase';
import Message from '../components/Message';

export default function HomePage() {
	const firebase = useFirebase();
	const [booksList, setBooksList] = React.useState([]);
	const [error, setError] = React.useState('');

	const booksListComponents = booksList.map(book => {
		return <li key={book.id}>{book.name}</li>;
	});

	async function pullBooksFromDb() {
		try {
			if (!firebase.currentUser.email) throw { code: 'auth-failed', name: 'Firebase Auth' };
			const books = await firebase.getBooks();
			setBooksList(books);
			setError('');
		} catch (e) {
			if (e.code === 'auth-failed' && e.name === 'Firebase Auth') {
				setError(`${e.name} (${e.code}): You need to login for getting the book list.`);
			} else {
				setError(e.toString());
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
