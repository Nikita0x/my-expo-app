import '@expo/metro-runtime';
import './global.css';
import './i18n/index';

import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { sendMessageToTelegram } from 'services/telegram.service';
import { useEffect } from 'react';
import { setupRevenueCat } from 'services/revenuecat.service';
import RevenueCatUI from 'react-native-purchases-ui';

export default function App() {
  useEffect(() => {
    setupRevenueCat();
  }, []);

  return (
    <>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
      <RevenueCatUI.Paywall
        onDismiss={() => {
          // Dismiss the paywall, i.e. remove the view, navigate to another screen, etc.
          // Will be called when the close button is pressed (if enabled) or when a purchase succeeds.
          console.log('closed paywall');
        }}
      />
      {/* <Text className="text-[90px] text-green-500">Hello how are you</Text> */}
    </>
  );
}
