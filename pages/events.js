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
import Toast from 'react-native-root-toast';

import EventCard from '../components/eventCard';
import { bgImage } from '../images/images';

const Events = ({ handleAgendaChange }) => {
  const [stageShows, setStageShows] = useState([])
  const [booths, setBooths] = useState([])
  const [loading, setLoading] = useState(false)

  let containsObject = (obj, list) => {
    return list.some(elem => elem._id === obj._id)
  }

  const setEmptyAgendaLists = async () => {
    try {
      const stageShowAgendaList = await AsyncStorage.getItem('stageShowAgendaList')
      const boothAgendaList = await AsyncStorage.getItem('boothAgendaList')
      if (stageShowAgendaList === null) {
        let emptyStageShowAgendaList = []
        await AsyncStorage.setItem('stageShowAgendaList', JSON.stringify(emptyStageShowAgendaList))
      }
      if (boothAgendaList === null) {
        let emptyBoothAgendaList = []
        await AsyncStorage.setItem('boothAgendaList', JSON.stringify(emptyBoothAgendaList))
      }
    } catch (e) {
      console.error("Error setting agenda lists.")
    }
  }

  const addStageShowToAgenda = async (item, stageShow) => {
    try {
      const stringValue = await AsyncStorage.getItem(stageShow ? 'stageShowAgendaList' : 'boothAgendaList')
      let agendaList = JSON.parse(stringValue)
      if (containsObject(item, agendaList)) {
        Toast.show('Event already in Agenda');
        return
      }
      else {
        agendaList.push(item)
        let stringUpdatedValue = JSON.stringify(agendaList)
        Toast.show('Event added to Agenda');
        await AsyncStorage.setItem(stageShow ? 'stageShowAgendaList' : 'boothAgendaList', stringUpdatedValue)
        handleAgendaChange()
      }
    } catch (error) {
      console.error("Error setting agenda lists:", error)
    }
  }

  useEffect(() => {
    setEmptyAgendaLists()
  }, [])

  useEffect(async () => {
    setLoading(true)
    await axios.get('https://uwo-sr-app-server.herokuapp.com/api/data/getAllEvents')
      .then(res => {
        const eventData = res.data
        let stageShowEvents = eventData.filter(item => item.isStageShow);
        let boothEvents = eventData.filter(item => !item.isStageShow);
        setStageShows(stageShowEvents)
        setBooths(boothEvents)
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
            Schedule
          </Text>
          <Text style={styles.subTitle}>
            Press the plus icon to add it to your agenda!
          </Text>
          <Text style={styles.heading}>Stage Shows</Text>
          {!loading && <FlatList
            style={styles.flatList}
            data={stageShows}
            renderItem={({ item }) => (
              <EventCard item={item} addStageShowToAgenda={addStageShowToAgenda} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />}
          <Text style={styles.heading}>Booths</Text>
          {!loading && <FlatList
            style={styles.flatList}
            data={booths}
            renderItem={({ item }) => (
              <EventCard item={item} addStageShowToAgenda={addStageShowToAgenda} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />}
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

export default Events