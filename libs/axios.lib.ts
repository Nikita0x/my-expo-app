import axios, { AxiosError } from 'axios';
import { sendErrorToTelegram } from 'services/telegram.service';

const axiosBase = axios.create({
  // TODO: cahnge env variable to a working one
  baseURL: import.meta.env.VITE_APP_API_URL,
  //   transformResponse(data) {
  //     // Parse the data to a JavaScript object if it is a JSON string
  //     let parsedData;
  //     try {
  //       parsedData = JSON.parse(data);
  //     } catch (error) {
  //       // If parsing fails, it means data is not a JSON string, so keep it as is
  //       parsedData = data;
  //     }

  //     // Apply your custom transformation
  //     // TODO: удалить функцию ниже т.к она нам тут уже не нужна?
  //     const flatData = flatStrapiResponse(parsedData);

  //     return flatData;
  //   },
});

axiosBase.interceptors.response.use(
  (response) => response, // Pass through the successful response
  async (error: AxiosError) => {
    // Handle the error here and send it to Telegram
    if (error.response) {
      const telegramErrorMsg = `${error.message}. \n URL: ${
        error.request.responseURL
      } ${error?.config?.data ? '\n Data: ' + error.config.data : ''}`;

      await sendErrorToTelegram(telegramErrorMsg); // Send the error to Telegram

      console.error('Error occurred:', error.response);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    // Always reject the promise so calling code can handle the error as well
    return Promise.reject(error);
  }
);

export default axiosBase;
