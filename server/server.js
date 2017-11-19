#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from './app';

const dotenv = require('dotenv');

dotenv.config();

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port);
