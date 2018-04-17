# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following commands:

```
yarn install
cd client
yarn install
cd ..
``

After both installations complete, run the following command in your terminal:

```
yarn start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

After confirming that you have an up to date git repository and a Heroku app created, complete the following:

1. Build the React app for production by running the following command:

```
yarn build
```

2. Add and commit all changes to git

3. Push to Heroku

If all previous steps were followed correctly, your application should be deployed to Heroku!
# Deployment

In this activity we will deploy the React Reading List application to Heroku.

## Instructions

* Deploy the React Reading List application to Heroku. Make sure to perform the following:

  * Initialize the project folder as a git repo.

  * Create a Heroku app for the React Reading List App.

  * Add a MongoLab Addon for the React Reading List Heroku app.

  * Run `yarn build` from within the project folder.

### Hints

* Make sure you add and commit all changes before pushing up to Heroku.

* If your deployment fails, run `heroku logs` while in the project directory. This should print all of the logs produced from the failed deployment. Usually the issue can be found at the start of any errors.

* Ask an instructor or TA for help if you get stuck. Help your neighbor if you finish early!