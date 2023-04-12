import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getFaqList(json?:any) { // FAQ 리스트 [CS_FAQ]
		const res = await jsonApi('/bo/cs/getFaqList', json ? json : {});
		return res.data;
	}
	async getFaq(json?:any) { // FAQ 상세조회 [CS_FAQ]
		const res = await jsonApi('/bo/cs/getFaq', json ? json : {});
		return res.data;
	}
	async setFaqList(json?:any) { // FAQ 리스트등록 [CS_FAQ]
		const res = await jsonApi('/bo/cs/setFaqList', json ? json : {});
		return res.data;
	}
	async insertFaq(json?:any) { // FAQ 등록 [CS_FAQ]
		const res = await jsonApi('/bo/cs/insertFaq', json ? json : {});
		return res.data;
	}
	async updateFaq(json?:any) { // FAQ 수정 [CS_FAQ]
		const res = await jsonApi('/bo/cs/updateFaq', json ? json : {});
		return res.data;
	}
	async deleteFaq(json?:any) { // FAQ 삭제 [CS_FAQ]
		const res = await jsonApi('/bo/cs/getFaqList', json ? json : {});
		return res.data;
	}
}
export default new CodeService();

