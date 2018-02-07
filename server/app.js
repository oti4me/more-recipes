// Import dependencies
import express from 'express';
import path from 'path';
import logger from 'morgan'
import bodyParser from 'body-parser';
import validator from 'express-validator';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import api from './routes/api';

// create express app
const app = express();
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, '../dist/client/public')));

if (process.env.NODE_ENV === 'development') {
	app.use(webpackMiddleware(webpack(require('../webpack.config')), {
		publicPath: require('../webpack.config').output.publicPath
	}));
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/documentation', express.static('client/public/build'));

app.use('/api/v1', api);

if (process.env.NODE_ENV === 'development') {
	app.use('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});
}

app.use('/', express.static('dist/client'));
app.use('*', express.static('dist/client'));

export default app;
