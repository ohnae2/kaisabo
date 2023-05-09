import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class FtpService {
	/**
	 * file
	 * 
	 * @param formData 
	 * @returns 
	 */
	async uploadList(formData:FormData) {
		const res = await formApi('/file/uploadList', formData);
		return res.data;
	}
	async getList(formData:FormData) {
		const res = await formApi('/file/getList', formData);
		return res.data;
	}
}
export default new FtpService();

