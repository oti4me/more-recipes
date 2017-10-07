#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app';

import http from 'http';

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, () => {
  console.log('Server running in localhost 3000');
});
