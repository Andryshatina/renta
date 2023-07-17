import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

const handleAddReview = async (req, res) => {
	if (req.method !== 'POST') return res.status(405).end();

	const { jwt } = req.cookies;

	if (!jwt) return res.status(401).json({ message: 'Not authorized' });

	const { text, rating, from, to } = req.body;

	if (!text || !from || !to || !rating) {
		return res.status(401).json({ message: 'Missing something' });
	}

	const data = {
		text, rating, from, to
	}

	try {
		await fetchJson(`${CMS_URL}/api/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`
			},
			body: JSON.stringify({ data }),
		});
		res.status(200).json({});

	} catch (error) {
		console.log('error: ', error);
		return res.status(401).end();
	}
}

export default handleAddReview;