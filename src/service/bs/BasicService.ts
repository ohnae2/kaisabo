/* eslint-disable no-debugger */
import { jsonApi } from '../../utils/jsonApi';

class UserService {
  async getCodeList() {
    const res = await jsonApi('/bo/getCodeList');
    return res.data;
  }
}
export default new UserService();
