function IncomeExpenses({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, val) => acc + val.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, val) => acc + val.amount, 0);

  return (
    <div className="d-flex justify-content-around bg-white border rounded p-3">
      <div className="text-success text-center">
        <h5>수입</h5>
        <h5>₩{income.toLocaleString()}</h5>
      </div>
      <div className="text-danger text-center">
        <h5>지출</h5>
        <h5>₩{expense.toLocaleString()}</h5>
      </div>
    </div>
  );
}

export default IncomeExpenses;
