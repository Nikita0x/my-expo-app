import { Text, View, Pressable, Button } from 'react-native';
import { useUserStore } from 'stores/user.store';
import { useTranslation } from 'react-i18next';
import en from '../i18n/locales/en.json';
import Purchases from 'react-native-purchases';

import { EditScreenInfo } from './EditScreenInfo';
import { sendMessageToTelegram } from 'services/telegram.service';
import { setupRevenueCat } from 'services/revenuecat.service';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const { name, customerInfo } = useUserStore();
  const { t, i18n } = useTranslation();

  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className="flex gap-5">
        <Button title="Switch to English" onPress={() => i18n.changeLanguage('en')} />
        <Button title="Switch to Ukrainian" onPress={() => i18n.changeLanguage('uk')} />
        <Button title="Switch to Russian" onPress={() => i18n.changeLanguage('ru')} />
        <Button
          title="Log customerInfo"
          onPress={async () => {
            try {
              // Get customer info
              const customerInfoLocal = await Purchases.getCustomerInfo();
              useUserStore.setState({
                customerInfo: customerInfoLocal,
              });

              console.log('Customer Info:', customerInfo);
              console.log('Original App User ID:', customerInfoLocal.originalAppUserId);
              console.log('Active Subscriptions:', customerInfoLocal.activeSubscriptions);
              console.log(
                'All Purchased Product IDs:',
                customerInfoLocal.allPurchasedProductIdentifiers
              );
            } catch (error) {
              console.error('Error getting customer info:', error);
            }
          }}
        />

        {/* <Button title={`increase: ${count}`} onPress={increase} /> */}
        <Text>Username from store: {name}</Text>
        <Text>Customer from RC: {JSON.stringify(customerInfo)}</Text>
        {/* <Button title={`decrease: ${count}`} onPress={decrease} /> */}
      </View>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      <Text
        className="text-[60px]"
        onPress={async () => {
          await sendMessageToTelegram('contactUs', {
            userMessage: 'test from RN',
            email: 'nikita@gmail.com',
          });
        }}>
        send message to tg contact us
      </Text>
      {children}
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center bg-white`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
