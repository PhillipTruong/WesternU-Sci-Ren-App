import { StyleSheet, View, Text } from 'react-native';

const EventCard = ({ item: { eventName, description, time } }) => {

  return (
    <View style={styles.eventCardContainer}>
      <View>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text>{description}</Text>
      </View>
      <Text>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#E0E0E0',
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default EventCard