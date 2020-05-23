const { logger } = require('../../config/winston');

const handle = (error, response) => {
    logger.error(error);
    if (response) {
        response.status(error.status || 500).json(error.response || error);
    }
};

exports.handle = handle;