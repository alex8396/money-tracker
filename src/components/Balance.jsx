import React from "react";
import PropTypes from "prop-types";

const Balance = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  return (
    <div className="row g-3 mb-4">
      <div className="col-12">
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title">잔액</h5>
            <h3 className="mb-0">{formatAmount(balance)}</h3>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title text-success">수입</h5>
            <h4 className="text-success mb-0">{formatAmount(income)}</h4>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title text-danger">지출</h5>
            <h4 className="text-danger mb-0">{formatAmount(expenses)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

Balance.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["income", "expense"]).isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Balance;
