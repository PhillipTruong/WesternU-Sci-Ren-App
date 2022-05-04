import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AgendaEventCard from '../components/agendaEventCard';
import { bgImage } from '../images/images';

const Agenda = ({ agendaChange }) => {
  const [agendaStageShows, setStageShows] = useState([])
  const [agendaBooths, setBooths] = useState([])

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

  const getAgendaLists = async () => {
    try {
      const stringStageShowAgendaList = await AsyncStorage.getItem('stageShowAgendaList')
      const stringBoothAgendaList = await AsyncStorage.getItem('boothAgendaList')
      let stageShowAgendaList = JSON.parse(stringStageShowAgendaList)
      let boothAgendaList = JSON.parse(stringBoothAgendaList)
      setStageShows(stageShowAgendaList)
      setBooths(boothAgendaList)

    } catch (e) {
      console.error("error setting the agenda items:", e)
    }
  }

  const removeFromAgendaLists = async (id, stageShow) => {
    try {
      const stringValue = await AsyncStorage.getItem(stageShow === false ? 'boothAgendaList' : 'stageShowAgendaList')
      let agendaList = JSON.parse(stringValue)
      let newAgendaList = agendaList.filter((item) => item._id !== id)
      let stringUpdatedValue = JSON.stringify(newAgendaList)
      await AsyncStorage.setItem(stageShow === false ? 'boothAgendaList' : 'stageShowAgendaList', stringUpdatedValue)
      getAgendaLists()
    } catch (error) {
      console.error("Error removing from agenda lists:", error)
    }
  }

  useEffect(() => {
    setEmptyAgendaLists()
    getAgendaLists()
  }, [agendaChange])

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Agenda
          </Text>
          <Text style={styles.heading}>Stage Shows</Text>
          {agendaStageShows.length === 0 && (
            <Text>You have no stage shows planned in your Agenda. Add stage shows to this Agenda from the Schedule tab.</Text>
          )}
          <FlatList
            style={styles.flatList}
            data={agendaStageShows}
            renderItem={({ item }) => (
              <AgendaEventCard item={item} removeFromAgendaLists={removeFromAgendaLists} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
          <Text style={styles.heading}>Booths</Text>
          {agendaBooths.length === 0 && (
            <Text>You have no booths planned in your Agenda. Add booths to this Agenda from the Schedule tab.</Text>
          )}
          <FlatList
            style={styles.flatList}
            data={agendaBooths}
            renderItem={({ item }) => (
              <AgendaEventCard item={item} removeFromAgendaLists={removeFromAgendaLists} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
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