 # Live Polling:
__Present and Poll an Audience Instantly__

### [View the deployed version](http://jeremywells.io/live-polling).

This is the browser interface for the LivePolling app.

Code for the API [can be found here](https://github.com/jsheridanwells/LivePollingAPI)

 # OVERVIEW

The app Live Quiz provides a way for a teacher or a presenter to show content to an audience, solicit responses, and record data from those responses in real time.

 # FEATURES

 * The presenter can import slides from Google Slides to present to an audience through the app.
 * The presenter can send an access code to the presentation to an audience. With the access code, audience members can enter their names and stream the presentation on their own devices.
 * The presenter can insert poll questions or quiz questions in the presentation to ask the audience.
 * Using devices, the audience can respond to quiz questions and those responses will be recorded to a database.
 * TECHNICAL SPECIFICATIONS

 ## Live Polling will make use of the following technologies:

 * Ruby on Rails for scaffolding the application models, controllers and views, creating an ORM, and querying a database.
 * Rails Action Cable for websockets integration.
 * The OminAuth gem for user authentication through Google.
 * The Google Slides API.
 * D3.js for data visualization.
 * Heroku for deploying the application.

 ## GOALS

The goals of the project are to:

 * Independently learn and implement new technologies, specifically Action Cable, OmniAuth, and the Google Docs API.
 * Create real-time interactions among application users through websockets.
 * Use a third-party API in the application. The Google Docs API will be used initially, possibly additionally incorporating the Khan Academy API later as a way to include more third-party content in the application.
