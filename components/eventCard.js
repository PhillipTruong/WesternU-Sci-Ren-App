import { StyleSheet, View, Text } from 'react-native';

const EventCard = ({ item: { eventName, description, time } }) => {

  return (
    <View style={styles.eventCardContainer}>
      <View style={styles.titleDescriptionContainer}>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.eventText}>{description}</Text>
      </View >
      <View style={styles.timeContainer}>
        <Text style={styles.eventText}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  eventName: {
    fontSize: 15,
    fontFamily: 'Roboto_700Bold',
  },
  eventText: {
    fontFamily: 'Roboto_400Regular',

  },
  titleDescriptionContainer: {
    flex: 5,
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EventCard