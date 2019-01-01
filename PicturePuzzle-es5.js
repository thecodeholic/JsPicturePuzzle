/**
 * Created by zura on 10/15/2018.
 */

function PicturePuzzle(domElement, url, dimension) {
  this.url = url;
  this.wrapperEl = this.createWrapper();
  this.image = null;
  this.dimension = dimension;
  this.matrix = [];
  this.canvasWidth = 600;

  domElement.appendChild(this.wrapperEl);

  this.init();
}

PicturePuzzle.prototype = {
  init: function () {
    this.wrapperEl.style.width = `${this.canvasWidth}px`;
    this.image = new Image();
    this.image.onload = () => {
      console.log(this.image.width, this.image.height);
      this.setup();
    };
    this.image.src = this.url;
    for (let i = 0; i < this.dimension; i++) {
      let arr = [];
      for (let j = 0; j < this.dimension; j++) {
        arr.push(document.createElement('div'));
      }
      this.matrix.push(arr);
    }
  },

  createWrapper: function () {
    let el = document.createElement('div');
    el.classList.add('picture-puzzle');
    return el;
  },

  setup: function () {
    const blockWidth = this.canvasWidth / this.dimension;

    let canvasHeight = this.image.height * this.canvasWidth / this.image.width;
    const blockHeight = canvasHeight / this.dimension;

    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        if (i === this.dimension - 1 && j === this.dimension - 1){
          continue;
        }
        let item = this.matrix[i][j];
        item.classList.add('puzzle-block');
        item.style.backgroundImage = `url(${this.url})`;
        item.style.backgroundSize = `${this.canvasWidth}px ${canvasHeight}px`;
        item.style.top = `${i* blockHeight}px`;
        item.style.left = `${j* blockWidth}px`;
        item.style.backgroundPosition = `${-j * blockWidth}px ${-i * blockHeight}px`;
        item.style.width = blockWidth + 'px';
        item.style.height = blockHeight + 'px';
        this.wrapperEl.appendChild(item);
      }
    }
  }

};

PicturePuzzle.constructor = PicturePuzzle;