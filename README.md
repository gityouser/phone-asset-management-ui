This is the *client* side of _**phone-asset-management**_ project.


It is written in [React](https://reactjs.org/) and it uses [React Router](https://reactrouter.com/) to manage routing.<br>


>The [API server](https://github.com/gityouser/phone-asset-management-api) must be running and connected to a [MongoDB](https://www.mongodb.com/) database instance in order for the client to interact with it.

## Steps to run

Clone the repository and run:
### `npm install`
### `npm run build` (yarn build)
### `npm run start` (yarn start)

The server will probably default to [http://127.0.0.1:8080](http://127.0.0.1:8080), if the port is not already taken.


**`yarn start` spins up a [web server](https://www.npmjs.com/package/http-server) to serve the ui. This is required because the project uses React router to handle routing and pushing to [history object](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) won't be possible using a `file://` path.*

To run the app in development mode, run:
### `npm run build`