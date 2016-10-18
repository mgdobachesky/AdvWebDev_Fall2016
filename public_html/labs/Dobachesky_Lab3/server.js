'use strict';

//require the needed modules
var http = require('http');
var url = require('url');
var fileSystem = require('fs');

//serverFunc method is used as a callback in the createServer method of the http object
var serverFunc = function(request, response) {
    //get the path related to the url being processed
    var pathName = url.parse(request.url).pathname;
    //start after the initial / in the path name
    var fileName = pathName.substr(1);
    
    //callback that runs after a file has been read
    var readFunc = function(err, data) {
        if(err) {
            //if reading failed, pass text saying the page was not found
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.write('<!DOCTYPE html><html><body><div>Page Not Found</div></body></html>');
        } else {
            //run this stuff if the page requested is todo
            if (fileName === 'todo.json'){
                //if reading succeeds, pass the data as a response
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(data.toString());
            } else if (fileName === 'index.html') {
                //if reading succeeds and the index page is requested, load the html page
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
            }
        }
        
        //end the response after everything else is done
        response.end();
    };
    
    //add the appropriate suffix to the page requested
    if (fileName === 'todo') {
        //append .json to the file name
        fileName += '.json';
    } else if (fileName === 'index') {
        //append .html to the file name
        fileName += '.html';
    }

    //run the readFile method of the fileSystem object to read a file
    //passing in the file to be read, along with a callback to handle the response
    fileSystem.readFile(fileName, readFunc);
};

//use the createServer method of the http module to make the server
//do this using the serverFunc function
http.createServer(serverFunc).listen(3000);

//after server has successfully been created, log a note in the console
console.log('Server running at http://localhost:3000');