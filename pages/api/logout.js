import cookie from 'cookie';

const handleLogout = async (req, res) => {
	res.status(200)
		.setHeader('Set-Cookie', cookie.serialize('jwt', '', {
			maxAge: -1,
			path: '/api'
		}))
		.json({});
	res.end();
};

export default handleLogout;