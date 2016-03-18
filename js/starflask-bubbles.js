var canvasContainer = document.querySelector("#starflask-bubbles");
var mainCanvas = canvasContainer.getElementsByTagName('canvas')[0];;
var mainContext = mainCanvas.getContext("2d");

var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

var bubble_count = 15;
var bubbles = [];
var angle = 0;

function spawnBubbles()
{
  for(var i = 0; i< bubble_count;i++)
  {
    var new_bubble = getNewBubble();
    bubbles.push(new_bubble);
  }

}

function resetBubble(bubble_index)
{
  bubbles[bubble_index] = getNewBubble();

}

function getNewBubble()
{
  return {color:randomColor({  luminosity: 'light'}) , radius:(15*Math.random()), x: canvasWidth/2, y: canvasHeight , x_speed: (Math.random() / 5), y_speed: (0.5+Math.random())  ,life:0};
}

var frameCount = 0;


function updateBubbles() {

  mainContext.clearRect(0, 0, canvasWidth, canvasHeight);


  for(var i in bubbles )
  {
    var bubble = bubbles[i];

    // draw the circle
    mainContext.beginPath();


    mainContext.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2, false);
    mainContext.closePath();

    // color in the circle
    mainContext.fillStyle = bubble.color;
    mainContext.fill();


      bubble.y -= bubble.y_speed;
      bubble.x += bubble.x_speed;

      if( bubble.y < 0)
      {
        resetBubble(i);
      }

      if(Math.random() < 0.2)
      {
        bubble.x_speed += (-0.5 + Math.random())/5;
      }

      console.log('drawing circle ' + bubble.x_speed) ;

  }



//this breaks errthing
//  mainCanvas.width  = canvasContainer.offsetWidth;
//  mainCanvas.height = canvasContainer.offsetHeight;




     // color in the background
     //mainContext.fillStyle = "#EEEEEE";
    // mainContext.fillRect(0, 0, canvasWidth, canvasHeight);


  requestAnimationFrame(updateBubbles);
}


spawnBubbles();
requestAnimationFrame(updateBubbles);
