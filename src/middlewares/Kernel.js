/**
 * Register your Express middlewares
 *
 */

import CORS from './CORS';
import Http from './Http';
import Statics from './Statics';
import StatusMonitor from './StatusMonitor';

class Kernel {
    static init(_express) {
        let express = _express;
        // Mount CORS middleware
        express = CORS.mount(_express);

        // Mount basic express apis middleware
        express = Http.mount(express);

        // Mount statics middleware
        express = Statics.mount(express);

        // Mount status monitor middleware
        express = StatusMonitor.mount(express);

        return express;
    }
}

export default Kernel;
