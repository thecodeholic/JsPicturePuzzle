
class PicturePuzzle {
  constructor(el, imageSrc, dimension, canvasWidth = 600) {
    this.el = el;
    this.wrapperEl = this.createWrapper();
    this.cells = [];
    this.imageSrc = imageSrc;
    this.dimension = dimension;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = -1;
    this.blockWidth = -1;
    this.blockHeight = -1;

    this.image = new Image();
    this.image.onload = () => {
      this.setup();
    }
    this.image.src = imageSrc;

    this.el.appendChild(this.wrapperEl);
  }

  createWrapper() {
    let el = document.createElement('div');
    el.classList.add('picture-puzzle');
    return el;
  }

  setup() {
    this.canvasHeight = this.image.height * this.canvasWidth / this.image.width;
    this.blockWidth = this.canvasWidth / this.dimension;
    this.blockHeight = this.canvasHeight / this.dimension;

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
    for (let i = this.cells.length - 2; i >= 0; i--) {
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
  }

  getEmpty() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].isEmpty) {
        return {
          i,
          cell: this.cells[i]
        }
      }
    }
  }
}

class Cell {
  constructor(index, picturePuzzle) {
    this.puzzle = picturePuzzle;
    this.url = picturePuzzle.imageSrc;
    this.el = document.createElement('div');
    this.isEmpty = false;
    this.index = index;
    let { x, y } = this.convertToXY(index);

    if (index === this.puzzle.dimension * this.puzzle.dimension - 1) {
      this.isEmpty = true;
      return;
    }

    this.el.classList.add('puzzle-block');
    this.el.style.backgroundImage = `url(${this.url})`;
    this.el.style.backgroundSize = `${this.puzzle.canvasWidth}px ${this.puzzle.canvasHeight}px`;
    this.el.style.backgroundPosition = `${-x * this.puzzle.blockWidth}px ${-y * this.puzzle.blockHeight}px`;
    this.el.style.width = this.puzzle.blockWidth + 'px';
    this.el.style.height = this.puzzle.blockHeight + 'px';
    this.setPosition(index);

    this.el.onclick = () => {
      const { i, cell } = this.puzzle.getEmpty();
      this.puzzle.swapCells(this.index, i, true);
    }
  }

  display() {
    this.puzzle.wrapperEl.appendChild(this.el);
  }

  setIndex(index) {
    this.index = index;
  }

  setPosition(index, animate = false) {
    let { x, y } = this.convertToXY(index);

    if (animate) {
      let finalLeft = Math.floor(x * this.puzzle.blockWidth);
      let finalTop = Math.floor(y * this.puzzle.blockHeight);
      let movingSpeed = 5;

      console.log(this.left, this.top);
      console.log(finalLeft, finalTop);

      if (this.left < finalLeft) {
        let interval = setInterval(() => {
          this.left += movingSpeed;
          if (this.left > finalLeft) {
            clearInterval(interval);
          }
        }, 10);

      } else if (this.left > finalLeft) {
        let interval = setInterval(() => {
          this.left -= movingSpeed;
          // console.log(`${this.left} - ${finalLeft}`);
          // console.log(`${this.top} - ${finalTop}`);
          if (this.left < finalLeft) {
            clearInterval(interval);
          }
        }, 10);
      } else if (this.top < finalTop) {
        let interval = setInterval(() => {
          this.top += movingSpeed;
          if (this.top > finalTop) {
            clearInterval(interval);
          }
        }, 10);
      } else if (this.top > finalTop) {
        
        let interval = setInterval(() => {
          this.top -= movingSpeed;
          if (this.top < finalTop) {
            clearInterval(interval);
          }
        }, 10);
      } else {
        clearInterval(interval);
      }


    } else {
      this.left = Math.floor(x * this.puzzle.blockWidth);
      this.top = Math.floor(y * this.puzzle.blockHeight);
    }
  }

  set top(top) {
    this._top = top;
    this.el.style.top = `${top}px`;
  }

  get top() {
    return this._top;
  }

  set left(left) {
    this._left = left;
    this.el.style.left = `${left}px`;
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

}
