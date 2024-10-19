import { useEffect, useState } from "react";
import "./App.css";
import ExpenseItem from "./components/ExpenseItem";
import AddExpenseItem from "./components/AddExpenseItem";
import { Expenses } from "./Expense";

function App() {
  const [historyList, setHistoryList] = useState<Expenses[]>([
    { id: 1, title: "Car", amount: -1000 },
    { id: 2, title: "Salary", amount: 2000 },
    { id: 3, title: "Rent", amount: -500 },
  ]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, seteditId] = useState<number | null>(null);

  function deleteItem(id: number) {
    const newHistoryList = historyList.filter(
      (item: Expenses) => item.id !== id
    );
    setHistoryList(newHistoryList);
  }

  function addExpenseItem(item: { title: string; amount: string }) {
    historyList.sort((a: Expenses, b: Expenses) => a.id - b.id);
    const id =
      historyList.length === 0 ? 0 : historyList[historyList.length - 1].id;
    const newItem = {
      id: id + 1,
      title: item.title,
      amount: parseInt(item.amount),
    };
    setHistoryList((prev: Expenses[]) => [...prev, newItem]);
  }

  function editExpense(id: number) {
    setEdit(true);
    const item = historyList.find((item: Expenses) => item.id === id);
    seteditId(id);
    setTitle(item!.title);
    setAmount(item!.amount.toString());
  }

  function editExpenseItem(item: { title: string; amount: string }) {
    const newItem = {
      id: editId!,
      title: item.title,
      amount: parseInt(item.amount),
    };
    const newHistoryList = historyList.map((item: Expenses) => {
      if (item.id === editId) {
        return newItem;
      }
      return item;
    });
    setHistoryList(newHistoryList);
    setEdit(false);
  }

  function calculateTotal() {
    let expense = 0;
    let income = 0;
    historyList.forEach((item: Expenses) => {
      if (item.amount > 0) {
        income += item.amount;
      } else {
        expense += item.amount;
      }
    });
    setIncome(income);
    setExpense(expense);
  }

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyList]);

  return (
    <>
      <h1>Expense Tracker</h1>
      <div>
        <h3>Balance : {income + Math.abs(expense)}</h3>
      </div>
      <div className="container">
        <div className="income">
          <h2>Income</h2>
          <h3>{income}</h3>
        </div>
        <div className="expense">
          <h2>Expense</h2>
          <h3>{expense}</h3>
        </div>
      </div>
      <AddExpenseItem
        isEdit={edit}
        title={title}
        amount={amount}
        setTitle={setTitle}
        setAmount={setAmount}
        addExpenseItem={addExpenseItem}
        editExpenseItem={editExpenseItem}
      />
      <div className="history">
        <h1>History</h1>
        {historyList.map(
          (item: { id: number; title: string; amount: number }) => {
            return (
              <ExpenseItem
                key={item.id}
                title={item.title}
                amount={item.amount}
                onEdit={() => editExpense(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            );
          }
        )}
      </div>
    </>
  );
}

export default App;
