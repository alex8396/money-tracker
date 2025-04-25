import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Add body class when modal is shown
  useEffect(() => {
    if (showConfirmModal) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    };
  }, [showConfirmModal]);

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction.id);
      setShowConfirmModal(false);
      setSelectedTransaction(null);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedTransaction(null);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">내역</h5>
          <div
            className="transaction-list"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <h6 className="mb-0">{transaction.description}</h6>
                  <small className="text-muted">{transaction.date}</small>
                </div>
                <div className="d-flex align-items-center">
                  <span
                    className={`me-3 ${
                      transaction.type === "income"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatAmount(transaction.amount)}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteClick(transaction)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center text-muted py-3">
                거래 내역이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <>
          <div
            className="modal-backdrop show"
            onClick={handleCloseModal}
            style={{ opacity: 0.5 }}
          ></div>
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">거래 삭제</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>정말 이 거래를 삭제하시겠습니까?</p>
                  {selectedTransaction && (
                    <div className="alert alert-warning">
                      <strong>{selectedTransaction.description}</strong>
                      <br />
                      금액: {formatAmount(selectedTransaction.amount)}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleConfirmDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["income", "expense"]).isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteTransaction: PropTypes.func.isRequired,
};

export default TransactionList;
