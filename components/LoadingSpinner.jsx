
const LoadingSpinner = ({ size = 'sm' }) => {
	return (
		<div className="flex justify-center items-center">
			<div className={`animate-spin rounded-full
			${size == 'sm' ? 'h-8 w-8' : size == 'md' ? 'h-16 w-16' : 'h-32 w-32'}
			border-t-2 border-b-2 border-amber-900`}></div>
		</div>
	)
};

export default LoadingSpinner;