import { initDb } from './db.js';
import cors from 'cors';
import express from 'express';
import http from 'http';
import routes from './routes.js'

export const app = express();
const port = 8080;
const ip = "127.0.0.1";

app.use(cors());
app.use(express.json());
app.set('port', process.env.PORT || port);
app.set('ipaddr', process.env.IP || ip);

http.createServer(app).listen(app.get('port'), () => {
  console.log("Server listening on port " + app.get('port'));
});

app.use('/', routes);

initDb();









