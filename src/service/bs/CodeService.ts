import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getCodeList(json?:any) { // 코드 리스트 [BS_CD]
		const res = await jsonApi('/bo/bs/getCodeList', JSON.parse(json));
		return res.data;
	}
	async getCode(json?:any) { // 코드 상세조회 [BS_CD]
		const res = await jsonApi('/bo/bs/getCode', JSON.parse(json));
		return res.data;
	}
	async setCodeList(json?:any) { // 코드 리스트등록 [BS_CD]
		const res = await jsonApi('/bo/bs/setCodeList', JSON.parse(json));
		return res.data;
	}
	async insertCode(json?:any) { // 코드 등록 [BS_CD]
		const res = await jsonApi('/bo/bs/insertCode', JSON.parse(json));
		return res.data;
	}
	async updateCode(json?:any) { // 코드 수정 [BS_CD]
		const res = await jsonApi('/bo/bs/updateCode', JSON.parse(json));
		return res.data;
	}
	async deleteCode(json?:any) { // 코드 삭제 [BS_CD]
		const res = await jsonApi('/bo/bs/getCodeList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

