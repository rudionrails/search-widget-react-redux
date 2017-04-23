import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/pages/Search';
import './index.css';

const escEventListener = ({ keyCode }) => {
  if(keyCode === 27) destroy();
};

function destroy() {
  document.removeEventListener('keydown', escEventListener);
};

document.addEventListener('keydown', escEventListener);

ReactDOM.render(
  <Search onClose={destroy} />,
  document.getElementById('root')
);
