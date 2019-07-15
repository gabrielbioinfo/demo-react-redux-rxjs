import React from 'react';
import ReactDOM from 'react-dom';
import ActivityCompletion from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ActivityCompletion />, div);
  ReactDOM.unmountComponentAtNode(div);
});
