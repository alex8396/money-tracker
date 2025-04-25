function TransactionItem({ transaction, onDelete }) {
  const sign = transaction.type === "income" ? "+" : "-";
  const color = transaction.type === "income" ? "text-success" : "text-danger";
  const border =
    transaction.type === "income" ? "border-success" : "border-danger";

  return (
    <div
      className={`d-flex justify-content-between align-items-center mb-2 border-start ps-2 ${border}`}
      style={{ borderLeftWidth: "4px" }}
    >
      <span>{transaction.description}</span>
      <div>
        <span className={`me-3 ${color}`}>
          {sign}₩{transaction.amount.toLocaleString()}
        </span>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(transaction.id)}
        >
          X
        </button>
      </div>
    </div>
  );
}
export default TransactionItem;
