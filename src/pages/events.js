import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, FlatList } from 'react-native';

const Events = () => {
  const [events, setEvents] = useState([
    {eventName: 'Event Start!', time: '11 AM', key: 1},
    {eventName: 'Stage Shows', time: '12 PM', key: 2},
    {eventName: 'Chemistry With a Bang!', time: '1 PM', key: 3},
    {eventName: 'Yoga', time: '2 PM', key: 4} ,
    {eventName: 'Event End!', time: '3 PM', key: 5}
  ])

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({item}) => (
          <View style={styles.eventCard}>
            <Text>{item.eventName}</Text>
            <Text>{item.time}</Text>
          </View>
        )
      }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  eventCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#E0E0E0',
  }
});

export default Events