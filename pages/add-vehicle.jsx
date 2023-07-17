import Page from '@/components/Page';
import { getBrands } from '@/lib/brands';
import { getLocations } from '@/lib/locations';
import { useState } from 'react';
import Select from 'react-tailwindcss-select';
import WarningTag from '@/components/WarningTag';
import {
	yearValidation, createBrandOptions, createModelOptions,
	createLocationOptions, priceValidation, seatsValidation,
	horsepowerValidation
} from '@/utils/validations';
import { useAddVehicle } from '@/hooks/vehicle';
import { useUser } from '@/hooks/user';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/LoadingSpinner';


export const getStaticProps = async () => {
	const brands = await getBrands();
	const locations = await getLocations();
	return {
		props: {
			brands,
			locations
		},
		revalidate: parseInt(process.env.REVALIDATE_SECONDS),
	}

}

const AddVehicle = ({ brands, locations }) => {
	//console.log(brands)
	const [brand, setBrand] = useState(null);
	const [model, setModel] = useState(null);
	const [location, setLocation] = useState(null);
	const [electric, setElectric] = useState(false);
	const [year, setYear] = useState('');
	const [seats, setSeats] = useState('');
	const [horsepower, setHorsepower] = useState('');
	const [images, setImages] = useState(null);
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [validations, setValidations] = useState({
		year: null,
		price: null,
		seats: null,
		horsepower: null,
	});

	const { addVehicle, addVehicleError, addVehicleLoading } = useAddVehicle();
	const user = useUser();
	const router = useRouter();

	const handleBrandsChange = (selectedOption) => {
		setBrand(selectedOption);
		setModel(null);
		console.log("brand: ", selectedOption)
	}

	const handleYearChange = (year) => {
		setYear(year);
		const isValid = yearValidation(year);
		setValidations({ ...validations, year: isValid });
	}

	const handlePriceChange = (price) => {
		setPrice(price);
		const isValid = priceValidation(price);
		setValidations({ ...validations, price: isValid });
	}

	const handleSeatsChange = (seats) => {
		setSeats(seats);
		const isValid = seatsValidation(seats);
		setValidations({ ...validations, seats: isValid });
	}

	const handleHorsepowerChange = (horsepower) => {
		setHorsepower(horsepower);
		const isValid = horsepowerValidation(horsepower);
		setValidations({ ...validations, horsepower: isValid });
	}


	const optionsBrands = createBrandOptions(brands);

	const optionsModels = createModelOptions(brand?.value?.models);

	const optionsLocations = createLocationOptions(locations);


	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validations.year || !validations.price || !validations.seats || !validations.horsepower ||
			!brand || !model || !images || !location || !description)
			return;

		const formData = new FormData();

		const data = {
			brand: brand.value.id,
			model: model.label,
			year: year,
			seats: seats,
			horsepower: horsepower,
			user_owner: user.id,
			location: location.value,
			electric: electric,
			price: price,
			description: description,
		}
		formData.append("data", JSON.stringify(data));

		for (let i = 0; i < images.length; i++) {
			formData.append("files.photos", images[i]);
		}

		const valid = await addVehicle(formData);
		if (valid) {
			router.push('/profile');
			console.log("Vehicle added successfully")
		}
	};

	return (
		<Page title='Add Vehicle'>
			<div className="flex flex-col items-center justify-center min-h-screen py-2">
				<form className="flex flex-col items-center justify-center w-full flex-1 lg:px-20 text-center" onSubmit={handleSubmit}>
					<h1 className="text-6xl font-bold">
						Додати автомобіль
					</h1>

					<div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center mt-10">
						<h1 className="text-3xl font-bold">
							Що у вас за автомобіль?
						</h1>

						<div className="flex flex-col md:flex-row items-center justify-center w-full flex-1 lg:px-20 text-center mt-5">
							<Select
								value={brand}
								onChange={handleBrandsChange}
								options={optionsBrands}
								placeholder="Оберіть бренд"
								primaryColor='yellow'
							/>
							<Select
								value={model}
								onChange={model => setModel(model)}
								options={optionsModels}
								placeholder="Оберіть модель"
								primaryColor='yellow'
							/>
						</div>
						<div className="flex flex-col md:flex-row items-center justify-center w-full flex-1 mt-3 lg:px-20 text-center">
							<Select
								value={location}
								onChange={location => setLocation(location)}
								options={optionsLocations}
								placeholder="Оберіть місто"
								primaryColor='yellow'
							/>
							<div className="flex flex-row items-center ml-4 lg:px-6 w-full justify-between">
								<h1 className="font-bold mr-1">
									Електромобіль?
								</h1>
								<input
									type="checkbox"
									value={electric}
									onChange={() => setElectric(!electric)}
								/>
							</div>
						</div>
						<div className="flex flex-col md:flex-row items-center justify-center w-full flex-1 lg:px-20 text-center">
							<input
								className="border-2 border-gray-400 rounded-md p-3 mt-3 lg:mr-3 lg:w-1/2"
								type="number"
								placeholder="Введіть рік випуску"
								onChange={(e) => handleYearChange(e.target.value)}
								value={year}

							/>
							<input
								className="border-2 border-gray-400 rounded-md p-3 mt-3 lg:w-1/2"
								type="number"
								placeholder="Введіть ціну за добу"
								onChange={(e) => handlePriceChange(e.target.value)}
								value={price}
							/>
							{validations.year === false && <WarningTag > Введіть корректний рік </WarningTag>}
							{validations.price === false && <WarningTag > Введіть корректну ціну </WarningTag>}
						</div>
						<div className="flex flex-col md:flex-row items-center justify-center w-full flex-1 lg:px-20 text-center">
							<input
								className="border-2 border-gray-400 rounded-md p-3 mt-3 lg:mr-3 lg:w-1/2"
								type="number"
								placeholder="Введіть кількість місць"
								onChange={(e) => handleSeatsChange(e.target.value)}
								value={seats}
							/>
							<input
								className="border-2 border-gray-400 rounded-md p-3 mt-3 lg:w-1/2"
								type="number"
								placeholder="Потужність (к.с.)"
								onChange={(e) => handleHorsepowerChange(e.target.value)}
								value={horsepower}
							/>
							{validations.horsepower === false && <WarningTag>Введіть корректну потужність</WarningTag>}
							{validations.seats === false && <WarningTag >Введіть корректну кількість місць </WarningTag>}
						</div>
						<div className="flex flex-column items-center justify-center w-full flex-1 lg:px-20 text-center">
							<textarea
								className="border-2 border-gray-400 rounded-md p-3 mt-3 w-full"
								type="text"
								placeholder="Введіть опис"
								onChange={(e) => setDescription(e.target.value)}
								value={description}
							/>
						</div>

						<div className="flex flex-column items-center justify-center w-full  text-center">
							<input
								//className="border-2 border-black rounded-md p-3 mr-3"
								className='block text-sm text-slate-500
											file:mr-4 file:py-2 file:px-4
											file:rounded-full file:border-0
											file:text-sm file:font-semibold
											file:bg-yellow-200 file:text-yellow-700
											hover:file:bg-yellow-300 mt-3'
								type="file"
								placeholder="Upload Image"
								onChange={(e) => setImages(e.target.files)}
								multiple
							/>
						</div>

						<div className="flex flex-row items-center justify-center w-full flex-1 lg:px-20 text-center mt-10">
							{addVehicleLoading ? <LoadingSpinner /> : <button className="bg-black text-white p-3 rounded-md w-1/2" type='submit'>Додати автомобіль</button>}
							{/* <button className="bg-black text-white p-3 rounded-md w-1/2">Додати автомобіль</button> */}
							{addVehicleError && <WarningTag>Щось пішло не так</WarningTag>}
						</div>
					</div>
				</form>
			</div>

		</Page>
	)
}

export default AddVehicle;