const mongoose = require('mongoose');
const { logger } = require('./winston');

//const host = process.env.HOST || '10.150.219.250';
const host = process.env.HOST || 'ec2-3-16-44-196.us-east-2.compute.amazonaws.com';
const port = process.env.HOST || '27017';
//const password = 'W*!fK8SX.jD{w>W*';
const password = 'K#@zXoI0*SCx}zmN';

const db = 'ms-totemturismo-node' || process.env.MONGO_DATABASE || process.env.npm_package_name;

//mongoose.connect(`mongodb://${host}:${port}/${db}?authSource=admin`, { useNewUrlParser: true });
mongoose.connect(`mongodb://${host}:${port}/${db}?authSource=admin`, { user: 'root', pass: `${password}`, useNewUrlParser: true });

mongoose.connection.on('connected', () => {
	logger.info('connected to mondodb');
});

mongoose.connection.on('error', error => {
	logger.error(`error to connect to mongodb: ${error}`);
});

mongoose.connection.on('disconnected', () => {
	logger.info(`successful closed connection with mongodb`);
});

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		process.exit(0);
	});
});

