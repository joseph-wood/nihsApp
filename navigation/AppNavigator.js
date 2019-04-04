import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthTabNavigator from './AuthTabNavigator';
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  Auth: AuthTabNavigator,
  Main: MainTabNavigator
}));