import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPopupList(json?:any) { // 팝업 리스트 [CS_POP]
		const res = await jsonApi('/bo/cs/getPopupList', json ? json : {});
		return res.data;
	}
	async getPopup(json?:any) { // 팝업 상세조회 [CS_POP]
		const res = await jsonApi('/bo/cs/getPopup', json ? json : {});
		return res.data;
	}
	async setPopupList(json?:any) { // 팝업 리스트등록 [CS_POP]
		const res = await jsonApi('/bo/cs/setPopupList', json ? json : {});
		return res.data;
	}
	async insertPopup(formdata:FormData) { // 팝업 등록 [CS_POP]
		const res = await formApi('/bo/cs/insertPopup', formdata);
		return res.data;
	}
	async updatePopup(formdata:FormData) { // 팝업 수정 [CS_POP]
		const res = await formApi('/bo/cs/updatePopup', formdata);
		return res.data;
	}
	async deletePopup(formdata:FormData) { // 팝업 삭제 [CS_POP]
		const res = await formApi('/bo/cs/getPopupList', formdata);
		return res.data;
	}
}
export default new CodeService();

