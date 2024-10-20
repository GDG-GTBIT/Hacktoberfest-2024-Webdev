import "./AddExpenseItem.css";

export default function AddExpenseItem({
  isEdit,
  title,
  amount,
  setTitle,
  setAmount,
  addExpenseItem,
  editExpenseItem,
}: {
  isEdit: boolean;
  title: string;
  amount: string;
  setTitle: (title: string) => void;
  setAmount: (amount: string) => void;
  addExpenseItem: (item: { title: string; amount: string }) => void;
  editExpenseItem: (item: { title: string; amount: string }) => void;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title.trim() && amount.trim()) {
      if (isEdit) {
        editExpenseItem({ title, amount });
        setTitle("");
        setAmount("");
      } else {
        addExpenseItem({ title, amount });
        setTitle("");
        setAmount("");
      }
    }
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <h3 className="text-black">{isEdit ? "Edit" : "Add"} Expense</h3>
      <label htmlFor="name">Name</label>
      <input
        required
        type="text"
        className="form-control"
        id="name"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label htmlFor="cost">Cost</label>
      <input
        required
        type="text"
        className="form-control"
        id="cost"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <button type="submit">{isEdit ? "Update" : "Save"}</button>
    </form>
  );
}
