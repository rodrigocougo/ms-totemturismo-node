/* require('appdynamics').profile({
  controllerHostName: 'saintpaul.saas.appdynamics.com',
  controllerPort: 443,
  controllerSslEnabled: true, // Set to true if controllerPort is SSL
  accountName: 'saintpaul',
  accountAccessKey: '3k9mnp4lruue', // required
  applicationName: 'Portal',
  tierName: 'MicroService',
  nodeName: 'fox-ms-Company-node',
}); */

const dotenv = require('dotenv');
/**
 * Load environment variables from .env file, where MS keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Module dependencies.
 */
require('./config/mongo');
require('./app/models/CityModel');
require('./app/models/AtractiveModel');
require('./app/models/ServiceModel');
require('./app/models/HotelModel');
require('./app/models/GastronomyModel');
require('./app/models/EventsModel');
require('./app/models/PdvModel');
require('./app/models/UserModel');

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { winston } = require('./config/winston');
const chalk = require('chalk');
const expressStatusMonitor = require('express-status-monitor');
const helmet = require('helmet');
const cors = require('cors');
const CityRoutes = require("./app/routes/city");
const AtractiveRoutes = require("./app/routes/atractive");
const ServiceRoutes = require("./app/routes/service");
const HotelRoutes = require("./app/routes/hotel");
const GastronomyRoutes = require("./app/routes/gastronomy");
const EventsRoutes = require("./app/routes/events");
const PdvRoutes = require("./app/routes/pdv");
const UserRoutes = require("./app/routes/user");
const gatewayRoutes = require("./app/routes/gateway");
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

/**
 * Create Express server.
 */
const app = express();

// source release general
// eslint-disable-next-line func-names
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
};
app.use(allowCrossDomain);

/**
 * Express configuration.
 */
app.set('json spaces', 2);
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 9001);
app.use(expressStatusMonitor());
app.use(compression());
app.use(morgan('short', { stream: winston.stream }));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

/**
 * Router Handler
 */
app.use('/city', CityRoutes);
app.use('/atractive', AtractiveRoutes);
app.use('/service', ServiceRoutes);
app.use('/hotel', HotelRoutes);
app.use('/gastronomy', GastronomyRoutes);
app.use('/events', EventsRoutes);
app.use('/pdv', PdvRoutes);
app.use('/user', UserRoutes);
app.use('/gateway', gatewayRoutes);
//app.use('/ms-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Error Handler.
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
