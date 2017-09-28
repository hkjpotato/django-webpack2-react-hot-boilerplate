import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>{"app2 got a message from django: " + this.props.msg}</div>
    )
  }
}
