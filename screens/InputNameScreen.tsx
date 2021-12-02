import * as React from 'react';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, StyleSheet, TextInput, TouchableOpacity, Keyboard, View as NativeView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Calculations from '../components/Calculations';
import ModifierButtons from '../components/ModifierButtons';
import { useCustomContext } from '../components/reducers/main';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const placeholderNames = [
  'John',
  'Paul',
  'George',
  'Ringo',
  'Romulus',
  'Logan',
  'Kendall',
  'David Bowie',
  'Trey',
  'Page',
  'Mike',
  'Fishman',
  'Katy Perry',
  'Reba',
  'Suzy',
  'Carini',
  'Santos'
]

export default function InputNameScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [showCalculations, setShowCalculations] = useState(false)
  const [name, setName] = useState(placeholderNames[Math.floor(Math.random() * placeholderNames.length)])
  const [keyboardShowing, setKeyboardShowing] = useState(false);
  const [text, setText] = useState('')

  const { globalState, globalDispatch } = useCustomContext()

  useEffect(() => {
    const interval = setInterval(() => {
      const newName = placeholderNames[Math.floor(Math.random() * placeholderNames.length)] 
      setName(newName)
    }, 2000);

    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setKeyboardShowing(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardShowing(false);
    });

    return () => {
      clearInterval(interval)
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  const handleSubmit = useCallback(() => {
    setShowCalculations(true)
    globalDispatch({ type: 'name', value: text })
    Keyboard.dismiss()
    setTimeout(() => {
      setShowCalculations(false)
      navigation.navigate('BirthdayLyrics')
    }, 5000)
  }, [text])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoid}  behavior="padding">

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Happy Birthday Lyric Generator 2.0</Text>
            <View style={styles.spacerV} />
            <Image
              style={styles.image}
              source={require('../assets/images/birthday-cake.png')}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.touchable}>
          <View style={styles.inputWrapper}>
            <Text>Enter a Name:</Text>
            <TextInput
              onChangeText={setText}
              style={styles.input}
              placeholder={`Ex. "${name}"`}
              value={text}
            />
          </View>
          <View style={styles.spacerV} />
          <ModifierButtons />
        </View>
       
        <TouchableOpacity disabled={text == ''} onPress={handleSubmit} style={keyboardShowing ? styles.fullWidthSubmit : styles.submit}>
          <Text style={styles.submitText}>Generate Lyrics</Text>
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
      
      {showCalculations && <Calculations />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  keyboardAvoid: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  topSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20
  },
  touchable: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  scrollable: {
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 250
  },
  input: {
    fontSize: 24,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    color: 'white'
  },
  inputWrapper: {
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  submit: {
    width: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginBottom: 60
  },
  fullWidthSubmit: {
    width: '120%',
    backgroundColor: 'green',
    alignItems: 'center',
    padding: 10
  },
  submitText: {
    fontSize: 24
  },
  spacerV: {
    height: 20
  }
});
