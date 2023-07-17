import { fetchJson } from '../../lib/api';
import cookie from 'cookie';

const { CMS_URL } = process.env;

const handeSignup = async (req, res) => {
	if (req.method !== 'POST') return res.status(405).end();

	const { email, password, username, phone_number, telegram } = req.body;

	if (!email || !password || !username || !phone_number) {
		return res.status(401).json({ message: 'Missing email, password or username' });
	}
	//console.log('data: ', email, password, username);

	try {
		//console.log('CMS_URL: ', CMS_URL)
		const { jwt, user } = await fetchJson(`${CMS_URL}/api/auth/local/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, email, password, phone_number, telegram }),
		});
		//console.log('jwt: ', jwt);
		res.status(200)
			.setHeader('Set-Cookie', cookie.serialize('jwt', jwt, {
				httpOnly: true,
				path: '/api',
			}))
			.json({ id: user.id, name: user.username });

	} catch (error) {
		console.log('error: ', error);
		return res.status(401).end();
	}
}

export default handeSignup;