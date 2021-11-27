process.env['NODE_CONFIG_DIR'] = __dirname + '/src/configs';
require('dotenv').config()
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import ProfileRoute from '@routes/profile.route';
//import validateEnv from '@utils/validateEnv';
import App from './src//app';

//validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new ProfileRoute()]);

app.listen();
