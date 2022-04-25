import { StyleSheet, View, Text } from 'react-native';

const FaqCard = ({ item: { question, answer } }) => {

  return (
    <View style={styles.faqContainer}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  faqContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
  question: {
    fontSize: 15,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: 'row',
  },
  answer: {
    flex: 1,
  },
  answerText: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
  }
});

export default FaqCard