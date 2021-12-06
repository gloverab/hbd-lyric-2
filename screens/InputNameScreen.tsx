import * as React from 'react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, StyleSheet, TextInput, TouchableOpacity, Keyboard, View as NativeView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
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
    }, 8000)
  }, [text])


  

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.topSection}>
          <Image style={styles.image} source={require('../assets/images/birthday-cake.png')} />
        </View>
      </TouchableWithoutFeedback>
      <View style={{ alignSelf: 'stretch', marginBottom: 20 }}>
        <ModifierButtons />
      </View>

      <KeyboardAvoidingView style={{ alignSelf: 'stretch', flex: 1, justifyContent: 'space-between' }} behavior='padding' keyboardVerticalOffset={100}>
        <View>
          <Text>Enter a Name:</Text>
          <TextInput
            onChangeText={setText}
            style={styles.input}
            placeholder={`Ex. "${name}"`}
            value={text}
          />
        </View>

        <Button
          disabled={text === ''}
          keyboardShowing={keyboardShowing}
          onClick={handleSubmit}
        />
        
      </KeyboardAvoidingView>

      {showCalculations && <Calculations />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    paddingHorizontal: 20
  },
  topSection: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 20
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
  },
  scrollable: {
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%'
  },
  input: {
    fontSize: 24,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    color: 'white'
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  spacerV: {
    height: 20
  }
});
