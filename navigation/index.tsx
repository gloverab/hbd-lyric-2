/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import CustomContext, { initialState, reducer } from '../components/reducers/main';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import BirthdayLyricsScreen from '../screens/BirthdayLyricsScreen';
import InputAgeScreen from '../screens/InputAgeScreen';
import HowOldLyricsScreen from '../screens/HowOldLyricsScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import InputNameScreen from '../screens/InputNameScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Mission from '../screens/Mission';
import Preferences from '../screens/Preferences';

const Drawer = createDrawerNavigator();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [globalState, globalDispatch ] = React.useReducer(reducer, initialState);

  const providerState = {
    globalState,
    globalDispatch
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CustomContext.Provider value={providerState}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Create" component={RootNavigator} />
          <Drawer.Screen name="Preferences" component={Preferences} />
          <Drawer.Screen name="Mission" component={Mission} />
        </Drawer.Navigator>
      </CustomContext.Provider>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={StackNav} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InputName" options={{ headerShown: false }} component={InputNameScreen}  />
      <Stack.Screen name="BirthdayLyrics" component={BirthdayLyricsScreen} options={{ title: 'Happy Birthday Lyrics' }} />
      <Stack.Screen name="HowOldInput" component={InputAgeScreen} options={{ title: 'Enter Age' }} />
      <Stack.Screen name="HowOldLyrics" component={HowOldLyricsScreen} options={{ title: 'How Old Are You Now Lyrics' }} />
    </Stack.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}