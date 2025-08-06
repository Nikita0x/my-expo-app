import '@expo/metro-runtime';
import './global.css';

import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

export default function App() {
  return (
    <>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
      <Text className="text-[90px] text-green-500">Hello how are you</Text>
      <Text className="bg-red-300 text-[50px] text-purple-500">Hel1111lo</Text>
      <Text>Helawgawgalo</Text>
      <Text>Hello</Text>
      <Text>Helwagawglo</Text>
      <Text>Hellogawg</Text>
      <Text>Helgawglo</Text>
      <Text>Hello</Text>
    </>
  );
}
