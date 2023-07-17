export class ApiError extends Error {
	constructor(url, status) {
		super(`'${url}' returned ${status}`);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
		this.name = 'ApiError';
	}
}

export async function fetchJson(url, init = undefined) {
	const res = await fetch(url, init);
	console.log('url: ', url, 'init: ', init)
	if (!res.ok) throw new ApiError(url, res.status);
	return res.json();
}