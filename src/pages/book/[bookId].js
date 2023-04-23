import React from 'react';
import { useRouter } from 'next/router';

export default function BookViewPage() {
	const router = useRouter();
	const { bookId } = router.query;

	return (
		<>
			<h1>Book #{bookId}</h1>
		</>
	);
}
