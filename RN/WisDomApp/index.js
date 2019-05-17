/**
 * @format
 */
import './src/config/index';
import {AppRegistry, YellowBox} from 'react-native';
import App from './src/Root';
import {name as appName} from './app.json';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning:', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Possible Unhandled', 'Module RCTImageLoader']);

AppRegistry.registerComponent(appName, () => App);
