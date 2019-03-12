import '../scss/style.scss';
import PicturePuzzle from './PicturePuzzle'

const picturePuzzle = new PicturePuzzle(
  document.querySelector('#puzzle-wrapper'),
  'http://52.24.98.51/wp-content/uploads/2017/01/drone.jpg',
  600
);

picturePuzzle.onFinished = () => {

};
