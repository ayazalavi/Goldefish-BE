process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

require('dotenv').config()
 import AuthRoute from '@routes/auth.route';
 import IndexRoute from '@routes/index.route';
 import validateEnv from '@utils/validateEnv';
import App from './app';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute()]);

app.listen();
