import { createBrandOptions } from '@/utils/validations';
import { useState } from 'react';
import Select from 'react-tailwindcss-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { isAvailableForToday } from '@/utils/validations';

const filterVehicles = (vehicles, brand, year, seats, horsepower, price, electric, emergency) => {
	return vehicles.filter(
		vehicle => {
			if (brand && brand.label !== vehicle.attributes.brand.data.attributes.brand) return false;
			if (year[0] > vehicle.attributes.year || year[1] < vehicle.attributes.year) return false;
			if (seats[0] > vehicle.attributes.seats || seats[1] < vehicle.attributes.seats) return false;
			if (horsepower[0] > vehicle.attributes.horsepower || horsepower[1] < vehicle.attributes.horsepower) return false;
			if (price[0] > vehicle.attributes.price || price[1] < vehicle.attributes.price) return false;
			if (electric && vehicle.attributes.electric !== true) return false;
			if (!electric && vehicle.attributes.electric === true) return false;
			if (emergency && !isAvailableForToday(vehicle.attributes.bookings.data)) return false;
			return true;
		}
	)
}

const VehicleFilterWidget = ({ brands, vehicles, handleFilterChange }) => {
	const [brand, setBrand] = useState(null);
	const [year, setYear] = useState([1970, 2023]);
	const [seats, setSeats] = useState([2, 10]);
	const [horsepower, setHorsepower] = useState([30, 1000]);
	const [price, setPrice] = useState([20, 10000]);
	const [electric, setElectric] = useState(false);
	const [emergency, setEmergency] = useState(false);

	const brandOptions = createBrandOptions(brands);


	const handleApplyFilter = () => {
		const filteredVehicles = filterVehicles(vehicles, brand, year, seats, horsepower, price, electric, emergency);
		console.log("filteredVehicles: ", filteredVehicles)
		handleFilterChange(filteredVehicles);
	}

	return (
		<div className="container">

			<div className='flex justify-center items-center mt-10'>
				<div className='w-1/2'>
					<div className='border-2 p-4 border-gray-300'>
						<p className='text-center font-semibold'>Марка</p>
						<Select
							options={brandOptions}
							value={brand}
							onChange={selectedOption => setBrand(selectedOption)}
							placeholder="Оберіть марку"
							primaryColor='yellow'
						/>
					</div>
					<div className='border-x-2 p-4 border-gray-300'>
						<p className='text-center font-semibold'>Кількість місць</p>
						<Slider
							min={2}
							max={10}
							defaultValue={5}
							onChange={value => setSeats(value)}
							value={seats}
							range
						/>
						<p className='text-center font-semibold'>{seats[0]} - {seats[1]}</p>
					</div>
					<div className='border-2 p-4 border-gray-300'>
						<p className='text-center font-semibold'>Кіньські сили</p>
						<Slider
							min={30}
							max={1000}
							defaultValue={[30, 1000]}
							onChange={value => setHorsepower(value)}
							value={horsepower}
							range
						/>
						<p className='text-center font-semibold'>{horsepower[0]} - {horsepower[1]}</p>
					</div>
					<div className='border-x-2 p-4 border-gray-300'>
						<p className='text-center font-semibold'>Ціна</p>
						<Slider
							min={20}
							max={10000}
							defaultValue={[20, 10000]}
							onChange={value => setPrice(value)}
							value={price}
							range
						/>
						<p className='text-center font-semibold'>{price[0]} - {price[1]} ₴/день</p>
					</div>
					<div className='border-x-2 border-t-2 p-4 border-gray-300'>
						<p className='text-center font-semibold'>Рік</p>
						<Slider
							min={1970}
							max={2023}
							range
							defaultValue={[1970, 2023]}
							allowCross={false}
							onChange={value => setYear(value)}
							value={year}
						/>
						<p className='text-center font-semibold'>{year[0]} - {year[1]}</p>
					</div>
					<div className='border-x-2 border-t-2 p-4 border-gray-300 text-center'>
						<p className='text-center font-semibold'>Електрокар</p>
						<input
							type="checkbox"
							value={electric}
							onChange={() => setElectric(!electric)}
						/>
					</div>
					<div className='border-2 p-4 border-gray-300 text-center'>
						<p className='text-center font-semibold'>Можливість термінової оренди</p>
						<input
							type="checkbox"
							value={emergency}
							onChange={() => setEmergency(!emergency)}
						/>
					</div>
					<div className=' text-center'>
						<button
							className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4'
							onClick={() => handleApplyFilter()}
						>
							Оновити
						</button>
					</div>
				</div>
			</div>

		</div>
	);

}

export default VehicleFilterWidget;