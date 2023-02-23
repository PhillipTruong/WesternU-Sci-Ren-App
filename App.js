import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

import { registerForPushNotifications, listenForNotifications } from './utility/pushNotificationService'
import { RootSiblingParent } from 'react-native-root-siblings';

import Home from './pages/home';
import Events from './pages/events';
import Map from './pages/map';
import Faq from './pages/faq';
import Agenda from './pages/agenda';

const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [agendaChange, setAgendaChange] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);


  const handleAgendaChange = () => {
    setAgendaChange(!agendaChange);
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded])

  useEffect(() => {
    registerForPushNotifications()
    listenForNotifications()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <RootSiblingParent>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
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
                iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
              } else if (route.name === 'Agenda') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              } else if (route.name === 'Map') {
                iconName = focused ? 'ios-map' : 'ios-map-outline';
              }
              else if (route.name === 'Faq') {
                iconName = focused ? 'help' : 'help-outline';
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
            <Tab.Screen name="Events" children={() => <Events handleAgendaChange={handleAgendaChange} />} />
            <Tab.Screen name="Agenda" children={() => <Agenda agendaChange={agendaChange} />} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Faq" component={Faq} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </RootSiblingParent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00c2cb',
  },
});

export default App