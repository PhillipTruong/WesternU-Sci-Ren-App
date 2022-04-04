import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';

import { eventData } from '../utility/eventData';

import EventCard from '../components/eventCard';

const Events = () => {
  const [events, setEvents] = useState(eventData) // TODO: delete this if we never setEvents

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Events
        </Text>
      </View>
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
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#EFFFFD',
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    marginBottom: 10,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Events