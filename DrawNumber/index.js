import { registerRootComponent } from 'expo';

import App from './App';

module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./assets/fonts/'], // Caminho para a pasta das fontes
  };

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
