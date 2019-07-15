import React from 'react';
import ReactDOM from 'react-dom';
import Student from './Student';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Student />, div);
  ReactDOM.unmountComponentAtNode(div);
});
