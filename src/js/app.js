import '../scss/style.scss';
import PicturePuzzle from './PicturePuzzle'

const picturePuzzle = new PicturePuzzle(
  document.querySelector('#puzzle-wrapper'),
  'http://52.24.98.51/wp-content/uploads/2017/01/drone.jpg',
  600
);

const modal = document.querySelector('#success-modal');
modal.style.display = 'block';

picturePuzzle.onFinished = function() {
  console.log("Show good job dialog");

  setTimeout(() => {
    modal.classList.add('open');
    this.el.classList.add('blur-it')
  }, 500);
  modal.querySelector('.trigger').onclick = () => {
    modal.classList.remove('open');
    this.el.classList.remove('blur-it');
  }

};
