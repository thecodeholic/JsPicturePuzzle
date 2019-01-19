export default class Cell {
  constructor(index, picturePuzzle) {
    this.puzzle = picturePuzzle;
    this.url = picturePuzzle.imageSrc;
    this.container = document.createElement('div');
    this.isEmpty = false;
    this.originalIndex = index;
    this.index = index;
    let {x, y} = this.convertToXY(index);

    if (index === this.puzzle.dimension * this.puzzle.dimension - 1) {
      this.isEmpty = true;
      return;
    }

    this.container.classList.add('puzzle-block');
    this.container.style.backgroundImage = `url(${this.url})`;
    this.container.style.backgroundSize = `${this.puzzle.canvasWidth}px ${this.puzzle.canvasHeight}px`;
    this.container.style.backgroundPosition = `${-x * this.puzzle.blockWidth}px ${-y * this.puzzle.blockHeight}px`;
    this.container.style.width = this.puzzle.blockWidth + 'px';
    this.container.style.height = this.puzzle.blockHeight + 'px';
    this.setPosition(index);

    this.container.onclick = this.onCellClick.bind(this);
  }

  onCellClick() {
    const i = this.puzzle.getEmptyIndex(),
      emptyCell = this.puzzle.cells[i];
    let {x: emptyX, y: emptyY} = emptyCell.getXY();
    let {x, y} = this.convertToXY(this.index);
    if ((x === emptyX || y === emptyY) && (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
      this.puzzle.swapCells(this.index, i, true);
    }
  }

  display() {
    this.puzzle.el.appendChild(this.container);
  }

  setIndex(index) {
    this.index = index;
  }

  setPosition(index, animate = false) {
    let {x, y} = this.convertToXY(index);

    if (animate) {
      let finalLeft = Math.floor(x * this.puzzle.blockWidth);
      let finalTop = Math.floor(y * this.puzzle.blockHeight);
      if (this.left < finalLeft) {
        this.animateProperty('left', finalLeft);
      } else if (this.left > finalLeft) {
        this.animateProperty('left', finalLeft);
      } else if (this.top < finalTop) {
        this.animateProperty('top', finalTop);
      } else if (this.top > finalTop) {
        this.animateProperty('top', finalTop);
      }


    } else {
      this.left = Math.floor(x * this.puzzle.blockWidth);
      this.top = Math.floor(y * this.puzzle.blockHeight);
    }
  }

  animateProperty(propertyName, finalValue) {
    let movingSpeed = 5;

    if (this[propertyName] < finalValue) {
      let interval = setInterval(() => {
        this[propertyName] = Math.min(this[propertyName] + movingSpeed, finalValue);
        if (this[propertyName] >= finalValue) {
          clearInterval(interval);
        }
      }, 10);

    } else if (this[propertyName] > finalValue) {
      let interval = setInterval(() => {
        this[propertyName] = Math.max(this[propertyName] - movingSpeed, finalValue);
        // console.log(`${this.left} - ${finalLeft}`);
        // console.log(`${this.top} - ${finalTop}`);
        if (this[propertyName] <= finalValue) {
          clearInterval(interval);
        }
      }, 10);
    }
  }

  set top(top) {
    this._top = top;
    this.container.style.top = `${top}px`;
  }

  get top() {
    return this._top;
  }

  set left(left) {
    this._left = left;
    this.container.style.left = `${left}px`;
  }

  get left() {
    return this._left;
  }

  convertToXY(index) {
    return {
      y: Math.floor(index / this.puzzle.dimension),
      x: Math.floor(index % this.puzzle.dimension)
    };
  }

  getXY() {
    return this.convertToXY(this.index);
  }

}
