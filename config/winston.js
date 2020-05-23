const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/log-${new Date().toDateString()}.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// custom format
const customFormat = printf(({ level, message, label, timestamp, stack }) => {
  return `[${new Date(timestamp).toLocaleString()}] [${level.toUpperCase().padStart(4).padEnd(4)}] ${message}${(stack ? '\n'+stack : '')}`;
});

// instantiate a new Winston Logger with the settings defined above
const logger = new createLogger({
	format: combine(
    /*label({ label: 'right meow!' }),*/
    timestamp(),
    customFormat
  ),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};
exports.logger = logger;
exports.winston = logger;
