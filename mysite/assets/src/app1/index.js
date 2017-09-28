import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import window from 'global/window';

// hot reload(HMR, not related to React: https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
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

// old approach: glue code with django template
// since we can't access the context variable from django template here
// what we can do is to assign the render function to window
// and let django script to call it with context variable
// https://stackoverflow.com/questions/28610372/reactjs-with-django-real-usage
window.app1 = {
  init: function ({msg}) {
    ReactDOM.render(
      <App msg={msg} />, 
      document.getElementById('root')
    );
  }
}