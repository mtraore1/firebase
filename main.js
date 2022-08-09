/**
 * @TODO get a reference to the Firebase Database object
 */
// gets variable we can use to make changes to our database

const database=firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const chatDiv = document.getElementById("all-messages");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-btn");
//whenever someone clicks on send button, update the database
sendButton.onclick=updateDB
/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event){
    //prevents page from refreshing
    event.preventDefault()

    //create a variable with our message info to use as a database entry
    const entry = {
        username: usernameInput.value,
        message: messageInput.value,
    }

    //console.log(entry);

    //adds message to database
    database.push(entry);
    usernameInput.value="";
    messageInput.value="";
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */

//Call addMessageToBoard() whenever a new row is added to our database
database.on("child_added",addMessageToBoard);

function addMessageToBoard(rowData){
    const messageObject = rowData.val();
    console.log(messageObject);

    let messageDiv = makeSingleMessageHTML(messageObject.username,messageObject.message);
    chatDiv.appendChild(messageDiv);
}
/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */

/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */

 function makeSingleMessageHTML(usernameTxt, messageTxt) {
    // create a parent div
    let parentDiv = document.createElement("div");
    // add .message class
    parentDiv.classList.add("single-message");

    // create the first p tag for username
    let usernameP = document.createElement("p");
    // add .message-username class
    usernameP.classList.add("single-message-username");
    // update the innerHTML to the appropriate data
    usernameP.innerHTML = usernameTxt + ":";
    // append to parentDiv
    parentDiv.appendChild(usernameP);

    // create the second p tag for message
    let messageP = document.createElement("p");
    // update the innerHTML to the appropriate data
    messageP.innerHTML = messageTxt;
    // append to parent Div
    parentDiv.appendChild(messageP);

    // return the parent div
    return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */