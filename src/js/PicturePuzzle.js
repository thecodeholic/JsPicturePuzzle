/**
 * Created by zura on 3/11/2019.
 */
import Cell from "./Cell";

export default class PicturePuzzle {
  constructor(el, imageSrc, width) {
    this.parentEl = el;
    this.dimmension = 3;
    this.imageSrc = imageSrc;
    this.width = width;
    this.cells = [];

    this.onFinished = () => {};

    this.init();
    const img = new Image();
    img.onload = () => {
      console.log(img.width, img.height);
      /**
       * this.height      img.height
       * -----------   =  ----------
       * this.width       img.width
       */
      this.height = img.height * this.width / img.width;
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;

      this.setup();
    };
    img.src = this.imageSrc;
  }

  init() {
    this.el = this.createWrapper();
    this.parentEl.appendChild(this.el);
  }

  createWrapper() {
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.style.margin = ' 0 auto';
    return div;
  }

  setup() {
    for (let i = 0; i < this.dimmension * this.dimmension; i++) {
      this.cells.push(new Cell(this, i));
    }
    this.shuffle();
    console.log(this.cells);
  }

  shuffle() {
    for (let i = this.cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swapCells(i, j);
    }
  }

  swapCells(i, j) {
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
    this.cells[i].setPosition(i);
    this.cells[j].setPosition(j);
    if (this.isAssembled()){
      this.onFinished();
    }
  }

  findPosition(ind) {
    return this.cells.findIndex(cell => cell.index === ind);
  }

  findEmpty() {
    return this.cells.findIndex(cell => cell.isEmpty);
  }

  isAssembled(){
    for (let i = 0; i < this.cells.length; i++){
      if (i !== this.cells[i].index){
        return false;
      }
    }
    return true;
  }
}
