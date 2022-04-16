import { useEffect } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import { registerForPushNotifications } from './utility/pushNotificationService'

import Home from './pages/home';
import Events from './pages/events';
import Map from './pages/map';

const Tab = createBottomTabNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  useEffect(() => {
    registerForPushNotifications()
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Events') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              } else if (route.name === 'Map') {
                iconName = focused ? 'ios-map' : 'ios-map-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarActiveTintColor: '#0BB4A9',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
          })}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Events" component={Events} />
            <Tab.Screen name="Map" component={Map} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFFFFD',
  },
});

export default App