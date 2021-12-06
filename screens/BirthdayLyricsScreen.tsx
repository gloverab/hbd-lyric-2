import * as React from 'react';
import { Fragment, useCallback, useReducer } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { initialState, reducer, useCustomContext } from '../components/reducers/main';
import { Text, View } from '../components/Themed'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function BirthdayLyricsScreen({ navigation }) {
  const [state, dispatch] =  useReducer(reducer, initialState)

  const { globalState, globalDispatch } = useCustomContext()


  const getHtml = useCallback((lyrics) => {
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
          <div>
            <h1 style="font-size: 50px; margin-bottom: 0; font-family: Helvetica Neue; font-weight: normal;">
              Happy Birthday
            </h1>
            <span style="font-size: 14px; font-family: Helvetica Neue;">
              Lyrics generated for ${lyrics.name}
            </span>
          </div>
          <p>${lyrics.line1}</p>
          <p>${lyrics.line2}</p>
          <p>${lyrics.line3}</p>
          <p>${lyrics.line4}</p>
          <img
            src=${require('../assets/images/birthday-cake.png')}
            style="width: 90vw;" />
        </body>
      </html>
    `
  }, [])

  React.useEffect(() => {
    console.log(state)
  }, [state])

  const mainLine = React.useMemo(() => {
    return `Happy birthday to you${globalState.chacha ? ' (cha cha cha!)' : ''}`
  }, [globalState.chachacha])

  const line3 = React.useMemo(() => {
    if (globalState.monkey) {
      return 'You smell like a Monkey'
    } else {
      return `Happy birthday dear ${globalState.name}`
    }
  }, [globalState.monkey, globalState.name])

  const handleContinue = useCallback(() => {
    navigation.navigate('HowOldInput')
  }, [])

  const printToFile = useCallback(async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const obj = {
      name: globalState.name,
      line1: mainLine,
      line2: mainLine,
      line3: line3,
      line4: globalState.monkey ? 'And you look like one too!' : mainLine
    }
    const { uri } = await Print.printToFileAsync({
      html: getHtml(obj)
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }, [globalState, mainLine])

  
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
      <TouchableOpacity onPress={printToFile} style={styles.button}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>        
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