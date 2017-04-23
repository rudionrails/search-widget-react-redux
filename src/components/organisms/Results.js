import React from 'react';
import './Results.css';

const Result = () => (
  <div className="Result card">
    <div className="card-block">
      This is some text within a card block.
    </div>
  </div>
);

const Results = ({
  results = [],
}) => (
  <div className="Results container-fluid">
    <div className="row">
      <div className="col">
        <div className="Result-heading">Accounts</div>

        <Result />
        <Result />
      </div>

      <div className="col">
        <div className="Result-heading">Transactions</div>

        <Result />
        <Result />
        <Result />
      </div>

      <div className="col">
        <div className="Result-heading">Other</div>

        <Result />
        <Result />
        <Result />
        <Result />
      </div>
    </div>
  </div>
);

export default Results;
