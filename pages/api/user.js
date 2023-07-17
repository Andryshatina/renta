import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;
const populationUrl = '?populate[vehicles][populate]=brand,photos,bookings.rental_user&populate[own_bookings][populate][vehicle][populate]=brand,photos,user_owner'

const handleUser = async (req, res) => {
	if (req.method !== 'GET') return res.status(405).end();

	try {
		const { jwt } = req.cookies;
		const user = await fetchJson(`${CMS_URL}/api/users/me${populationUrl}`, {
			headers: {
				'Authorization': `Bearer ${jwt}`,
			},
		});
		if (user) {
			console.log('user: ', user)
			return res.status(200).json({
				id: user.id, name: user.username, email: user.email,
				vehicles: user.vehicles, own_bookings: user.own_bookings
			});
		} else {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};

export default handleUser;