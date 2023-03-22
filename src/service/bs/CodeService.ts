import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

// comment
class CodeService {
  async getCodeList() {
    const res = await jsonApi('/bo/getCodeList');
    return res.data;
  }
}
export default new CodeService();
