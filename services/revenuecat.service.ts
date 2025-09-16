import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { useUserStore } from 'stores/user.store';

export async function setupRevenueCat() {
  try {
    let REVENUE_API_KEY;
    if (Platform.OS === 'android') {
      REVENUE_API_KEY = process.env.EXPO_PUBLIC_API_KEY_ANDROID!;
    } else if (Platform.OS === 'ios') {
      REVENUE_API_KEY = process.env.EXPO_PUBLIC_API_KEY_IOS!;
    } else {
      REVENUE_API_KEY = process.env.EXPO_PUBLIC_RC_WEBBILLING_SANDBOX_KEY!;
    }

    if (Platform.OS !== 'web') {
      await Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
      await Purchases.setOnesignalID(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID!);
    }

    Purchases.configure({
      apiKey: REVENUE_API_KEY,
    });

    // await updateOffering();

    Purchases.addCustomerInfoUpdateListener(async (newValue) => {
      useUserStore.setState({
        customerInfo: newValue,
      });
    });

    // const updateCustomerInfo = async () => {
    //   const newValue = await Purchases.getCustomerInfo();

    //   user.value = await getOrCreateRevenuecatUser(newValue.customerInfo.originalAppUserId);

    //   customerInfo.value = newValue.customerInfo;
    // };

    // isPurchaseUserDataProcessing.value = true;
    // await updateCustomerInfo();
    // isPurchaseUserDataProcessing.value = false;

    setInterval(async () => {
      //   isPurchaseUserDataProcessing.value = true;
      //   await updateCustomerInfo();
      //   isPurchaseUserDataProcessing.value = false;
    }, 310000); // 5 min
  } catch (error) {
    console.error(error);
    // isPurchaseUserDataProcessing.value = false;
  }
}
