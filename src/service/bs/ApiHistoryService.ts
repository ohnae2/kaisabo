import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getApiHistoryList(json?:any) { // API이력 리스트 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/getApiHistoryList', json ? json : {});
		return res.data;
	}
	async getApiHistory(json?:any) { // API이력 상세조회 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/getApiHistory', json ? json : {});
		return res.data;
	}
	async setApiHistoryList(json?:any) { // API이력 리스트등록 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/setApiHistoryList', json ? json : {});
		return res.data;
	}
	async insertApiHistory(json?:any) { // API이력 등록 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/insertApiHistory', json ? json : {});
		return res.data;
	}
	async updateApiHistory(json?:any) { // API이력 수정 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/updateApiHistory', json ? json : {});
		return res.data;
	}
	async deleteApiHistory(json?:any) { // API이력 삭제 [BS_API_HIST]
		const res = await jsonApi('/bo/bs/getApiHistoryList', json ? json : {});
		return res.data;
	}
}
export default new CodeService();

