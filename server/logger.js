const fs = require( 'fs' );
const path = require( 'path' );
const winston = require( 'winston' );

const logDir = path.join( __dirname, 'logs' );

if ( !fs.existsSync( logDir ) ) {
  fs.mkdirSync( logDir );
}

const tsFormat = () => ( new Date() ).toLocaleTimeString();

const options = {
  file: {
    level: 'info',
    filename: `${logDir}/app.log`,
    timestamp: tsFormat,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  error: {
    level: 'error',
    filename: `${logDir}/error.log`,
    timestamp: tsFormat,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    timestamp: tsFormat,
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger( {
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File( options.file ),
    new winston.transports.File( options.error ),
    new winston.transports.Console( options.console )
  ]
} );

logger.stream = {
  write( message, encoding ) {
    logger.info( message );
  }
};

module.exports = logger;
