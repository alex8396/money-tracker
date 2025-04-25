// ✅ BalanceCard.jsx

const BalanceCard = ({ transactions = [] }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return (
    <div>
      <div className="card-box">
        <h5>잔액</h5>
        <h2>₩{balance.toLocaleString()}</h2>
      </div>
      <div className="amount-box">
        <div>
          <h5>수입</h5>
          <h6 className="text-green">₩{income.toLocaleString()}</h6>
        </div>
        <div>
          <h5>지출</h5>
          <h6 className="text-red">₩{expense.toLocaleString()}</h6>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
