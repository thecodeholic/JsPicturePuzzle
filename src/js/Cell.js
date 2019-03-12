/**
 * Created by zura on 3/11/2019.
 */
export default class Cell {
  constructor(puzzle, ind) {

    this.isEmpty = false;
    this.index = ind;
    this.puzzle = puzzle;
    this.width = this.puzzle.width / this.puzzle.dimmension;
    this.height = this.puzzle.height / this.puzzle.dimmension;

    this.el = this.createDiv();
    puzzle.el.appendChild(this.el);

    if (this.index === this.puzzle.dimmension * this.puzzle.dimmension - 1) {
      this.isEmpty = true;
      return;
    }
    this.setImage();
    this.setPosition(this.index);
  }

  createDiv() {
    const div = document.createElement('div');
    div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    div.style.border = '1px solid #FFF';
    div.style.position = 'absolute';
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;

    div.onclick = this.onCellSwap.bind(this);

    return div;
  }

  onCellSwap() {
    const actualIndex = this.puzzle.findPosition(this.index);
    const emptyIndex = this.puzzle.findEmpty();
    const empty = this.puzzle.cells[emptyIndex];
    const {x, y} = this.getXY(actualIndex);
    console.log(x, y);
    const {x: emptyX, y: emptyY} = empty.getXY(emptyIndex);
    console.log(emptyX, emptyY);

    if ((x === emptyX || y === emptyY) &&
      (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
      this.puzzle.swapCells(actualIndex, emptyIndex);
    }
  }

  setImage() {
    const {x, y} = this.getXY(this.index);
    const left = this.width * x;
    const top = this.height * y;

    this.el.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
    this.el.style.backgroundPosition = `-${left}px -${top}px`;
  }

  setPosition(index) {
    const {left, top} = this.getPositionFromIndex(index);

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  getPositionFromIndex(index) {
    return {
      left: this.width * (index % this.puzzle.dimmension),
      top: this.height * (Math.floor(index / this.puzzle.dimmension))
    }
  }

  getXY(ind) {
    return {
      x: ind % this.puzzle.dimmension,
      y: Math.floor(ind / this.puzzle.dimmension)
    };
  }
}
