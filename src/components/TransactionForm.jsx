import React, { useState } from "react";
import PropTypes from "prop-types";

const TransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString().split("T")[0],
    };

    onAddTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setType("income");
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">새로운 거래 추가</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="내용 입력..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="금액 입력..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <div className="btn-group w-100">
              <input
                type="radio"
                className="btn-check"
                name="type"
                id="income"
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
              />
              <label className="btn btn-outline-success" htmlFor="income">
                수입
              </label>
              <input
                type="radio"
                className="btn-check"
                name="type"
                id="expense"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
              />
              <label className="btn btn-outline-danger" htmlFor="expense">
                지출
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            거래 추가
          </button>
        </form>
      </div>
    </div>
  );
};

TransactionForm.propTypes = {
  onAddTransaction: PropTypes.func.isRequired,
};

export default TransactionForm;
