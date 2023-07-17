import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

const handleAddBooking = async (req, res) => {
	if (req.method !== 'POST') return res.status(405).end();

	const { jwt } = req.cookies;

	if (!jwt) return res.status(401).json({ message: 'Not authorized' });

	const { rental_user, user_whom_rented, vehicle, startDate, endDate, emergency } = req.body;

	if (!rental_user || !user_whom_rented || !vehicle || !startDate || !endDate) {
		return res.status(401).json({ message: 'Missing something' });
	}

	const data = {
		rental_user,
		user_whom_rented,
		vehicle,
		startDate,
		endDate,
		emergency
	}

	try {
		await fetchJson(`${CMS_URL}/api/bookings`, {
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

export default handleAddBooking;