export default function Tab({ name, isActive, onClick }) {
  return (
    <button
      className={`whitespace-nowrap border-b-2 px-1 py-3 font-medium text-sm transition-colors ${
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }
      `}
      onClick={onClick}
      type="button"
    >
      {name}
    </button>
  );
}
