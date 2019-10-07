import React from 'react';
import logo from './logo.svg';
import './App.css';
import Greet from './Greet';
import Field from './Field';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fieldSize = 5;
    this.speed = 300;
    this.fruit = {x: null, y: null};
    this.eventHandler = this.eventHandler.bind(this);
    this.score = 0;
    this.direction = {x: 1, y: 0};
    this.state = {
      gameState: true,
      msg: "Hello there",
      position: {x: 1, y: 1},
      direction: this.direction,
      tail: [],
    };
  }

  getClearPositions() {
    let posArr = [];
    let clearPosArr = [];

    posArr[0] = this.state.position;
    posArr = posArr.concat(this.state.tail);

    for (let ver = 0; ver < this.fieldSize; ver++) {
      for (let hor = 0; hor < this.fieldSize; hor++) {
        clearPosArr.push({x: hor, y: ver});
      }
    }

    for (let i in posArr) {
        for (let i2 in clearPosArr) {
          if (JSON.stringify(clearPosArr[i2]) == JSON.stringify(posArr[i])) {
            clearPosArr.splice(i2, 1);
          }
        }
      }

    return clearPosArr;
  }

  win() {
    clearInterval(this.timer);
    this.setState({
      msg: "Nice"
    });

  }

  generateCoord() {
    let clearPosArr = this.getClearPositions();
    if (!clearPosArr[0]) {
      this.win();
      return null;
    }
    let x = Math.floor(Math.random() * clearPosArr.length);

    return clearPosArr[x];
  }

  generateFruit() {
    let pos = this.generateCoord();
    if (!pos) return;
    this.fruit.x = pos.x;
    this.fruit.y = pos.y;
  }

  changeDirection(dir) {
    if (!(dir.x + this.state.direction.x == 0 || dir.y + this.state.direction.y == 0))
    this.setState({direction: dir})
  }

  eventHandler(event) {

    let dir = this.state.direction;
    switch (event.keyCode) {
      case 81:
        if (this.paused){
          this.start();
        } else this.pause();
      break;
      case 87:
        this.direction = {x: 0, y: -1};
      break;
      case 68:
        this.direction = {x: 1, y: 0};
      break;
      case 65:
        this.direction = {x: -1, y: 0};
      break;
      case 83:
        this.direction = {x: 0, y: 1};
      break;
    }
  }

  gameOver() {
    this.setState({
      msg: "Big OUUUUUF",
    });
    clearInterval(this.timer);
  }

  gameOverCheck() {
    let tailArr = this.state.tail;
    for (let i in tailArr) {
      if (this.state.position.x == tailArr[i].x && this.state.position.y == tailArr[i].y) {
        this.gameOver();
      }
    }
  }

  moveTail() {
    let tailArr = this.state.tail;
    let tempArr = tailArr.map((val, ind, arr) => {
      if (ind > 0) {
        return arr[ind-1];
      }
    });
    tempArr[0] = this.state.position;
    this.setState({
      tail: tempArr
    });
  }

  pause() {
      this.paused = true;
      clearInterval(this.timer);
  }

  start() {
    this.paused = false;
    this.timer = setInterval(() => this.changePos(), this.speed);
  }

  changePos() {
    this.changeDirection(this.direction);

    let pos = this.state.position;
    let dir = this.state.direction;

    let x = pos["x"] + dir.x, y = pos["y"] + dir.y;

    if (x < 0) x = this.fieldSize - 1;
    if (x > this.fieldSize - 1) x = 0;
    if (y < 0) y = this.fieldSize - 1;
    if (y > this.fieldSize - 1) y = 0;

    if (x == this.fruit.x && y == this.fruit.y) {

      this.setState(() => {
        let tempArr = this.state.tail;
        tempArr.push({x: x, y: y});
        return {tail: tempArr};
      });
      this.generateFruit();
     this.greetText = "Hello there " + this.score++;

    }
    this.moveTail();
    this.setState({
      position:
      {
        x: x,
        y: y
      }
    });
    this.gameOverCheck();

  }

  componentDidMount() {
    this.generateFruit();
    document.addEventListener("keydown", this.eventHandler);
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
      <Greet text={this.state.msg + " Score: " + this.score} />
      <Field width={this.fieldSize} height={this.fieldSize} active={this.state.position} tail={this.state.tail} fruit={this.fruit} />
      </div>
    );
  }
}

export default App;
