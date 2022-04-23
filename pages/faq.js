import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { faqData } from '../utility/faqData';
import FaqCard from '../components/faqCard';


const Faq = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>FAQ</Text>
      </View>

      {/* <View style={styles.section}>
        <Text style={styles.heading}>Frequently Asked Questions:</Text>
        {faqData.map((item) => (
          <FaqCard item={item} key={item.key} />
        ))}
      </View> */}
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
});

export default Faq