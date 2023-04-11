import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class MainService {
	async getDashboard(json?:any) {
		const res = await jsonApi('/main/getDashboard', json);
		return res.data;
	}
}
export default new MainService();

