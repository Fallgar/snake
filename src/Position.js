import React from 'react';

class Position extends React.Component {
  constructor(props) {
    super(props);
    this.x = props.x;
    this.y = props.y;
  }

  classGen() {
    if (this.props.active) {
      return "pos head";
    } else if (this.props.fruit) {
        return "pos red";
    } else if (this.props.tail) {
      return "pos green";
    } else
      return "pos";
  }

  render() {
    return <div className={this.classGen()} meta-x={this.x} meta-y={this.y}></div>;
  }
}

export default Position;
