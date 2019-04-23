# Table of Contents

- [Overview](#overview)
  - [Technology Stack](#technology-stack)
  - [Directory Layout](#directory-layout)
- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
  - [How to test](#how-to-test)
  - [How to debug](#how-to-debug)
  - [Deploying to IBM cloud](#deploying-to-ibm-cloud)
    - [Delivery Pipeline](#delivery-pipeline)
- [API Documentation](#api-documentation)
- [Demos](#demos)
- [Reference Articles and Tutorials](#reference-articles-and-tutorials)

# Overview

The ACIT NodeJS Starter is a boilerplate and tooling application for bootstrapping [NodeJS](https://nodejs.org/en/) infrastructures with a focus on [IBM Cloud](https://www.ibm.com/cloud/) technologies. It is best suited for developing REST APIs as a stand-alone (micro)service, backing up mobile or web front-ends (See [acit-ng-seed](https://git.ng.bluemix.net/ruben.gomez/acit-ng-seed)). For more information about the ACIT, please visit [us](https://in.accenture.com/ibm/).

This project was forked and based on Kriasoft's [NodeJS API Starter Project](https://github.com/kriasoft/nodejs-api-starter)

## Technology Stack

* [NodeJS](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/en/), [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript),
[Babel](http://babeljs.io/), 
[Flow](https://flow.org/), 
[ESLint](https://eslint.org/), 
[Prettier](https://prettier.io/) — Core platform and web tools
* [Express](https://expressjs.com/), 
[session](https://github.com/expressjs/session), [cors](https://github.com/expressjs/cors) — Common HTTP server features.
* [Jest](http://facebook.github.io/jest/) - Unit and snapshot testing

## Directory Layout

```bash
.
├── /build/                     # The compiled output (via Babel)
├── /src/                       # Node.js application source files
│   ├── /__tests__/             # Application tests
│   ├── /routes/                # Express endpoints
│   ├── /app.js                 # Express.js application
│   ├── /config.js              # Specific application configuration information
│   ├── /logger.js              # Application information logger 
│   ├── /router.js              # Express endpoints router
│   └── /server.js              # Node.js server (entry point)
├── /tools/                     # Build automation scripts and utilities
├── package.json                # List of project dependencies
```

# Quickstart

## Prerequisites

1) NodeJS [8.9.4](https://nodejs.org/en/download/) or above
2) [Yarn](https://yarnpkg.com/en/docs/install) 
3) Highly recommended: [Visual Studio Code](https://code.visualstudio.com/) Extensions: EditorConfig, ESLint, Flow and Prettier.

## Getting started
Clone this project and host the code either on Github or IBM's Git repository

`git clone the repo'

`cd <your-project-name>`

Install dependecies.

`yarn install` 

To build the project and launch a development server with hot reload.

`yarn dev`

The NodeJS server will be listening on https://localhost:3000

---

## How to test

```bash
yarn lint              # Find problematic patterns in code
yarn check             # Check source code for type errors
yarn test          # Runs Jest on the project
```

With Visual Studio Code's debugger you can also launch Jest in debug mode with the included configuration.

For more information visit http://facebook.github.io/jest/

## How to debug

In order to run the app with V8 inspector enabled, simply run the server in debug mode `yarn run debug` and use Visual Studio Code's debugger to attach to the running process.



 Pending

# Demos

[Watson Conversation Demo](https://acit-node-starter.mybluemix.net/)


# Reference Articles and Tutorials

* [Working with Delivery Pipelines](https://console.bluemix.net/docs/services/ContinuousDelivery/pipeline_working.html#pipeline-working)
* [Stop using JWT for sesstions](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)
  ([part 2](http://cryto.net/~joepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/))
  by [Sven Slootweg](https://github.com/joepie91)
* [How to Safely Store Your Users' Passwords](https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016) by [P.I.E.](https://paragonie.com/)

