const contextMenu = document.querySelector("#menu");
const teams = document.querySelectorAll('.teams');
let selectedIcon;

const hideMenu = () => showContextMenu(false)

function showContextMenu(show = true){
    if(show == true){
        contextMenu.addEventListener('click', (e) => e.stopPropagation()) //if click occurs inside the menu, then do not make the menu disappear
        window.addEventListener('click', hideMenu) //if click occurs outside the menu, then make the menu disappear
        contextMenu.style.display = 'block';
        document.getElementById("num").value = "";
        document.getElementById("name").value = "";

    }

    else{
        contextMenu.style.display = 'none';
        window.removeEventListener('click', hideMenu)
    }
}

function addListenerForMenu(team) {
    team.addEventListener('contextmenu', (e) => {
        e.preventDefault(); //prevent default context menu from showing
        showContextMenu(); //make custom context menu show when the icons are right clicked
        selectedIcon = team //assign the selectedIcon variable to the icon that was passed into the function
               
        contextMenu.style.top = Number.parseInt(team.style.top.replace('px', '')) + 25 + "px"; // make the top position of the context menu equal to the top position of the icon plus 25 px
        contextMenu.style.left = Number.parseInt(team.style.left.replace('px', '')) - 85 + "px" ; //make the left position of the context menu equal to the left position of the icon minus 85 px
    })
}

teams.forEach(team => { 
    addListenerForMenu(team) //for each html element that has a class name of "teams" add the context menu event listner (function starts at line 23)
})



window.addListenerForMenu = addListenerForMenu //allows you to use the function addListnerForMenu in any file


function addNumber(){
    /**
     * function adds a number inside the team icon when a number is typed into the number input section inside the context menu
     */
    const id = selectedIcon.id + "-num"
    var number = document.getElementById('num').value
    var divElement = document.getElementById(selectedIcon.id)
    var pElement = document.getElementById(id)
    if(pElement){ //if the icon already has a number, then set the number back to nothing
        pElement.innerHTML = ""
    }
    else{ //else create an html element so we can place the number inside the icon
        pElement = document.createElement('span')
        pElement.id = id
        divElement.insertBefore(pElement, divElement.firstChild)
    }

    if(document.getElementById(selectedIcon.id + "-name") && number === ""){ 
        //if the icon has a name and the user has not typed anything into the number input area, then making the padding of the name element 15px
        document.getElementById(selectedIcon.id + "-name").style.paddingTop = '15px';
    } else if(document.getElementById(selectedIcon.id + "-name") && number !== "") { 
        // else if the icon has a name and the user has inputted a number, then get rid of the padding in the name element
        document.getElementById(selectedIcon.id + "-name").style.paddingTop = null;
    }

    pElement.innerHTML = number
}

function addName(){
    /**
     * adds a name below the icon when a name is typed into the name field located in the context menu
     */
    const id = selectedIcon.id + "-name"
    var name = document.getElementById("name").value
    var divElement = document.getElementById(selectedIcon.id);
    var pElement = document.getElementById(id)
    if(pElement){
        pElement.innerHTML = ""
        pElement.style.paddingTop = null;
    }
    else{
        pElement = document.createElement('div');
        pElement.id = id
        pElement.className = "playerName"
    }
    pElement.innerHTML = name;
    
    if(document.getElementById(selectedIcon.id + "-num") == null || document.getElementById(selectedIcon.id + "-num").innerHTML === ""){
        //if the user has not inputted a number yet or the number field on the icon is empty then make the padding 15 px
        pElement.style.paddingTop = '15px'
    }

    divElement.appendChild(pElement);
}

function deleteIcon(){
    /**
     * deletes an icon when the remove button inside the context menu is clicked
     */
    var icon = document.getElementById(selectedIcon.id);
    icon.remove();
    showContextMenu(false);
}