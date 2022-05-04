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
import AsyncStorage from '@react-native-async-storage/async-storage';

import EventCard from '../components/eventCard';
import { bgImage } from '../images/images';

const Agenda = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  let past = new Date() < new Date('may 7, 2022')

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('testingKey')
      if (value !== null) {
        console.log(value)
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, [])

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
            Agenda
          </Text>
          <Text style={styles.heading}>Stage Shows</Text>
          <FlatList
            style={styles.flatList}
            data={events}
            renderItem={({ item }) => (
              <EventCard item={item} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
          <Text style={styles.heading}>Booths</Text>
          <FlatList
            style={styles.flatList}
            data={events}
            renderItem={({ item }) => (
              <EventCard item={item} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
          {loading && (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="hsv(0°, 0%, 75%)" />
            </View>
          )}
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    marginBottom: 5,
    fontFamily: 'Roboto_700Bold',
  },
  subTitle: {
    fontFamily: 'Roboto_400Regular',
    paddingBottom: 5,
  },
  heading: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 15,
    paddingBottom: 5,
  },
  text: {
    fontFamily: 'Roboto_400Regular',
    paddingBottom: 5,
  },
  flatList: {
    flex: 1,
    marginBottom: 10,
  },
  bgImage: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Agenda