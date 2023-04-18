import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getLinkHistoryList(json?:any) { // 연동이력 리스트 [BS_LINK_HIST]
		const res = await jsonApi('/bo/bs/getLinkHistoryList', json ? json : {});
		return res.data;
	}
	async getLinkHistory(json?:any) { // 연동이력 상세조회 [BS_LINK_HIST]
		const res = await jsonApi('/bo/bs/getLinkHistory', json ? json : {});
		return res.data;
	}
	async setLinkHistoryList(json?:any) { // 연동이력 리스트등록 [BS_LINK_HIST]
		const res = await jsonApi('/bo/bs/setLinkHistoryList', json ? json : {});
		return res.data;
	}
	async insertLinkHistory(formdata:FormData) { // 연동이력 등록 [BS_LINK_HIST]
		const res = await formApi('/bo/bs/insertLinkHistory', formdata);
		return res.data;
	}
	async updateLinkHistory(formdata:FormData) { // 연동이력 수정 [BS_LINK_HIST]
		const res = await formApi('/bo/bs/updateLinkHistory', formdata);
		return res.data;
	}
	async deleteLinkHistory(formdata:FormData) { // 연동이력 삭제 [BS_LINK_HIST]
		const res = await formApi('/bo/bs/getLinkHistoryList', formdata);
		return res.data;
	}
}
export default new CodeService();

