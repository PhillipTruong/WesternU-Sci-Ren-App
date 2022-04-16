import { StyleSheet, View, Text } from 'react-native';

const Faq = ({ item: { question, answer } }) => {

  return (
    <View style={styles.faqContainer}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.answerContainer}>
        <Text>{'\u2022'}</Text>
        <Text style={styles.answerText}>{answer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  faqContainer: {
    flex: 1,
  },
  question: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'Roboto_400Regular',
  },
  answerContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  answer: {
    flex: 1,
    paddingLeft: 5,
  },
  answerText: {
    flex: 1,
    paddingLeft: 5,
    fontFamily: 'Roboto_400Regular',
  }
});

export default Faq