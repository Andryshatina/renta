import { fetchJson } from './api';

const { CMS_URL } = process.env;


export async function getLocations() {
	const data = await fetchJson(`${CMS_URL}/api/locations?populate[vehicles][populate]=brand,photos`);
	const locations = data.data;
	//console.log(locations)
	//return {};
	return locations.map(stripLocation);
}

export async function getLocation(id) {
	const data = await fetchJson(`${CMS_URL}/api/locations/${id}?populate[vehicles][populate]=brand,photos,bookings`);
	const location = data.data;
	return stripLocation(location);
}

function stripLocation(locat) {
	//console.log('locat: ', locat)
	const { id, attributes: { location, vehicles } } = locat;
	return {
		id,
		location,
		vehicles,
	};
}