import { fetchJson } from '../../lib/api';
import cookie from 'cookie';

const { CMS_URL } = process.env;

const handleLogin = async (req, res) => {
	if (req.method !== 'POST') return res.status(405).end();

	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(401).json({ message: 'Missing email or password' });
	}

	try {
		const { jwt, user } = await fetchJson(`${CMS_URL}/api/auth/local`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ identifier: email, password }),
		});
		res.status(200)
			.setHeader('Set-Cookie', cookie.serialize('jwt', jwt, {
				httpOnly: true,
				path: '/api',
			}))
			.json({ id: user.id, name: user.username });

	} catch (error) {
		return res.status(401).end();
	}
};

export default handleLogin;