import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useAddBooking } from "@/hooks/booking";
import LoadingSpinner from './LoadingSpinner';
import { useRouter } from 'next/router';
import WarningTag from './WarningTag';
import { disabledDates, isAvailableForToday } from '@/utils/validations';



const RentVehicleWidget = ({ vehicleId, userOwnerId, currUserId, bookings }) => {
	const [rentVehicle, setRentVehicle] = useState(false);
	const [emergencyRent, setEmergencyRent] = useState(false);
	const [rentVehicleData, setRentVehicleData] = useState({
		startDate: null,
		endDate: null,
	});

	const { addBooking, addBookingError, addBookingLoading } = useAddBooking();
	const router = useRouter();

	const disabledDatesArray = disabledDates(bookings);
	const isAvailableEmergency = isAvailableForToday(bookings);

	const handleRentVehicle = () => {
		setRentVehicle(!rentVehicle);
	};

	const handleRentVehicleData = (newDate) => {
		setRentVehicleData(newDate);
		console.log(newDate);
	};

	const handleRentVehicleSubmit = async (e) => {
		e.preventDefault();
		if (!rentVehicleData.startDate || !rentVehicleData.endDate) {
			return;
		}

		const valid = await addBooking(currUserId, userOwnerId, vehicleId, rentVehicleData.startDate, rentVehicleData.endDate);
		if (valid) {
			console.log("valid");
			router.push("/my-bookings");

		}
	};

	const handleEmergencyRentVehicle = async () => {
		const today = new Date();
		const todayString = today.toISOString().split("T")[0];
		console.log(todayString);
		const valid = await addBooking(currUserId, userOwnerId, vehicleId, todayString, todayString, true);
		if (valid) {
			console.log("valid");
			router.push("/my-bookings");
		}
	};

	return (
		<div className="flex flex-col">
			<button className="border-2 border-yellow-200 bg-yellow-200 hover:bg-yellow-300 p-1 rounded-md m-2" onClick={handleRentVehicle}>
				Орендувати авто
			</button>

			{rentVehicle && (
				<div className="rent-vehicle-widget__form">
					<form onSubmit={handleRentVehicleSubmit}>
						<div className="form-group">
							<label htmlFor="startDate" className=' p-2'>Оберіть дні оренди</label>
							<Datepicker
								displayFormat="YYYY.MM.DD"
								value={rentVehicleData}
								onChange={handleRentVehicleData}
								showShortcuts={false}
								useRange={false}
								primaryColor={"amber"}
								inputClassName="border-2 border-gray-300 rounded-md w-full p-2"
								containerClassName="relative"
								disabledDates={disabledDatesArray}
							/>
						</div>

						<div className="flex justify-center items-center w-full">
							{addBookingLoading ? <LoadingSpinner /> : (
								<button
									className="border-2 border-yellow-200 bg-yellow-200 hover:bg-yellow-300 p-2 font-semibold rounded-md m-2">
									Орендувати
								</button>)}
							{addBookingError && <WarningTag>Помилка</WarningTag>}
						</div>
					</form>
				</div>
			)}
			<button className="border-2 border-yellow-200 bg-yellow-200 hover:bg-yellow-300 p-1 rounded-md m-2" onClick={() => setEmergencyRent(!emergencyRent)}>
				Термінова оренда
				{isAvailableEmergency ? <span className="text-green-600"> (доступно)</span> : <span className="text-red-500"> (недоступно)</span>}
			</button>
			{emergencyRent && isAvailableEmergency && (
				<div >
					<p className="text-center text-red-500">Термінова оренда доступна лише на сьогодні</p>
					<p className="text-center text-red-500">При терміновій оренді вам будуть відразу доступні контактні дані</p>
					<div className="flex justify-center items-center w-full">
						<button
							className="border-2 border-yellow-200 bg-yellow-200 hover:bg-yellow-300 p-2 font-semibold rounded-md m-2"
							disabled={!isAvailableEmergency}
							onClick={handleEmergencyRentVehicle}
						>
							Орендувати зараз
						</button>
					</div>
				</div>
			)}

		</div>
	);
}

export default RentVehicleWidget;