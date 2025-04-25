import React from "react";
import css from "./Content.module.css";

const Content = () => {
  return (
    <>
      <div className={css.rostmoney}>잔액 20000|</div>
      <div className={css.money}>
        <div className={css.inputmoney}>수입</div>
      </div>
      <div className={css.money}>
        <div className={css.inputmoney}>수입</div>
      </div>
    </>
  );
};

export default Content;
