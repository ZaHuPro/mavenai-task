/**
 * Define & configure your status monitor
 *
 */

import expressStatusMonitor from 'express-status-monitor';

import Locals from '@providers/Locals';
import Log from './Log';

class StatusMonitor {
    static mount(_express) {
        Log.info('Booting the \'StatusMonitor\' middleware...');

        // Define your status monitor config
        const monitorOptions = {
            title: Locals.config().name,
            path: '/status-monitor',
            spans: [
                {
                    interval: 1,
                    retention: 60,
                },
                {
                    interval: 5,
                    retention: 60,
                },
                {
                    interval: 15,
                    retention: 60,
                },
            ],
            chartVisibility: {
                mem: true,
                rps: true,
                cpu: true,
                load: true,
                statusCodes: true,
                responseTime: true,
            },
            healthChecks: [
                {
                    protocol: 'http',
                    host: 'localhost',
                    path: '/',
                    port: '4040',
                },
            ],
        };

        // Loads the express status monitor middleware
        _express.use(expressStatusMonitor(monitorOptions));

        return _express;
    }
}

export default StatusMonitor;
