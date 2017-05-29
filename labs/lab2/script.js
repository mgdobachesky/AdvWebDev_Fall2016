'use strict';

//getData function makes an ajax call to the database and eventually returns data
function getData(url) {
    //create a new promise
    var promise = new Promise(userPromise);
    
    //define the new promise's callback
    function userPromise(resolve, reject) {
        //create new httpRequest object
        var httpRequest = new XMLHttpRequest();
        
        //display an error is the http request object can not be created
        if(!httpRequest) {
            reject('Cannot create an XMLHTTP instance');
        }
        
        //open the request to the url with the intention to GET data, then send the request
        httpRequest.open('GET', url);
        httpRequest.send();
        
        //add event listeners for the load and error event on the httpRequest
        //this also bind the httpRequest to the callbacks
        httpRequest.addEventListener('load', httpResolve.bind(httpRequest));
        httpRequest.addEventListener('error', httpReject.bind(httpRequest));
        
        //if the status was returned in the 200s (successful), resolve the promise with the returned data
        //else reject the promise with the status text
        function httpResolve() {
            if(this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(this.response));
            } else {
               reject(this.statusText); 
            }
        }
        
        //also reject the promise if there was an error loading the httpRequest
        function httpReject() {
            reject(this.statusText);
        }
    }
    
    //return the promise
    return promise;
}

//getUsers function runs after the getData function has run
//it resolves the promise by running a function that fills in the nav bar with data
var getUsers = {
    success: function(data) {
        displayUsers(data);
    },
    error: function(data) {
        console.log('error', data);
    }
};

//getUser function runs after the getData function has run
//it resolves the promise by running a function that fills in the selected users information
var getUser = {
    success: function(data) {
        displayUserInfo(data);
    },
    error: function(data) {
        console.log('error', data);
    }
};

//displayUsers runs after a resolved getData promise
//it fills in the nav bar with clickable user names
function displayUsers(users) {
    //create a shortcut to the html element that will be modified
    //also create a fragment to store changes on, and that will be later appended to the html element
    var dom = document.querySelector('.users');
    var docFrag = document.createDocumentFragment();
    
    //run a foreach loop for each user in the users object
    //start out by selecting the array within the object so that the forEach method can be run
    users['users'].forEach(function(user) {
        //create a list item to be appended to the nav bar
        var li = document.createElement("li");
        //make the text of the list item equal to the users full name
        li.textContent = user.name['first'] + " " + user.name['last'];
        //set a click event listener that contains the captured user data
        li.addEventListener('click', getUserInfo.bind(null, user));
        //append the list item to the document fragment
        docFrag.appendChild(li);
    });
    
    //append the document fragment to the selected html element
    dom.appendChild(docFrag);
}

//getUserInfo runs after a user has been clicked
//it sends a request to the getData function for the document belonging to said user
function getUserInfo(user) {
    getData('data/' + user._id + '.json').then(getUser.success, getUser.error);  
}

//displayUserInfo runs after a resolved getData promise
//it fills in the page with information related to the chosen user
function displayUserInfo(user){
    //store the html elements that are going to be manipulated
    var dom = document.querySelector('.featured > article');
    var pic = document.querySelector('.featured > figure');
    //create a document fragment to store changes on
    var docFrag = document.createDocumentFragment();
    
    //remove previous data from the html elements in question
    while(dom.firstChild) {
        dom.removeChild(dom.firstChild);
    }
    
    while(pic.firstChild) {
        pic.removeChild(pic.firstChild);
    }
    
    //append all required data to the document fragment
    docFrag.appendChild(styledOutput('Full Name: ', user.name['first'] + " " + user.name['last']));
    docFrag.appendChild(styledOutput('Company: ', user.company));
    docFrag.appendChild(styledOutput('Email: ', user.email));
    docFrag.appendChild(styledOutput('Phone: ', user.phone));
    docFrag.appendChild(styledOutput('Address: ', user.address));
    docFrag.appendChild(styledOutput('Registered: ', user.registered));
    docFrag.appendChild(styledOutput('Age: ', user.age));
    docFrag.appendChild(styledOutput('Eye Color: ', user.eyeColor));
    docFrag.appendChild(styledOutput('Greeting: ', user.greeting));
    docFrag.appendChild(styledOutput('Favorite Fruit: ', user.favoriteFruit));
    docFrag.appendChild(styledOutput('Balance: ', user.balance));
    docFrag.appendChild(styledOutput('About: ', user.about));
    
    //document fragment is not needed for displaying the picture because only datum is being appended
    pic.appendChild(displayPic("img/" + user.picture));
    //append all data in the fragment to the specified html element
    dom.appendChild(docFrag);
    
    //if the user is active then set his/her class to active, or else set it to inactive
    if(user.isActive) {
        dom.setAttribute('class', 'active');
    } else if(!user.isActive) {
        dom.setAttribute('class', 'inactive');
    }
}

//styledOutput creates formatting for the user data being displayed
function styledOutput(label, text) {
    //create tags and text nodes
    var pTag = document.createElement('p'),
        strongTag = document.createElement('strong'),
        pText = document.createTextNode(text),
        strongText = document.createTextNode(label);

    //append text to strong element
    strongTag.appendChild(strongText);
    //append strong element to p element
    pTag.appendChild(strongTag);
    //append p text to p element
    pTag.appendChild(pText);
    //return the p tag
    return pTag;
}

//displayPic sets up the user picture to be displayed
function displayPic(src) {
    //create an img html element
    var img = document.createElement("img");
    //set the img source to the passed in value
    img.src = src;
    
    //return the img tag
    return img;
}

//run last after everything else has loaded
//get the data that fills the navigation bar
getData('data/users.json').then(getUsers.success, getUsers.error);