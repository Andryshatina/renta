import { useState } from 'react';
import Select from 'react-tailwindcss-select';
import { useAddReview } from '@/hooks/review';
import { useUser } from '@/hooks/user';
import LoadingSpinner from './LoadingSpinner';
import WarningTag from './WarningTag';


const WriteReviewWidget = ({ userId }) => {
	const [showReview, setShowReview] = useState(false);

	const [review, setReview] = useState('');
	const [reviewValid, setReviewValid] = useState(null);
	const [rating, setRating] = useState(
		{ value: 5, label: 5 }
	);

	const user = useUser();
	const { addReview, addReviewLoading, addReviewError } = useAddReview();

	const handleReviewChange = (e) => {
		setReview(e.target.value);
		if (review.length < 10) {
			setReviewValid(false);
		}
		else {
			setReviewValid(true);
		}
	};

	const handleAddReview = async () => {
		if (!reviewValid) {
			return;
		}

		const valid = await addReview(review, rating.value, user.id, userId);
		if (valid) {
			setShowReview(false);
			setReview('');
			setReviewValid(null);
			alert('Відгук додано');
		}
	};

	return (
		<div className="mt-2">
			<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowReview(!showReview)} >
				Написати відгук
			</button>
			{showReview && (
				<div className="mt-2">
					<textarea
						className="w-full h-24 border border-gray-300 rounded-md py-2 px-4"
						placeholder="Ваш відгук"
						value={review}
						onChange={handleReviewChange}
					/>
					{reviewValid === false && (
						<WarningTag>Відгук має бути не менше 10 символів</WarningTag>
					)}
					<p className=" font-semibold text-gray-800">Оцінка</p>
					<Select
						className="w-full mt-2"
						options={[
							{ value: 1, label: '1' },
							{ value: 2, label: '2' },
							{ value: 3, label: '3' },
							{ value: 4, label: '4' },
							{ value: 5, label: '5' },
						]}
						placeholder="Оцінка"
						value={rating}
						onChange={(e) => setRating(e)}
						primaryColor='yellow'
					/>
					{addReviewLoading ? (
						<LoadingSpinner />
					) : (
						<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleAddReview} >
							Надіслати
						</button>
					)}
					{addReviewError && (
						<WarningTag>Помилка додавання відгуку</WarningTag>
					)}

				</div>
			)}
		</div>

	)
}

export default WriteReviewWidget;