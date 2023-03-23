import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getQnaList(json?:any) { // QNA 리스트 [CS_QNA]
		const res = await jsonApi('/bo/cs/getQnaList', JSON.parse(json));
		return res.data;
	}
	async getQna(json?:any) { // QNA 상세조회 [CS_QNA]
		const res = await jsonApi('/bo/cs/getQna', JSON.parse(json));
		return res.data;
	}
	async setQnaList(json?:any) { // QNA 리스트등록 [CS_QNA]
		const res = await jsonApi('/bo/cs/setQnaList', JSON.parse(json));
		return res.data;
	}
	async insertQna(json?:any) { // QNA 등록 [CS_QNA]
		const res = await jsonApi('/bo/cs/insertQna', JSON.parse(json));
		return res.data;
	}
	async updateQna(json?:any) { // QNA 수정 [CS_QNA]
		const res = await jsonApi('/bo/cs/updateQna', JSON.parse(json));
		return res.data;
	}
	async deleteQna(json?:any) { // QNA 삭제 [CS_QNA]
		const res = await jsonApi('/bo/cs/getQnaList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

