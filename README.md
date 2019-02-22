# ReacTwitch
  
ReacTwitch is a responsive React Single-Page Application that utilises [React Select](https://react-select.com/home) dropdown library to search dynamically and load data via  [Twitch  API](https://dev.twitch.tv/docs/v5/) asynchronously. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Demo
[ReacTwitch - Live Demo](https://buralog.github.io/react-twitch-app/)

## Stack

| Tool             | Description   |
| :-------------:|--------------|
| [React](http://facebook.github.io/react/index.html) | A JavaScript library for building user interfaces |
| [React Router](https://reacttraining.com/react-router/) | Declarative routing for React |
| [React Bootstrap](https://react-bootstrap.github.io/) | The most popular front-end framework Rebuilt for React. |
| [React Select](https://react-select.com/home) | A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support. |
| [Node-Sass](https://github.com/sass/node-sass) | Node-sass allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware. |
| [Axios](https://github.com/axios/axios) | Promise based HTTP client for the browser and node.js |
| [Moment.js](https://momentjs.com/) | Parse, validate, manipulate, and display dates and times in JavaScript. |
| [Toastr](https://codeseven.github.io/toastr/) | Simple Javascript toast notifications |
| [Lodash](https://lodash.com/) | A modern JavaScript utility library delivering modularity, performance & extras. |
| [PropTypes](https://www.npmjs.com/package/prop-types) | Runtime type checking for React props and similar objects. |
| [Jest](https://jestjs.io/) | Jest is a delightful JavaScript Testing Framework with a focus on simplicity. |
| [Enzyme](https://airbnb.io/enzyme/) | Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. |

## Installation
### **1 -**  Clone the project and install the dependencies:

  [Node.js](http://nodejs.org/) is required to get ``npm``.

```
$ git clone https://github.com/buralog/react-twitch-app.git
$ cd react-twitch-app
$ npm install
```

### **2 -** Setup:


[Twitch API Key](https://glass.twitch.tv/login) is required to run the project.

>**Note: This app is currently using Twitch API v5. Make sure you use the correct version of API.**

You need to have an `.env` environment file for your API key:

```
REACT_APP_TWITCH_KEY = your key
```
Use your key in ``src > services > Twitch.js`` file:

```js
const client_id = process.env.REACT_APP_TWITCH_KEY;
```

### **3 -** Run the app:

```sh
$ npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

## Testing
```sh
$ npm test
```
Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

