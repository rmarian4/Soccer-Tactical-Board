var iconCount = 1;

function moveObject(element, xpos, ypos){
    /**
     * move element to the coordinates (xpos, ypos)
     */
    element.style.left = xpos + "px";
    element.style.top = ypos + "px";
}

function startMoving(element, elementId, container, event){
    event = event || window.event;
    
    var posX = event.clientX //provides the x-coordinate of where the event occurred
    var posY = event.clientY; //provides the y-coordinate of where the event occured
    var elemTop = window.getComputedStyle(document.getElementById(elementId)).top //returns the top position of the element
    var elemLeft = window.getComputedStyle(document.getElementById(elementId)).left //returns the left position of the element
    var elemWidth = parseInt(window.getComputedStyle(document.getElementById(elementId)).width) //get element width
    var elemHeight = parseInt(window.getComputedStyle(document.getElementById(elementId)).height) //get element height
    var containerWidth = parseInt(window.getComputedStyle(document.getElementById(container)).width) //get container width
    var containerHeight = parseInt(window.getComputedStyle(document.getElementById(container)).height); //get container height

    document.getElementById(container).style.cursor = "pointer"; //changes the cursor style to pointer

    elemTop = elemTop.replace("px", "");
    elemLeft = elemLeft.replace("px", "");

    var deltaX = posX - elemLeft; //horizontal distance between the cursor and the element
    var deltaY = posY - elemTop; //vertical distance between the cursor and the element

    document.onmousemove = function(event){
        event = event || window.event;

        var posX = event.clientX;
        var posY = event.clientY;
        var newX = posX - deltaX; //subtract deltaX from the x position of the mouse in order to minimize the distance between the mouse and the element you are moving
        var newY = posY - deltaY; //subtract deltaY from the y position of the mouse in order to minimize the distance between the mouse and the element you are moving

        /*
        Logic of the following if statements:
        if the x and y coordinates fall outside the container area, then adjust the x and y coordinates accordingly
        */
        if(newX < 0) newX = 0; 

        if(newY < 0) newY = 0;

        if(newX + elemWidth > containerWidth) newX = containerWidth-elemWidth;

        if(newY + elemHeight > containerHeight) newY = containerHeight - elemHeight;


        moveObject(element, newX, newY); //move object to the new coordinates

        
    }
    var newIcon = makeNewIcon(element)
    container = document.getElementById(container)

    var newIconTop = window.getComputedStyle(newIcon).top;
    var newIconLeft = window.getComputedStyle(newIcon).left;
    console.log(newIconLeft)

    /*
    only create a new icon if the current icon is in its original position
    otherwise delete the icon that the makeNewIcon function created
    */
    if(newIconTop === (elemTop + "px") && newIconLeft === (elemLeft + "px")){
        container.appendChild(newIcon);
    } else{
        container.removeChild(newIcon)
        newIcon.remove()
        iconCount--
    }

    

}

function stopMoving(container){
    //var a = document.createElement('script');
    document.getElementById(container).style.cursor = 'default'; //return the cursor back to its normal state
    document.onmousemove = function() {}; //make empty function so the object stops moving once the mouse is released

    

}

function makeNewIcon(element) {
    const container = document.getElementById('container')
    const newIcon = document.createElement('div')
    newIcon.className = element.className
    newIcon.id = element.id + iconCount;
    iconCount++;
    newIcon.addEventListener('mousedown', (event) => startMoving(newIcon, newIcon.id, container.id, event))
    newIcon.addEventListener("mouseup", () => stopMoving(container.id, newIcon))
    addListenerForMenu(newIcon)
    container.appendChild(newIcon)

    return newIcon

}