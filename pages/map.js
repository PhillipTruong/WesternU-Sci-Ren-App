import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
const axios = require('axios').default;

import { WebView } from 'react-native-webview';

const Map = () => {
  const [mapUrl, setMap] = useState()

    useEffect(() => {
    const fetchMap = async () => {
      // get maq
      await axios.get('https://uwo-sr-app-server.herokuapp.com/api/map/')
        .then(res => {
          console.log(res.data.url)
          setMap(res.data.url);
        })
        .catch(error => {
          console.error(error);
          setMap([]);
        });
    }

    fetchMap();
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        <WebView
          source={{
            uri: mapUrl
          }}
        />
        {/* <Text style={styles.title}>Map Screen</Text>
        <Text style={styles.text}>Coming soon!</Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#EFFFFD',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    marginBottom: 10,
    fontFamily: 'Roboto_700Bold',
  },
  text: {
    fontFamily: 'Roboto_400Regular',
  },
});

export default Map