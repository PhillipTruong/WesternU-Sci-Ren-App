import { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';

import { eventData } from '../helpers/eventData';

import EventCard from '../components/eventCard';

const Events = () => {
  const [events, setEvents] = useState(eventData) // TODO: delete this if we never setEvents

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        style={styles.flatList}
        data={events}
        renderItem={({ item }) => (
          <EventCard item={item} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    backgroundColor: '#EFFFFD'
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Events