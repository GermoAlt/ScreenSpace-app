/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/ui/App';
import {name as appName} from './app.json';
import './src/assets/localization/i18n';

AppRegistry.registerComponent(appName, () => App);
