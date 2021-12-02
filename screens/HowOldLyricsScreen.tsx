import * as React from 'react';
import { Fragment, useCallback, useMemo, useReducer } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { initialState, reducer, useCustomContext } from '../components/reducers/main';
import { Text, View } from '../components/Themed'

export default function BirthdayLyricsScreen({ navigation }) {
  const [state, dispatch] =  useReducer(reducer, initialState)
  const { globalState, globalDispatch } = useCustomContext()

  React.useEffect(() => {
    console.log(state)
  }, [state])

  const handleContinue = useCallback(() => {
    navigation.navigate('HowOldInput')
  }, [])

  const lyricLines = useMemo(() => {
    const number = parseFloat(globalState.age)
    let arr = []
    for (let i = 0; i < number; i++) {
      arr.push(i + 1)
    }
    return arr
  }, [globalState.age])
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>How Old Are You Now?</Text>
          <Text style={styles.notes}>Lyrics generated for age of {globalState.age}</Text>
        </View>
        
        <Text style={styles.mainText}>How Old Are You Now?</Text>
        <Text style={styles.mainText}>How Old Are You Now?</Text>
        <Text style={styles.mainText}>How Old Are You <Text style={styles.name}>{globalState.name}</Text></Text>
        <Text style={styles.mainText}>How Old Are You Now?</Text>
        {lyricLines.map((line) => <Text key={line} style={styles.mainText}>Are you <Text style={styles.name}>{line}</Text>?</Text>)}
      </View>
      <TouchableOpacity onPress={handleContinue} style={styles.button}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'space-between'
  },
  mainText: {
    fontSize: 24,
    marginBottom: 10
  },
  chacha: {
    color: 'aqua'
  },
  title: {
    fontSize: 36
  },
  titleWrapper: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center'
  },
  name: {
    color: 'aquamarine'
  },
  button: {
    width: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    marginBottom: 60
  },
  buttonText: {
    fontSize: 24
  }
})