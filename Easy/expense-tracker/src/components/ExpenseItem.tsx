export default function ExpenseItem({
  title,
  amount,
  onEdit,
  onDelete,
}: {
  title: string;
  amount: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const expenseType = amount > 0 ? "income-bg" : "expense-bg";
  return (
    <>
      <div className={`expense-item ${expenseType}`}>
        <div>
          <h2 className="m-10">{title}</h2>
          <h3 className="m-10 t-l">{amount}</h3>
        </div>
        <div>
          <button className="mr-10" onClick={onEdit}>
            ✏️
          </button>
          <button onClick={onDelete}>🗑️</button>
        </div>
      </div>
    </>
  );
}
