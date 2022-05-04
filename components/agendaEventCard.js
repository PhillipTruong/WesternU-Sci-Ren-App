import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const AgendaEventCard = ({ item }) => {
  let { _id: id, title, description, time, isStageShow } = item
  let today = new Date()
  let past = today > new Date(time)
  let eventTime = ''

  if (time) {
    eventTime = (new Date(time)).toLocaleString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <View style={styles.outterContainer}>
      <View style={[styles.timeContainer]}>
        <Text style={styles.eventText}>{isStageShow === false ? "All Day" : eventTime}</Text>
      </View>
      <View key={id} style={[styles.eventCardContainer, past ? styles.eventPast : styles.eventNotPast]}>
        <View style={styles.titleDescriptionContainer}>
          <Text style={styles.eventName}>{title}</Text>
          <Text style={styles.eventText}>{description}</Text>
        </View >
        {/* {isStageShow && (
          <View style={[styles.timeContainer]}>
            <Text style={styles.eventText}>{eventTime}</Text>
          </View>
        )} */}

        {/* <TouchableHighlight style={styles.plusButtonView} onPress={() => addStageShowToAgenda(item, true)}>
          <View style={styles.plusButtonView}>
            <Ionicons name={"add-circle-outline"} size={30} color={'#00BDC5'} />
          </View>
        </TouchableHighlight> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCardContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  eventPast: {
    backgroundColor: '#D3D3D3',
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
    flex: 5,
  },
  timeContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outterContainer: {
    flexDirection: 'row',
  }
});

export default AgendaEventCard