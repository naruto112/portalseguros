import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Routes from './src/Navigator'

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => Routes);
