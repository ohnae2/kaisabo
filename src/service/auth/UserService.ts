/* eslint-disable no-debugger */
import { api } from '../../utils/api';

class UserService {
  async getUserLogin(formdata:FormData) {
    const res = await api('/auth/getUserLogin', formdata, 'formdata');
    return res.data;
  }
}
export default new UserService();
