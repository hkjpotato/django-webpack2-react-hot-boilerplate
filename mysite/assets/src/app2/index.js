import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import window from 'global/window';

// //hot reload(HMR, not related to React: https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
if(module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <NextApp msg={window.msg} /> //it keeps the previous props if the page is not refreshed
      ,
      document.getElementById('root')
    )
  })
}

//https://hackernoon.com/reconciling-djangos-mvc-templates-with-react-components-3aa986cf510a
ReactDOM.render(
  <App msg={window.msg} />, 
  document.getElementById('root')
);
