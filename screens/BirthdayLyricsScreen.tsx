import * as React from 'react';
import { Fragment, useCallback, useReducer } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'
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
  
  return (
    <View style={styles.container}>
      <View>
        {!globalState.spanish ?
          <Fragment>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Happy Birthday</Text>
              <Text style={styles.notes}>Lyrics generated for {globalState.name}</Text>
            </View>
            <Text style={styles.mainText}>Happy birthday to you{globalState.chacha && <Text style={styles.chacha}> (cha cha cha!)</Text>}</Text>
            <Text style={styles.mainText}>Happy birthday to you{globalState.chacha && <Text style={styles.chacha}> (cha cha cha!)</Text>}</Text>
            {globalState.monkey ?
              <Fragment>
                <Text style={styles.mainText}>You smell like a Monkey</Text>
                <Text style={styles.mainText}>And you look like one too!</Text>
              </Fragment>
              :
              <Fragment>
                <Text style={styles.mainText}>Happy birthday dear <Text style={styles.name}>{globalState.name}</Text></Text>
                <Text style={styles.mainText}>Happy birthday to you{globalState.chacha && <Text style={styles.chacha}> (cha cha cha!)</Text>}</Text>
              </Fragment>
            }
            {globalState.manyMore &&
              <Text style={styles.mainText}>...and many more!</Text>
            }
          </Fragment>
          :
          <Fragment>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Feliz Cumpleaños</Text>
              <Text style={styles.notes}>Lyrics generated for {globalState.name} in spanish</Text>
            </View>
            <Text style={styles.mainText}>Feliz cumpleaños a ti{globalState.chacha && <Text style={styles.chacha}> (cha cha cha!)</Text>}</Text>
            <Text style={styles.mainText}>Feliz cumpleaños a ti{globalState.chacha && <Text style={styles.chacha}> (cha cha cha!)</Text>}</Text>
            {globalState.monkey ?
              <Fragment>
                <Text style={styles.mainText}>Hueles a mono</Text>
                <Text style={styles.mainText}>Y te ves como uno también!</Text>
              </Fragment>
              :
              <Fragment>
                <Text style={styles.mainText}>Feliz cumpleaños querido <Text style={styles.name}>{globalState.name}</Text></Text>
                <Text style={styles.mainText}>Feliz cumpleaños a ti{globalState.chacha && <Text style={styles.chacha}> (cha cha cha!)</Text>}</Text>
              </Fragment>
            }
            {globalState.manyMore &&
              <Text style={styles.mainText}>...Y muchas mas!</Text>
            }
          </Fragment>
        }
      </View>
      <TouchableOpacity onPress={handleContinue} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 60
  },
  buttonText: {
    fontSize: 24
  }
})