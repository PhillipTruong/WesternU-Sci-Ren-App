import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const axios = require('axios').default;

import FaqCard from '../components/faqCard';
import { bgImage } from '../images/images';

const Faq = () => {
  const [faq, setFaq] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFaq = async () => {
      setLoading(true)

      // get faq
      await axios.get('https://uwo-sr-app-server.herokuapp.com/api/faq/getAllFaq')
        .then(res => {
          setFaq(res.data);
        })
        .catch(error => {
          console.error(error);
          setFaq([]);
        });

      setLoading(false)
    }

    fetchFaq();
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          {loading && (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="hsv(0°, 0%, 75%)" />
            </View>
          )}
          {!loading && <FlatList
            style={styles.flatList}
            data={faq}
            renderItem={({ item }) => (
              <FaqCard item={item} />
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
  flatList: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center'
  },
});

export default Faq