import { useEffect, useState } from 'react'
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
import { RootSiblingParent } from 'react-native-root-siblings';

import Home from './pages/home';
import Events from './pages/events';
import Map from './pages/map';
import Faq from './pages/faq';
import Agenda from './pages/agenda';

const Tab = createBottomTabNavigator();

const App = () => {
  const [agendaChange, setAgendaChange] = useState(false)

  const handleAgendaChange = () => {
    setAgendaChange(!agendaChange)
  }

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
      <RootSiblingParent>
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
                  iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
                } else if (route.name === 'Agenda') {
                  iconName = focused ? 'ios-checkbox' : 'ios-checkbox-outline';
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00c2cb',
  },
});

export default App