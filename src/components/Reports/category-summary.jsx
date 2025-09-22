export default function CategorySummary({ data, totalSalary }) {
  const percent = 100;

  return (
    <div className="flex flex-col space-y-4">
      {data.map((item) => {
        const percentage =
          totalSalary > 0 ? (item.value / totalSalary) * percent : 0;

        return (
          <div className="flex items-center justify-between" key={item.id}>
            {/* Categoria + marcador colorido */}
            <div className="flex items-center gap-3">
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{
                  backgroundColor: ['#2979FF'],
                }}
              />
              <span className="font-medium text-gray-700 text-sm">
                {item.name}
              </span>
            </div>

            {/* Valores */}
            <div className="text-right">
              <p className="font-semibold text-gray-800 text-sm">
                R${item.value.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-gray-400 text-xs">{percentage.toFixed(2)}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
