
const Field = ({ title, children }) => {
	return (
		<label className="flex flex-wrap -mx-3 mb-4">
			<div className="w-full px-3">
				<span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					{title}
				</span>
				{children}
			</div>
		</label>

	);
};

export default Field;