#!/usr/bin/env node

import app from './app';

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || '3001';
app.set('port', port);

app.listen(port);
