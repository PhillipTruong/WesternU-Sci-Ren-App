import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device';
const axios = require('axios').default;

export const registerForPushNotifications = async () => {
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

