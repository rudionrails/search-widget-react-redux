import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/pages/Search';
import './index.css';

function destroy() {
  alert('destroy');
};

ReactDOM.render(
  <Search onClose={destroy} />,
  document.getElementById('root')
);
