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

import FaqCard from '../components/faqCard';
import { bgImage } from '../images/images';


const Faq = () => {
  const [faq, setFaq] = useState([])

  useEffect(async () => {
    await axios.get('https://uwo-sr-app-server.herokuapp.com/api/faq/getAllFaq')
      .then(res => {
        const faqData = res.data
        setFaq(faqData)
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.container}>
          <Text style={styles.title}>FAQ</Text>
          <FlatList
            style={styles.flatList}
            data={faq}
            renderItem={({ item }) => (
              <FaqCard item={item} />
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
  },
  flatList: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center'
  },
});

export default Faq