import { fetchJson } from './api';

const { CMS_URL } = process.env;


export async function getReviews(id) {
	const user = await fetchJson(`${CMS_URL}/api/users/${id}?populate[reviews_from_users][populate]=*`);

	return user.reviews_from_users.map(stripReview);
}


function stripReview(review) {
	//console.log('review: ', review)
	const { id, text, rating, from } = review;
	return {
		id,
		text,
		rating,
		user_id: from.id,
		username: from.username
	};
}