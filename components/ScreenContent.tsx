import { Text, View, Pressable, Button } from 'react-native';
import { useCounter } from 'stores/counter.store';
import { useTranslation } from 'react-i18next';
import en from '../i18n/locales/en.json';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const { count, increase, decrease } = useCounter();
  const { t, i18n } = useTranslation();

  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className="flex gap-5">
        <Button title="Switch to English" onPress={() => i18n.changeLanguage('en')} />
        <Button title="Switch to Ukrainian" onPress={() => i18n.changeLanguage('uk')} />
        <Button title="Switch to Russian" onPress={() => i18n.changeLanguage('ru')} />

        <Button title={`increase: ${count}`} onPress={increase} />
        <Text>
          {t('blalala')}: {count}
        </Text>
        <Button title={`decrease: ${count}`} onPress={decrease} />
      </View>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
