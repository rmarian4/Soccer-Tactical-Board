var buttonClicked = false;
var restore_array = [];
var index = -1;

function onButtonClick(){
    buttonClicked = !buttonClicked;

    if(buttonClicked){
        canvas.style.cursor = "pointer" //if the button has been clicked then change the appearance of the cursor to pointer
    }

    else{
        canvas.style.cursor = "default" 
    }
}

var canvas = document.getElementById("drawingBoard");
var context = canvas.getContext('2d');
var isPainting = false;


function startPainting(){
    isPainting = true;
}

function stopPainting(){
    isPainting = false;
    context.beginPath() //starts a new path for the line so that when you draw a line it won't connect to the previoys drawn line
    restore_array.push(context.getImageData(0,0,canvas.width,canvas.height)) //add the image on the canvas to the array
    index++;
}


function drawLine(event){
   if(!isPainting || !buttonClicked) return; //if the mouse hasn't been clicked down or the draw button hasn't been clicked then do not draw anything

   context.lineWidth = 2;
   context.lineCap = 'round';

   context.lineTo(event.offsetX, event.offsetY); //creates a point at the point passed into the method and then creates a line to the point from the last specified point in the canvas
   context.stroke() //fills in the line path
   context.beginPath(); //begin a path
   context.moveTo(event.offsetX, event.offsetY) //moves the path to the specified point in the canvas without creating a line (Note: the point passed into this method will also act as the last specified point when we use the lineTo method again)
}

function undo(){
    if(index <= 0){
        context.clearRect(0,0,canvas.width, canvas.height); //clear the canvas
        restore_array = []; //set the array equal to an empty array
        index = -1; //set the index back to -1
    }
    else{
        index--
        restore_array.pop() //remove the last element of the array
        context.putImageData(restore_array[index], 0, 0); //make the image drawn on the canvas equal to the image at restore_array[index]
    }
}
