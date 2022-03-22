import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { eventData } from '../helpers/eventData';

import EventCard from '../components/eventCard';

const Events = () => {
  const [events, setEvents] = useState(eventData) // TODO: delete this if we never setEvents

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard item={item} />
        )}
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
});

export default Events