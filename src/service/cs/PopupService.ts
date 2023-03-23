import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPopupList(json?:any) { // 팝업 리스트 [CS_POP]
		const res = await jsonApi('/bo/cs/getPopupList', json);
		return res.data;
	}
	async getPopup(json?:any) { // 팝업 상세조회 [CS_POP]
		const res = await jsonApi('/bo/cs/getPopup', json);
		return res.data;
	}
	async setPopupList(json?:any) { // 팝업 리스트등록 [CS_POP]
		const res = await jsonApi('/bo/cs/setPopupList', json);
		return res.data;
	}
	async insertPopup(json?:any) { // 팝업 등록 [CS_POP]
		const res = await jsonApi('/bo/cs/insertPopup', json);
		return res.data;
	}
	async updatePopup(json?:any) { // 팝업 수정 [CS_POP]
		const res = await jsonApi('/bo/cs/updatePopup', json);
		return res.data;
	}
	async deletePopup(json?:any) { // 팝업 삭제 [CS_POP]
		const res = await jsonApi('/bo/cs/getPopupList', json);
		return res.data;
	}
}
export default new CodeService();

