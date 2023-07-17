export const usernameValidation = (username) => {
	if (username.length < 3 || username.length > 20) return false;

	return true;
};

export const phoneValidation = (phone) => {
	if (!phone.match(/\+380\d{9}/)) return false;

	return true;
};

export const passwordValidation = (password) => {
	if (password.length < 8 ||
		password.length > 20 ||
		!password.match(/^[A-Za-z]\w{7,14}$/)
	)
		return false;

	return true;
};

export const confirmPasswordValidation = (password, confirmPassword) => {
	if (password !== confirmPassword) return false;

	return true;
};

export const yearValidation = (year) => {
	if (year.length !== 4 ||
		year < 1970 ||
		year > 2023
	)
		return false;

	return true;
}

export const priceValidation = (price) => {
	if (price <= 0 || price > 10000) return false;

	return true;
}

export const seatsValidation = (seats) => {
	if (seats <= 0 || seats > 20) return false;

	return true;
}

export const horsepowerValidation = (horsepower) => {
	if (horsepower <= 0 || horsepower > 1500) return false;

	return true;
}

export const createBrandOptions = (brands) => {
	return brands.map((brand) => {
		return {
			value: {
				id: brand.id,
				models: brand.models
			},
			label: brand.brand
		}
	})
}

export const createModelOptions = (models) => {
	models = models || [];

	return models.map((model) => {
		return {
			value: model.id,
			label: model.model
		}
	})
}

export const createLocationOptions = (locations) => {
	return locations.map((location) => {
		return {
			value: location.id,
			label: location.location
		}
	})
}

export const disabledDates = (bookings) => {
	const disabledDates = bookings.map((booking) => {
		return {
			startDate: booking.attributes.startDate,
			endDate: booking.attributes.endDate,
		};
	}
	);
	const today = new Date();
	const beforeToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
	const oneYearBeforeToday = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
	disabledDates.push({ startDate: oneYearBeforeToday, endDate: beforeToday });
	return disabledDates;
};

export const isAvailableForToday = (bookings) => {
	const today = new Date();
	const todayString = today.toISOString().split("T")[0];
	const bookingsToday = bookings.filter((booking) => {
		const startDate = new Date(booking.attributes.startDate);
		const endDate = new Date(booking.attributes.endDate);
		return (
			(today.getTime() > startDate.getTime() && today.getTime() < endDate.getTime()) ||
			(todayString == booking.attributes.startDate && todayString == booking.attributes.endDate)
		);
	});
	return bookingsToday.length === 0;
};