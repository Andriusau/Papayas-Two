# Like...Um

## WHAT WE DO

Professionals everywhere are having interactions constantly.  Whether those are in person interactions or phone call interactions.  During these interactions crutch words are being used more than intended and the people using them either don't know they are or want to stop using them.

### Project Overview

Like, um is a online platform that will take in users audio files of conversations they have had and transcribe that talk track and point out the crutch words being used.  Users will be able to set input a list of their own defined crutch words to be spotted or leverage our list of commonly used crutch words.

### Project Requirements
1. Must use React, Vue, or Angular in some way (even if minimal)
2. Must use a Node and Express Web Server
3. Must be backed by a MySQL or MongoDB Database with a Sequelize or Mongoose ORM
4. Must have both GET and POST routes for retrieving and adding new data
5. Must be deployed using Heroku (with Data)
6. Must utilize at least two libraries, packages, or technologies that we haven’t discussed
7. Must allow for or involve the authentication of users in some way
8. Must have a polished frontend / UI
9. Must have folder structure that meets MVC Paradigm
10. Must meet good quality coding standards (indentation, scoping, naming)
11. Must not expose sensitive API key information on the server, see Protecting-API-Keys-In-Node.md
- - -
## PRODUCT GOALS

### Leverage the Google Cloud Speech-to-Text API
We intend to use the Google Cloud Speech to Text API to transcribe audio files

### Let users create accounts where they can track their progress
We want users to have the ability to use our application to filter through the transcriptions and highlight user defined crutch words.  Maybe even have the the user search for any specific word in the transcription.

### Visualize the trends in crutch words being used
We want to help visualize trends of crutch words being used so that users can see that this platform is helping them get better.
- - -
## TECHNOLOGY USED

### Client-Side
* Chartist
* React
* React Bootstrap
* React Chartist
* React Dom
* React Router
* React Router Dom
* React Scripts
* Whatwg Fetch
### Server-Side
* Bcrypt
* Body Parser
* Dot Env
* Express
* Mongoose
* Busboy
* Busboy Body-Parser
* Busboy Promise
* CORS
* DotEnv
* BTOA
### Third Party Libraries
* Mongo DB
* Google Speech API
* Heroku - Deployment

- - -
## Deployed Site
[Check out the live app here](https://like-um.herokuapp.com/)