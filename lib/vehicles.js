import { fetchJson } from './api';

const { CMS_URL } = process.env;


export async function getVehicles() {
	const data = await fetchJson(`${CMS_URL}/api/vehicles?populate=*`);
	const vehicles = data.data;
	//console.log(locations)
	//return {};
	return vehicles.map(stripVehicle);
}

export async function getVehicle(id) {
	const data = await fetchJson(`${CMS_URL}/api/vehicles/${id}?populate=*`);
	const vehicle = data.data;
	return stripVehicle(vehicle);
}

function stripVehicle(vehicle) {
	//console.log('vehicle: ', vehicle)
	const { id, attributes: { year, model, price, seats, horsepower, electric, description, photos, brand, user_owner, location, bookings } } = vehicle;
	return {
		id,
		year,
		model,
		price,
		description,
		photos,
		seats,
		horsepower,
		electric,
		brand: {
			id: brand.data.id,
			name: brand.data.attributes.brand,
		},
		user_owner: {
			id: user_owner.data.id,
			username: user_owner.data.attributes.username,
		},
		location: {
			id: location.data.id,
			location: location.data.attributes.location,
		},
		bookings: bookings.data
	};
}