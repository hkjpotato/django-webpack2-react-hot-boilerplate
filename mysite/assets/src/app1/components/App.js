import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>{"app1 got a message from django context: " + this.props.msg}</div>
    )
  }
}
