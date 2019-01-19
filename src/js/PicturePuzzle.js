import Cell from './Cell'

export default class PicturePuzzle {
  constructor(el, imageSrc, dimension, canvasWidth = 600) {
    this.container = el;
    this.el = PicturePuzzle.createWrapper();

    this.shuffleLevel = 100;
    this.onDone = () => {};
    /**
     * @type Cell[]
     */
    this.cells = [];
    this.imageSrc = imageSrc;
    this.dimension = dimension;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = -1;
    this.blockWidth = -1;
    this.blockHeight = -1;

    this.image = new Image();
    this.image.onload = this.setup.bind(this);
    this.image.src = imageSrc;

    this.container.appendChild(this.el);
  }

  static createWrapper() {
    let el = document.createElement('div');
    el.classList.add('picture-puzzle');
    return el;
  }

  setup() {
    this.canvasHeight = this.image.height * this.canvasWidth / this.image.width;
    this.blockWidth = this.canvasWidth / this.dimension;
    this.blockHeight = this.canvasHeight / this.dimension;

    this.el.style.width = `${this.canvasWidth}px`;
    this.el.style.height = `${this.canvasHeight}px`;
    console.log(this.blockHeight, this.blockWidth);

    this.createCells();
    this.displayCells();
    this.shuffle();
    console.log(this.cells);
  }

  createCells() {
    for (let i = 0; i < this.dimension * this.dimension; i++) {
      this.cells.push(new Cell(i, this));
    }
  }

  shuffle() {
    for (let i = 0; i < this.shuffleLevel; i++) {
      let sides = [];
      let index = this.getEmptyIndex();
      let cell = this.cells[index];
      const {x, y} = cell.getXY();
      if (x === 2) {
        sides.push('left');
      } else if (x === 0) {
        sides.push('right');
      } else {
        sides.push('left');
        sides.push('right');
      }

      if (y === 2) {
        sides.push('top');
      } else if (y === 0) {
        sides.push('bottom')
      } else {
        sides.push('top');
        sides.push('bottom');
      }

      let sideIndex = Math.round(Math.random() * (sides.length - 1));
      let secondIndex = 0;
      switch (sides[sideIndex]) {
        case 'left':
          secondIndex = index - 1;
          break;
        case 'right':
          secondIndex = index + 1;
          break;
        case 'top':
          secondIndex = index - this.dimension;
          break;
        case 'bottom':
          secondIndex = index + this.dimension;
          break;
        default:
          break
      }
      // console.log(x, y, sides);
      // console.log(index, sides[sideIndex], secondIndex);
      this.swapCells(index, secondIndex);
    }

    // for (let i = this.cells.length - 1; i >= 0; i--) {
    //   let random = Math.floor(Math.random() * i);
    //   this.swapCells(i, random);
    // }
  }

  displayCells() {
    for (let cell of this.cells) {
      cell.display();
    }
  }

  swapCells(i, j, animate = false) {
    let tmp = this.cells[i];
    this.cells[i] = this.cells[j];
    this.cells[j] = tmp;

    this.cells[i].setIndex(i);
    this.cells[j].setIndex(j);

    this.cells[i].setPosition(i);
    this.cells[j].setPosition(j, animate);

    if (this.isFullyDone() && animate) {
      if (typeof this.onDone === 'function'){
        this.onDone();
      }
    }
  }

  isFullyDone() {
    for (let cell of this.cells) {
      if (cell.index !== cell.originalIndex) {
        return false;
      }
    }
    return true;
  }

  getEmptyIndex() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].isEmpty) {
        return i;
      }
    }
  }
}
