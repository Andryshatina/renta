import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

const handleConfirmBooking = async (req, res) => {
	if (req.method !== 'PUT') return res.status(405).end();

	const { id } = req.body;
	const { jwt } = req.cookies;

	if (!id) {
		return res.status(401).json({ message: 'Missing id' });
	}
	if (!jwt) return res.status(401).json({ message: 'Not authorized' });

	const data = {
		confirmed: true
	}

	try {
		await fetchJson(`${CMS_URL}/api/bookings/${id}`, {
			method: 'PUT',
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

export default handleConfirmBooking;