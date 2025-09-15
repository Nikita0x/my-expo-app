import axios from 'axios';
import { delay } from 'utils/common.utils';
import { splitStringIntoChunks } from 'utils/strings.utils';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const chatID = process.env.EXPO_PUBLIC_CHAT_ID;
const errorsChatID = process.env.EXPO_PUBLIC_ERRORS_CHAT_ID;

const telegramAxios = axios.create({
  baseURL: 'https://api.telegram.org/',
});

interface UserMessage {
  userMessage: string;
}
interface ContactUsMessage extends UserMessage {
  email: string;
}

export type MessageType = {
  contactUs: ContactUsMessage;
};

/**
 * Отправить сообщение в Telegram
 * @param {T} type Тип сообщения
 * @param { MessageType[T]} config Конфиг
 */
export async function sendMessageToTelegram<T extends keyof MessageType>(
  type: T,
  config: MessageType[T]
): Promise<void> {
  let formattedMessage = '';

  switch (type) {
    case 'contactUs': {
      const { email, userMessage } = config as MessageType['contactUs'];
      formattedMessage = formattedMessage = `
*Contact Us Request*
        test from react native
_App User ID_:


`;

      const encodedMessage = encodeURIComponent(formattedMessage);
      const URI = `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatID}&text=${encodedMessage}&parse_mode=Markdown`;
      await fetch(URI);

      break;
    }
  }
}

/**
 * Отправить ошибку в Telegram
 * @param {any} errorMessage Сообщение с ошибкой
 */

export async function sendErrorToTelegram(errorMessage: string) {
  const infoMessage = `
* Premium: ${false}

${errorMessage}
`;

  let replyMessageId = null;

  try {
    const infoResponse = await telegramAxios.post(`bot${apiKey}/sendMessage`, {
      chat_id: errorsChatID,
      text: infoMessage,
    });
    replyMessageId = infoResponse.data.result.message_id;
  } catch (error) {
    await delay(2000);

    sendErrorToTelegram(errorMessage);
    return;
  }

  const errorMessageChunks = splitStringIntoChunks(errorMessage);

  for await (const chunk of errorMessageChunks) {
    try {
      const errorResponse: { data: any } = await telegramAxios.post(`bot${apiKey}/sendMessage`, {
        chat_id: errorsChatID,
        text: chunk,
        reply_to_message_id: replyMessageId,
      });
      replyMessageId = errorResponse.data.result.message_id;
    } catch (error) {
      await delay(2000);

      const errorResponse: { data: any } = await telegramAxios.post(`bot${apiKey}/sendMessage`, {
        chat_id: errorsChatID,
        text: chunk,
        reply_to_message_id: replyMessageId,
      });
      replyMessageId = errorResponse.data.result.message_id;
    }
  }
}
