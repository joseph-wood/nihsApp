import {
    createStackNavigator,
    createBottomTabNavigator
  } from "react-navigation";
  
  import HomeScreen from "../screens/HomeScreen";
  import SettingsScreen from "../screens/SettingsScreen";
  import JoinScreen from "../screens/JoinScreen";
  import HostScreen from "../screens/HostScreen";
  import JoinKeyScreen from "../screens/JoinKeyScreen";
  import HostKeyScreen from "../screens/HostKeyScreen";

  const HostStack = createStackNavigator({
    HostKey: HostKeyScreen,
    Host: HostScreen
  });
  
  HostStack.navigationOptions = {
    tabBarLabel: "Host",
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
      }
    }
  };
  
  const JoinStack = createStackNavigator({
    JoinKey: JoinKeyScreen,
    Join: JoinScreen
  });
  
  JoinStack.navigationOptions = {
    tabBarLabel: "Join",
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
      }
    }
  };
  
  const HomeStack = createStackNavigator({
    Home: HomeScreen
  });
  
  HomeStack.navigationOptions = {
    tabBarLabel: "Home",
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
      }
    }
  };
  
  const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
  });
  
  SettingsStack.navigationOptions = {
    tabBarLabel: "Settings",
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
      }
    }
  };
  
  export default createBottomTabNavigator({
    HostStack,
    JoinStack,
    HomeStack,
    SettingsStack
  });