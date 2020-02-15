import { successResponce } from '@utils/exchange';

class homeController {
    static welcome(req, res) {
        successResponce(req, res, 'Welcome to Mavenai Task', 200, {});
    }
}

export default homeController;
