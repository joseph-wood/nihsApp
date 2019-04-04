import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarOptions: {
    labelStyle: {
      fontSize: 16,
    }
  }
};

const RegisterStack = createStackNavigator({
  Register: RegisterScreen
});

RegisterStack.navigationOptions = {
  tabBarLabel: 'Register',
  tabBarOptions: {
    labelStyle: {
      fontSize: 16,
    }
  }
};

export default createBottomTabNavigator({
  LoginStack,
  RegisterStack
});