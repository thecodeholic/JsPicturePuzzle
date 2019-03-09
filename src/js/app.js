import '../scss/style.scss';
import PicturePuzzle from './PicturePuzzle'

window.addEventListener('load', init);

function init() {
  const puzzle = new PicturePuzzle(document.querySelector('#puzzle-wrapper'),
    'https://icdn2.digitaltrends.com/image/dji-spark-drone-review-11-1500x1000.jpg?ver=1',
    3, 600);

  const modal = document.querySelector('#success-modal');
  modal.style.display = 'block';
  puzzle.onSwap = function () {
    console.log('Swap');
  };
  puzzle.onDone = function () {
    setTimeout(() => {
      modal.classList.add('open');
      this.el.classList.add('blur-it');
      modal.querySelector('.trigger').onclick = () => {
        modal.classList.remove('open');
        this.el.classList.remove('blur-it');
      }
    }, 500);
  };
}