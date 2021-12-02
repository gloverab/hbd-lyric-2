import * as React from 'react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, StyleSheet, TextInput, TouchableOpacity, Keyboard, View as NativeView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModifierButtons from '../components/ModifierButtons';
import { useCustomContext } from '../components/reducers/main';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const ages = [
  '24',
  '7',
  '19',
  '1',
  '49',
  '35',
  '29',
  '13',
  '11',
  '4',
  '100',
  '93',
  '80'
]

export default function InputAgeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [age, setAge] = useState(ages[Math.floor(Math.random() * ages.length)])
  const [keyboardShowing, setKeyboardShowing] = useState(false);
  const [text, setText] = useState('')

  const { globalState, globalDispatch } = useCustomContext()

  useEffect(() => {
    const interval = setInterval(() => {
      const newAge = ages[Math.floor(Math.random() * ages.length)] 
      setAge(newAge)
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
    globalDispatch({ type: 'age', value: text })
    navigation.navigate('HowOldLyrics')
  }, [text])

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.keyboardAvoid}  behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.topSection}>
          <Text style={styles.title}>"How Old Are You Now?" Lyric Generator</Text>
          <View style={styles.spacerV} />
          <Image
            style={styles.image}
            source={require('../assets/images/age-screen.png')}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.touchable}>
        <View style={styles.inputWrapper}>
          <Text>Enter the person's age:</Text>
          <TextInput
            onChangeText={setText}
            style={styles.input}
            placeholder={`Ex. "${age}"`}
            value={text}
            keyboardType='numeric'
          />
        </View>
      </View>
      
      <TouchableOpacity disabled={text == ''} onPress={handleSubmit} style={keyboardShowing ? styles.fullWidthSubmit : styles.submit}>
        <Text style={styles.submitText}>Generate Lyrics</Text>
      </TouchableOpacity>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 40
  },
  keyboardAvoid: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 40
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
    height: 150
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
