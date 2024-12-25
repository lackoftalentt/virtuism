import { db } from '@/firebase';
import {
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { Review } from '../types/types';

export const addReview = async (
	movieId: string,
	userId: string | null,
	userName: string | null,
	text: string,
	email: string
) => {

	await addDoc(collection(db, 'reviews'), {
		movieId,
		userId,
		userName,
		text,
		email
	});
};

export const getReviews = async (movieId: string): Promise<Review[]> => {
	const q = query(collection(db, 'reviews'), where('movieId', '==', movieId));
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(doc => {
		const data = doc.data();
		return {
			id: doc.id,
			movieId: data.movieId,
			userId: data.userId,
			userName: data.userName,
			text: data.text,
			email: data.email
		} as Review;
	});
};

export const subscribeToReviews = (
	movieId: string,
	callback: (reviews: Review[]) => void
) => {
	const q = query(collection(db, 'reviews'), where('movieId', '==', movieId));

	return onSnapshot(q, snapshot => {
		const reviews = snapshot.docs.map(doc => {
			const data = doc.data();
			return {
				id: doc.id,
				movieId: data.movieId,
				userId: data.userId,
				userName: data.userName,
				text: data.text,
				email: data.email
			} as Review;
		});

		callback(reviews);
	});
};
