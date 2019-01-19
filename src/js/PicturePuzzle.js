import Cell from './Cell'

export default class PicturePuzzle {
  constructor(el, imageSrc, dimension, canvasWidth = 600) {
    this.container = el;
    this.el = PicturePuzzle.createWrapper();
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
    for (let i = this.cells.length - 1; i >= 0; i--) {
      let random = Math.floor(Math.random() * i);
      this.swapCells(i, random);
    }
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
    console.log(this.cells);
  }

  getEmptyIndex() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].isEmpty) {
        return i;
      }
    }
  }
}
