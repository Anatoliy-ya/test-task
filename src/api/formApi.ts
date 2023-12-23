import { IDataForApi } from '../types/formTypes';

export function FormApi(data: IDataForApi) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = true;
      if (isSuccess) {
        resolve({ status: 200, message: 'Данные успешно отправлены', data });
      } else {
        reject({ status: 500, message: 'Ошибка сервера' });
      }
    }, 2000); // Задержка в 2 секунды
  });
}
export async function submitFormData(formData: IDataForApi) {
  try {
    const response = await FormApi(formData);
    console.log('@', 'Ответ сервера:', response);
  } catch (error) {
    console.error('@', 'Ошибка при отправке данных:', error);
  }
}
