import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getNoticeList(json?:any) { // 공지 리스트 [CS_NOTI]
		const res = await jsonApi('/bo/cs/getNoticeList', json ? json : {});
		return res.data;
	}
	async getNotice(json?:any) { // 공지 상세조회 [CS_NOTI]
		const res = await jsonApi('/bo/cs/getNotice', json ? json : {});
		return res.data;
	}
	async setNoticeList(json?:any) { // 공지 리스트등록 [CS_NOTI]
		const res = await jsonApi('/bo/cs/setNoticeList', json ? json : {});
		return res.data;
	}
	async insertNotice(formdata:FormData) { // 공지 등록 [CS_NOTI]
		const res = await formApi('/bo/cs/insertNotice', formdata);
		return res.data;
	}
	async updateNotice(formdata:FormData) { // 공지 수정 [CS_NOTI]
		const res = await formApi('/bo/cs/updateNotice', formdata);
		return res.data;
	}
	async deleteNotice(formdata:FormData) { // 공지 삭제 [CS_NOTI]
		const res = await formApi('/bo/cs/getNoticeList', formdata);
		return res.data;
	}
}
export default new CodeService();

