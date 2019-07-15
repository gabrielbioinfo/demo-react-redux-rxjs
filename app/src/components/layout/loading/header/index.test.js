import React from 'react';
import ReactDOM from 'react-dom';
import LoadingHeader from './LoadingHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoadingHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
