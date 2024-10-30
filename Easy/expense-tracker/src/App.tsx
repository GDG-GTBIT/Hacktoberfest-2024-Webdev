import { useEffect, useState } from "react";
import "./App.css";
import ExpenseItem from "./components/ExpenseItem";
import AddExpenseItem from "./components/AddExpenseItem";
import { Expenses } from "./Expense";

// Type definition for consistency
interface Expense {
  id: number;
  title: string;
  amount: number;
}

function App() {
  // Initialize state for history of expenses/incomes
  const [historyList, setHistoryList] = useState<Expense[]>([
    { id: 1, title: "Car", amount: -1000 },
    { id: 2, title: "Salary", amount: 2000 },
    { id: 3, title: "Rent", amount: -500 },
  ]);

  // State for total income and expenses
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Delete an item by filtering it out
  function deleteItem(id: number) {
    const newHistoryList = historyList.filter(
      (item: Expense) => item.id !== id
    );
    setHistoryList(newHistoryList);
  }

  // Add a new expense/income item
  function addExpenseItem(item: { title: string; amount: string }) {
    const id = historyList.length > 0 ? historyList[historyList.length - 1].id + 1 : 1;
    const newItem: Expense = {
      id,
      title: item.title,
      amount: parseInt(item.amount),
    };
    setHistoryList((prev: Expense[]) => [...prev, newItem]);
  }

  // Edit an existing expense/income item
  function editExpense(id: number) {
    setEdit(true);
    const item = historyList.find((item: Expense) => item.id === id);
    if (item) {
      setEditId(id);
      setTitle(item.title);
      setAmount(item.amount.toString());
    }
  }

  // Update the edited expense/income item in the list
  function editExpenseItem(item: { title: string; amount: string }) {
    const newItem: Expense = {
      id: editId!,
      title: item.title,
      amount: parseInt(item.amount),
    };
    const newHistoryList = historyList.map((item: Expense) => {
      return item.id === editId ? newItem : item;
    });
    setHistoryList(newHistoryList);
    setEdit(false);
  }

 
  function calculateTotal() {
    let totalExpense = 0;
    let totalIncome = 0;
    historyList.forEach((item: Expense) => {
      if (item.amount > 0) {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
  }

  // Calculate totals whenever historyList changes
  useEffect(() => {
    calculateTotal();
  }, [historyList]);

  return (
    <>
      <h1>Expense Tracker</h1>
      <div>
        <h3>Balance : {income + expense}</h3>
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
        {historyList.map((item: Expense) => (
          <ExpenseItem
            key={item.id}
            title={item.title}
            amount={item.amount}
            onEdit={() => editExpense(item.id)}
            onDelete={() => deleteItem(item.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
