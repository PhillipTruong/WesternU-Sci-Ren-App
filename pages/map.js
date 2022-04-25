import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { WebView } from 'react-native-webview';

const Map = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        <WebView
          source={{
            uri: 'https://srwesternu.expofp.com'
          }}
        />
        {/* <Text style={styles.title}>Map Screen</Text>
        <Text style={styles.text}>Coming soon!</Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#EFFFFD',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    marginBottom: 10,
    fontFamily: 'Roboto_700Bold',
  },
  text: {
    fontFamily: 'Roboto_400Regular',
  },
});

export default Map