import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
const axios = require('axios').default;

import EventCard from '../components/eventCard';
import { bgImage } from '../images/images';

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  let past = new Date() < new Date('may 7, 2022')

  useEffect(async () => {
    setLoading(true)
    await axios.get('https://uwo-sr-app-server.herokuapp.com/api/data/getAllEvents')
      .then(res => {
        const eventData = res.data
        setEvents(eventData)

      })
      .catch(error => {
        console.error(error);
      });
    setLoading(false)
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Events
          </Text>
          {past && (
            <Text style={styles.subTitle}>
              *Events listed are for May 7th, 2022
            </Text>
          )}
          {loading && (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="hsv(0°, 0%, 75%)" />
            </View>
          )}
          {!loading && <FlatList
            style={styles.flatList}
            data={events}
            renderItem={({ item }) => (
              <EventCard item={item} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />}
        </View>
      </ImageBackground>
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
    flexDirection: 'column',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    marginBottom: 10,
    fontFamily: 'Roboto_700Bold',
  },
  subTitle: {
    fontFamily: 'Roboto_400Regular',
    paddingBottom: 15,
  },
  text: {
    fontFamily: 'Roboto_400Regular',
    paddingBottom: 5,
  },
  flatList: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Events