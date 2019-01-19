import '../scss/style.scss';
import PicturePuzzle from './PicturePuzzle'

window.addEventListener('load', init);

function init() {
  const puzzle = new PicturePuzzle(document.querySelector('#puzzle-wrapper'),
    'https://picsum.photos/600?random',
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