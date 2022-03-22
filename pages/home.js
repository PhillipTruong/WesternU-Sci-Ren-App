import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import { faqData } from '../helpers/faqData';
import { eventData } from '../helpers/eventData';
import Faq from '../components/faq';
import EventCard from '../components/eventCard';


const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} >

      <ScrollView style={styles.scrollViewContainer}>

        <Text style={styles.title}>Welcome to Science Rendezvous @Western 2022!</Text>
        <Text style={styles.p}>
          Science Rendezvous is an all-ages, fun-filled, and free-of-cost event where you and your family can engage in S.T.E.A.M. activities led by Western University's budding scientists.
          Experience the joy of discovery with hands-on activities, and complete the Science Chase for prizes!
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>What's Happening Now:</Text>
          {eventData.slice(0, 3).map((item => (
            <EventCard item={item} key={item.key} />
          )))}

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Events')}
            >
              <Text>More Events</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.section}>
          <Text style={styles.heading}>Frequently Asked Questions:</Text>
          {faqData.map((item) => (
            <Faq item={item} key={item.key} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#EFFFFD',
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  p: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleContainer: {
  },
  section: {
    marginBottom: 10,
  },
  buttonView: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: '50%',
  }

});
export default Home