# LivePolling
Poll and quiz an audience in real time.
<hr>

[View the deployed version](http://jeremywells.io/live-polling).

[View the LivePolling API source code](https://github.com/jsheridanwells/LivePollingAPI).

<hr>

## Features

Create presentations with live __polls__ and __quizzes__. The results of the polls and quizzes can be displayed as charts in real time, or they can be hidden from audiences.
 
 <img src="/documentation/live-polling1.png" width="500" />
 
Easily share links with an audience using a URL shortener and QR codes.

<img src="/documentation/live-polling2.png" width="500" />
 
An audience can follow a presentation and respond to questions using any device.

<img src="/documentation/live-polling3.png" width="500" />
 
 ## Local Installation and Setup
 
 __Pre-requisites:__  You will need to have the following installed in order to compile the app from the source code: 
 
 * [Node.js](https://nodejs.org/en/download/) 
 * [Node Package Manager](https://www.npmjs.com/get-npm)
 * [Sass](http://sass-lang.com/install)
 
 Additionally you will need to clone the LivePolling Rails backend in another directory. Follow the installation instructions from [the backend repo](https://github.com/jsheridanwells/LivePollingAPI).
 
 __Client Side Installation__:
 
 1. Clone the Github repository:
 
 > ``` $ git clone https://github.com/jsheridanwells/LivePolling.git```
 
 2. Navigate to the LivePolling lib directory
 
 > ```$ cd LivePolling/lib```
 
 3. Install the NPM dependencies
 
 > ```$ npm install```
 
 4. You will need to add a Google API key.  This key does not need to be kept secret in the source code. [Follow these instructions for obtaining an API key](https://www.bloggingocean.com/create-google-url-shortener-api-key/).
 
 5. Create a credentials file to hold your Google API key:
 
 
 > ```$ touch app/creds/googleCreds.js```
 
 6. Copy the following code block into the googleCreds.js file, replacing 'YOUR API KEY' with the API key copied from Google:
 ```
 'use strict';
  module.exports = {api: 'YOUR API KEY'};
 ```
 7. From the `lib` directory, run Grunt. This will built the `dist/built.js` file and the `css/main.css` files. It was also launch your browser at `http://localhost:8080`:
 
>  ```$ grunt```
 
 That should be all for compiling the client-side code for LivePolling. Again you will have to compile the [Rails code](https://github.com/jsheridanwells/LivePollingAPI) in a separate directory in order for the app to fully function.

## Built With:

[Angular JS](https://angularjs.org/)

[Action Cable JS](https://www.npmjs.com/package/actioncable)

[Bootstrap 4](https://getbootstrap.com/)

[D3](https://d3js.org/)

[Qrios](https://github.com/neocotic/qrious)

[Google APIs](https://developers.google.com/apis-explorer/#p/)

## Author
  Jeremy Sheridan Wells

  [Github: jsheridanwells](http://www.github.com/jsheridanwells)

  [Twitter: @jsheridanwells](http://twitter.com/jsheridanwells)
