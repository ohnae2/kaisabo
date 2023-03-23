import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getNoticeList(json?:any) { // 공지 리스트 [CS_NOTI]
		const res = await jsonApi('/bo/cs/getNoticeList', JSON.parse(json));
		return res.data;
	}
	async getNotice(json?:any) { // 공지 상세조회 [CS_NOTI]
		const res = await jsonApi('/bo/cs/getNotice', JSON.parse(json));
		return res.data;
	}
	async setNoticeList(json?:any) { // 공지 리스트등록 [CS_NOTI]
		const res = await jsonApi('/bo/cs/setNoticeList', JSON.parse(json));
		return res.data;
	}
	async insertNotice(json?:any) { // 공지 등록 [CS_NOTI]
		const res = await jsonApi('/bo/cs/insertNotice', JSON.parse(json));
		return res.data;
	}
	async updateNotice(json?:any) { // 공지 수정 [CS_NOTI]
		const res = await jsonApi('/bo/cs/updateNotice', JSON.parse(json));
		return res.data;
	}
	async deleteNotice(json?:any) { // 공지 삭제 [CS_NOTI]
		const res = await jsonApi('/bo/cs/getNoticeList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

