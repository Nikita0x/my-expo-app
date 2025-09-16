import '@expo/metro-runtime';
import './global.css';
import './i18n/index';

import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { sendMessageToTelegram } from 'services/telegram.service';
import { useEffect } from 'react';
import { setupRevenueCat } from 'services/revenuecat.service';

export default function App() {
  useEffect(() => {
    setupRevenueCat();
  }, []);

  return (
    <>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
      {/* <Text className="text-[90px] text-green-500">Hello how are you</Text> */}
    </>
  );
}
