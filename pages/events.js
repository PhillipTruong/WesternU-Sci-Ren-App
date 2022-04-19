import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView
} from 'react-native';
const axios = require('axios').default;

import EventCard from '../components/eventCard';

const Events = () => {
  const [events, setEvents] = useState([])

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
      <View style={styles.container}>
        <Text style={styles.title}>
          Events
        </Text>
        <Text style={styles.text}>
          *Events listed are for May 7th, 2022
        </Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={events}
        renderItem={({ item }) => (
          <EventCard item={item} />
        )}
        keyExtractor={(item) => item._id.toString()}
      />
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
});

export default Events