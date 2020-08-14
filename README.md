# pcr-managment-system


[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

HOW TO RUN CLIENT

Modify the `url`  in the `pcr-managment-system/myapp/src/services/EventService.js` to your server address

Then
```sh
$ cd myapp
$ npm install --production
$ npm run serve
```
OR 

```sh
$ cd myapp
$ npm install --production
$ npm run build
```
Then put the `dist` dir in the root directory of the `/server`, and run the server as following.

HOW TO RUN SERVER

Modify the `mysql` in the `pcr-managment-system/server/dbcon.js` to your mysql account

Then
```sh
$ cd server
$ npm install
$ npm start
```
### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT

