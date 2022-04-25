import * as Linking from 'expo-linking';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';

import { homePageDrMaddox } from '../images/images';
import { bgImage } from '../images/images';

const win = Dimensions.get('window')

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} >

      <View style={styles.view}>
        <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>


          {/* <Text style={styles.title}>Welcome to Science Rendezvous @Western 2022!</Text>
          <Text style={styles.p}>
            Science Rendezvous is an all-ages, fun-filled, and free-of-cost event where you and your family can engage in S.T.E.A.M. activities led by Western University's budding scientists.
            Experience the joy of discovery with hands-on activities, and complete the Science Chase for prizes!
          </Text> */}

          <View style={styles.imageView}>
            <Image source={homePageDrMaddox} style={styles.drMaddoxImg} />
          </View>



          {/* what is happening now: */}
          {/* <View style={styles.section}>
          <Text style={styles.heading}>What's Happening Now:</Text>
          {eventData.slice(0, 3).map((item => (
            <EventCard item={item} key={item.key} />
          )))}

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Events')}
            >
              <Text style={styles.buttonText}>View More Events</Text>
            </TouchableOpacity>
          </View>
        </View> */}

          <View style={styles.section}>
            <Text style={styles.heading}>Social Media:</Text>
            <View style={styles.socialMediaContainer}>
              <TouchableOpacity style={styles.socialMediaLinks}
                onPress={() => { Linking.openURL('https://www.facebook.com/westernuSciRen/') }}
              >
                <Ionicons name='logo-facebook' size={32}></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialMediaLinks}
                onPress={() => { Linking.openURL('https://twitter.com/WesternuSciRen') }}
              >
                <Ionicons name='logo-twitter' size={32}></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialMediaLinks}
                onPress={() => { Linking.openURL('https://sciencerendezvous.uwo.ca/') }}
              >
                <Ionicons name='link-outline' size={32}></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialMediaLinks}
                onPress={() => { Linking.openURL('https://srwesternu.expofp.com/') }}
              >
                <Ionicons name='map-outline' size={32}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>

        </ImageBackground>
      </View>
    </SafeAreaView >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    backgroundColor: '#EFFFFD',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 20,
    fontFamily: 'Roboto_700Bold'
  },
  p: {
    fontFamily: 'Roboto_400Regular',
    marginBottom: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Roboto_700Bold',
    marginBottom: 5,
  },
  titleContainer: {
  },
  section: {
    marginBottom: 10,
    paddingHorizontal: 10,
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
  },
  buttonText: {
    fontFamily: 'Roboto_700Bold',
  },
  socialMediaContainer: {
    flexDirection: 'row',
  },
  socialMediaLinks: {
    marginHorizontal: 10,
  },
  imageView: {
    flex: 10,
    padding: 5,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drMaddoxImg: {
    width: '100%',
    height: '100%',
    aspectRatio: 11 / 17
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center'
  }
});
export default Home