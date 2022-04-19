import { StyleSheet, View, Text } from 'react-native';

const EventCard = ({ item: { _id: id, title, description, time } }) => {
  let today = new Date()
  let past = today > new Date(time)
  let eventTime = ''
  if (time) {
    eventTime = (new Date(time)).toLocaleString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <View key={id} style={[styles.eventCardContainer, past ? styles.eventPast : styles.eventNotPast]}>
      <View style={styles.titleDescriptionContainer}>
        <Text style={styles.eventName}>{title}</Text>
        <Text style={styles.eventText}>{description}</Text>
      </View >
      <View style={styles.timeContainer}>
        <Text style={styles.eventText}>{eventTime}</Text>
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
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  eventPast: {
    backgroundColor: '#EEEEEE',
  },
  eventNotPast: {
    backgroundColor: '#FFFFFF',
  },
  eventName: {
    fontSize: 15,
    fontFamily: 'Roboto_700Bold',
  },
  eventText: {
    fontFamily: 'Roboto_400Regular',

  },
  titleDescriptionContainer: {
    flex: 4,
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EventCard