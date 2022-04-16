import { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device';

import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './pages/home';
import Events from './pages/events';
import Map from './pages/map';

const axios = require('axios').default;

const Tab = createBottomTabNavigator();

const App = () => {
  const [expoToken, setExpoToken] = useState('')

  registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;

      if (existingStatus !== 'granted') {
        await axios.post('https://uwo-sr-app-server.herokuapp.com/api/expotoken/', {
          token: token
        })
          .then(res => console.log(res.body))
          .catch(error => {
            console.error(error);
          });

        // console.log(token);
        setExpoToken(token)
      }

    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFFFFD',
  },
});

export default App