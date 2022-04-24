import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
const axios = require('axios').default;

import EventCard from '../components/eventCard';
import { bgImage } from '../images/images';

const Events = () => {
  const [events, setEvents] = useState([])
  let past = new Date() < new Date('may 7, 2022')

  useEffect(async () => {
    await axios.get('https://uwo-sr-app-server.herokuapp.com/api/data/getAllEvents')
      .then(res => {
        const eventData = res.data
        setEvents(eventData)
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Events
          </Text>
          {past && (
            <Text style={styles.text}>
              *Events listed are for May 7th, 2022
            </Text>
          )}
        </View>
        <FlatList
          style={styles.flatList}
          data={events}
          renderItem={({ item }) => (
            <EventCard item={item} />
          )}
          keyExtractor={(item) => item._id.toString()}
        />
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
    paddingHorizontal: 20,
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
    paddingBottom: 5,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center'
  },
});

export default Events