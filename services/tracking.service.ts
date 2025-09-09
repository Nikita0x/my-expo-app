import PostHog from 'posthog-react-native';

/**
 * При добавлении новых ивентов не забудьте добавить их сюда:
 * @see TODO
 */

type ClickTypes = 'click_button';

export type Events = `click_${ClickTypes}`;

// TODO: Закончить настройку PostHog для RN
export const posthogInstance = new PostHog('phc_PXBQ9zAK3gXsjhz8XzDi1Q91F8YfrilxBnTcumzW2dQ', {
  // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
  host: 'https://eu.i.posthog.com',
});

export const trackEvent = async (
  event_name: Events | (string & {}),
  event_properties: Record<string, unknown> = {}
) => {
  if (import.meta.env.VITE_MODE === 'dev')
    return console.log('DEV MODE! Event:', event_name, event_properties);

  const resultProps = {
    ...event_properties,
  };

  posthogInstance?.capture(event_name, resultProps);

  // FirebaseAnalytics.logEvent({
  //   name: event_name,
  //   params: resultProps,
  // });
};

// export async function setupTrackingTransparency() {
//   try {
//     if (!isAndroid) {
//       const response = await AppTrackingTransparency.requestPermission();
//       trackEvent('click_ios_tracking_access', {
//         value: response.status,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
