import axios from 'axios';
import { HttpException } from '../exceptions/HttpException';
import { IMTNRequestBody } from '../exceptions/mtn';
import Keys from '../keys';
import { Endpoints } from './constants';

export default class Http {
  static mtnAxios = axios.create({ baseURL: Keys.MTN_MOMO_API });

  static oltranzAxios = axios.create({ baseURL: Keys.OLTRANZ_API });

  static requestToken = async () => {
    Http.mtnAxios.defaults.headers.common.Authorization = `Basic ${Keys.MTN_AUTHORIZATION_KEY}`;
    Http.mtnAxios.defaults.headers.common[
      'Ocp-Apim-Subscription-Key'
    ] = Keys.MTN_SUBSCRIPTION_KEY;
    return Http.mtnAxios.post(Endpoints.REQUEST_TOKEN);
  };

  static requestPayment = async (
    referenceId: string,
    payload: IMTNRequestBody,
  ) => {
    const { data, status } = await Http.requestToken();
    if (!data) {
      throw new HttpException(status, 'Something went wrong');
    }
    Http.mtnAxios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    Http.mtnAxios.defaults.headers.common['X-Reference-Id'] =
      referenceId;
    Http.mtnAxios.defaults.headers.common['X-Target-Environment'] =
      'mtnrwanda';
    return Http.mtnAxios.post(Endpoints.REQUEST_PAYMENT, payload);
  };

  static transactionStatus = async (referenceId: string) => {
    const { data, status } = await Http.requestToken();
    if (!data) {
      throw new HttpException(status, 'Something went wrong');
    }
    Http.mtnAxios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    Http.mtnAxios.defaults.headers.common['X-Target-Environment'] =
      'mtnrwanda';
    return Http.mtnAxios.get(
      `${Endpoints.REQUEST_PAYMENT}/${referenceId}`,
    );
  };
}
