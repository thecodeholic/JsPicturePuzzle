# Javascript Picture Puzzle game

## Setup
 1. Clone the project
 1. Go to the project root directory
 1. Run `npm install` 

## Launching demo

Run `npm run start:dev` to start the webpack dev server for demostration of the game

### or

Run `npm run build-demo` to build the demo in `dist` folder

## Usaging in your website/app/project

Run `npm run build` which will create `PicturePuzzle.js` file in `dist` folder.

Create an PicturePuzzle class instance in your javascript file

```javascript
const puzzle = new PicturePuzzle(htmlDomElement, imageSourceUrl, canvasWidth, dimmension = 3);

// To listen to an event when game is finished
puzzle.onFinished = function(){
  // Show finish dialog
};
```

