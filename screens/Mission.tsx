import * as React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Mission() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{flex:1}} edges={['bottom', 'left', 'right']} forceInset={{ bottom: 'never', vertical: 'never'}}>
    <ScrollView style={styles.wrapper}>
      <View style={styles.section}>
        <Text style={styles.header}>Has this ever happened to you?</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.main}>You're at a birthday party, and there are a bunch of other guests there. And maybe some of those guests are friends of friends, invited by proxy or out of politeness. We'll call them tangential guests. That's all well and good, and everyone is having a great time.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.headerSm}>Then the cake comes out.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.main}>We've all been there.</Text>
        <Text style={styles.main}>The host of the party has slyly disappeared.</Text>
        <Text style={styles.main}>The lights dim.</Text>
        <Text style={styles.main}>The party quiets down.</Text>
        <Text style={styles.main}>The guests murmor.</Text>
        <Text style={styles.main}>There's a very specific, familiar glow coming from the kitchen</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.main}>Some asshole does that loud whistle thing with their two fingers and their tongue that I could never do.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.main}>The host emerges, holding a cake and encouraging everyone to sing "Happy Birthday". Everyone has been so taken aback by the spectacle that they mindlessly launch into the song, not giving a second thought as to whether or not they know the lyrics.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.italic}>"Happy birthday to you,</Text>
        <Text style={styles.italic}>Happy birthday to you,</Text>
        <Text style={styles.italic}>Happy birthday dear..."</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.headerSm}>oh, shit.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.main}>All those tangential guests drank too many Aperol Spritzes and don't remember the name of the birthday person that they met hours before at the beginning of the night.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.main}>There's a lull in the otherwise triumphant rendition of this age-old song. The tangentials mumble their way through this line, shifting their eyes and hoping no one notices.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.headerSm}>But we noticed.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.main}>And that's why we created Happy Birthday Lyric Generator.</Text>
        <Text style={styles.main}>Go ahead. Type a name into the generator on that home screen.</Text>
        <Text style={styles.italic}>Any name.</Text>
        <Text style={styles.main}>It works with all of them.</Text>
      </View>

      <Text style={styles.main}>Don't worry, you can thank us later.</Text>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 12
  },
  header: {
    fontSize: 42,
    fontWeight: '600'
  },
  headerSm: {
    fontSize: 32,
    fontWeight: '600'
  },
  main: {
    fontSize: 16
  },
  bold: {
    fontSize: 16,
    fontWeight: '800'
  },
  italic: {
    fontSize: 16,
    fontStyle: 'italic'
  },
  section: {
    marginBottom: 10
  }
})