# vuochat
Vuochat is an instant messaging web application. It is developed in [Node.js](https://nodejs.org/es/)
and [Typescript](https://www.staging-typescript.org). It incorporates authentication through social networks using 
[Passport.js](http://www.passportjs.org), and real-time communication is possible thanks to [Socket.io](https://socket.io),
conversations are stored in [MongoDB](https://www.mongodb.com/es).

## 1. Clone the project.
Run the following command `git clone https://github.com/IvanZM123/vuochat.git`. This command will clone this project on your computer.
To run this command you need to have [Git](https://git-scm.com) installed on your computer or download manually.

## 2. Installation
Once the project is cloned, enter the project directory and run the following command: `npm i`.
This command will download all the dependencies that our project needs to work.
It is worth mentioning that you need to have [Node.js](https://nodejs.org/es/) installed.
___
As in this project we are saving the emails sent in [MongoDB](https://www.mongodb.com/es), you need to install the program.
___
This project works with Typescript, therefore you will have to download it, for this execute the following command: `npm install -g typescript`

## 3. Configurations
Before starting, you need to take a few steps so that the project does not present problems.

### 3.1 Set environment variables
In the project you will find a file `.example.env` this file contains all the environment variable of the application, complete each one of them.
- `Google`: In order to consume the Google authentication API it is necessary that you create some crendencials here 
[Console Google Developers](https://console.developers.google.com), after having created them create a file `.env`
in the root of the project and copy the entire structure from the `.example.env` file and paste the credentials into the google variables, 
and repeat this same step for all the others.

- `Twitter`: To obtain the Twitter credentials, enter here: [Twitter Developers](https://developer.twitter.com/en/portal/projects-and-apps)

- `Github`: To get Github credentials go here: [Github Apps](https://github.com/settings/apps)

- `Facebook`: To obtain Facebook credentials, enter here: [Facebook Developers](https://developers.facebook.com/apps/)

- `webpush`: As the application incorporates notifications it is necessary to add the tokens, but do not worry, 
to do so type the following command in your console` npx web-push` and this will generate the crendenciales, 
now paste them in the environment variables from the `.env` file. Also enter the following 
path: `/src/app/public/js/dump/item.js` there replace the current value with the public token you just generated.

## Development server
Once all the above operations have been carried out, execute the following commands:
1. `mongod` This command started the MongoDB database, it needs to be there since you will have to interact with it.
2. `npm start` This command will compile the Typescript code to JavaScript, and generate a `dist` folder and a will start the server.
