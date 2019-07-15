import React from 'react';
import ReactDOM from 'react-dom';
import LoadingActivityList from './LoadingActivityList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoadingActivityList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
