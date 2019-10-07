import React from 'react';
import Position from './Position';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.width;
    this.height = props.height;
    this.field = null;
  }

  componentDidMount() {
    let field = document.querySelector(".field");
    field.style.width = this.width * 50 + "px";
    field.style.height = this.height * 50 + "px";
  }

  checkPos(x, y) {
    let sel = this.props.active;
      if (sel.x == x && sel.y == y) {
        return true;
     }
    return false;
  }

  checkFruit(x, y) {
    let sel = this.props.fruit;
    if (sel.x == x && sel.y == y) {
      return true;
    }
    return false;
  }

  checkTail(x, y) {
    let sel = this.props.tail;
    for (let i in sel) {
      if (sel[i].x == x && sel[i].y == y) {
        return true;
      }
    }
    return false;
  }

  formField(width, height) {
    let field = new Array;
    for (let ver = 0; ver < height; ver++) {
      field.push(new Array);
      for (let hor = 0; hor < width; hor++) {
        field[ver].push(<Position x={hor} y={ver} tail={this.checkTail(hor, ver)} fruit={this.checkFruit(hor, ver)} active={this.checkPos(hor, ver)} key={hor.toString() + ver.toString()}/>);
      }
    }
    return field;
  }

  render() {
    let field = this.formField(this.width, this.height);
    return (
      <div className="field">
        {field}
      </div>
    );
  }

}

export default Field;
