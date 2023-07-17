import { fetchJson } from './api';

const { CMS_URL } = process.env;


export async function getBrands() {
	const data = await fetchJson(`${CMS_URL}/api/brands?populate=*`);
	const brands = data.data;
	//console.log(brands)
	//return {};
	return brands.map(stripBrand);
}

export async function getBrand(id) {
	const product = await fetchJson(`${CMS_URL}/api/brands/${id}?populate=*`);
	return stripProduct(product);
}

function stripBrand(branda) {
	const { id, attributes: { brand }, attributes: { models } } = branda;
	//console.log(brand, models)
	return {
		id,
		brand,
		models,
	};
}
