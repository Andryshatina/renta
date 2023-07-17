import { fetchJson } from '../../lib/api';

const { CMS_URL } = process.env;

const handleDeleteVehicle = async (req, res) => {
	// if (req.method !== 'DELETE') return res.status(405).end();
	const { jwt } = req.cookies;

	const { id } = req.query;

	if (!id) {
		return res.status(401).json({ message: 'Missing id' });
	}

	if (!jwt) return res.status(401).json({ message: 'Not authorized' });

	try {
		await fetchJson(`${CMS_URL}/api/vehicles/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`
			},
		});
		res.status(200).json({});

	} catch (error) {
		console.log('error: ', error);
		return res.status(401).end();
	}
}

export default handleDeleteVehicle;