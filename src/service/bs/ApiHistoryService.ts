import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getApiHistoryList(json?:any) { // API이력 리스트 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/getApiHistoryList', JSON.parse(json));
		return res.data;
	}
	async getApiHistory(json?:any) { // API이력 상세조회 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/getApiHistory', JSON.parse(json));
		return res.data;
	}
	async setApiHistoryList(json?:any) { // API이력 리스트등록 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/setApiHistoryList', JSON.parse(json));
		return res.data;
	}
	async insertApiHistory(json?:any) { // API이력 등록 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/insertApiHistory', JSON.parse(json));
		return res.data;
	}
	async updateApiHistory(json?:any) { // API이력 수정 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/updateApiHistory', JSON.parse(json));
		return res.data;
	}
	async deleteApiHistory(json?:any) { // API이력 삭제 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/getApiHistoryList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

