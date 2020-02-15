/* eslint-disable no-tabs */
/**
 * Define the error & exception handlers
 *

 */

import Log from '@middlewares/Log';
import Locals from '@providers/Locals';

class Handler {
    /**
	 * Handles all the not found routes
	 */
    static notFoundHandler(_express) {
        _express.use('*', (req, res) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
            return res.status(404).json({
                success: false,
                message: 'API Not Found',
                error_code: 404,
                data: {},
            }).end();
        });

        return _express;
    }

    /**
	 * Handles your api/web routes errors/exception
	 */
    static clientErrorHandler(err, req, res, next) {
        Log.error(err.stack);

        if (req.xhr) {
            return res.status(500).send({ error: 'Something went wrong!' });
        }
        return next(err);
    }

    /**
	 * Show undermaintenance page incase of errors
	 */
    static errorHandler(err, req, res) {
        Log.error(err.stack);
        res.status(500);

        const { apiPrefix } = Locals.config();
        if (req.originalUrl.includes(`/${apiPrefix}/`)) {
            if (err.name && err.name === 'UnauthorizedError') {
                const innerMessage = err.inner && err.inner.message ? err.inner.message : undefined;
                return res.json({
                    error: [
                        'Invalid Token!',
                        innerMessage,
                    ],
                });
            }

            return res.json({
                error: err,
            });
        }

        return res.render('pages/error', { error: err.stack, title: 'Under Maintenance' });
    }

    /**
	* Register your error / exception monitoring
	* tools right here ie. before "next(err)"!
	*/
    static logErrors(err, req, res, next) {
        Log.error(err.stack);

        return next(err);
    }
}

export default Handler;
