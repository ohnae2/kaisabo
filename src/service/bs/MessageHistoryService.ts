import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getMessageHistoryList(json?:any) { // 문자메시지이력 리스트 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/getMessageHistoryList', json ? json : {});
		return res.data;
	}
	async getMessageHistory(json?:any) { // 문자메시지이력 상세조회 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/getMessageHistory', json ? json : {});
		return res.data;
	}
	async setMessageHistoryList(json?:any) { // 문자메시지이력 리스트등록 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/setMessageHistoryList', json ? json : {});
		return res.data;
	}
	async insertMessageHistory(json?:any) { // 문자메시지이력 등록 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/insertMessageHistory', json ? json : {});
		return res.data;
	}
	async updateMessageHistory(json?:any) { // 문자메시지이력 수정 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/updateMessageHistory', json ? json : {});
		return res.data;
	}
	async deleteMessageHistory(json?:any) { // 문자메시지이력 삭제 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/getMessageHistoryList', json ? json : {});
		return res.data;
	}
}
export default new CodeService();

