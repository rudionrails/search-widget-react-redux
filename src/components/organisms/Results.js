import React from 'react';
import './Results.css';

const Result = ({ value }) => (
  <div className="Result card">
    <div className="card-block">
      { value }
    </div>
  </div>
);

const Results = ({
  className,
  accounts = [],
  transactions = [],
  other = [],
}) => (
  <div className={`Results container-fluid ${className}`}>
    <div className="row">
      <div className="col-sm-12 col-md-4">
        <div className="Result-heading">Accounts</div>

        {accounts.map((value, id) =>
          <Result value={value} key={`account-${id}`} />)}
      </div>

      <div className="col-sm-12 col-md-4">
        <div className="Result-heading">Transactions</div>

        {transactions.map((value, id) =>
          <Result value={value} key={`transaction-${id}`} />)}
      </div>

      <div className="col-sm-12 col-md-4">
        <div className="Result-heading">Other</div>

        {other.map((value, id) =>
          <Result value={value} key={`other-${id}`} />)}
      </div>
    </div>
  </div>
);

export default Results;
