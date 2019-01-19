import '../scss/style.scss';
import PicturePuzzle from './PicturePuzzle'

window.addEventListener('load', init);

function init() {
  const puzzle = new PicturePuzzle(document.querySelector('#puzzle-wrapper'),
    'https://www.tesla.com/ns_videos/homepage/homepage-models.jpg?02018018018',
    4, 600);

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