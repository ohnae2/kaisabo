import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPointHistoryList(json?:any) { // 회원포인트내역 리스트 [MBR_PNT_HIST]
		const res = await jsonApi('/bo/mb/getPointHistoryList', JSON.parse(json));
		return res.data;
	}
	async getPointHistory(json?:any) { // 회원포인트내역 상세조회 [MBR_PNT_HIST]
		const res = await jsonApi('/bo/mb/getPointHistory', JSON.parse(json));
		return res.data;
	}
	async setPointHistoryList(json?:any) { // 회원포인트내역 리스트등록 [MBR_PNT_HIST]
		const res = await jsonApi('/bo/mb/setPointHistoryList', JSON.parse(json));
		return res.data;
	}
	async insertPointHistory(json?:any) { // 회원포인트내역 등록 [MBR_PNT_HIST]
		const res = await jsonApi('/bo/mb/insertPointHistory', JSON.parse(json));
		return res.data;
	}
	async updatePointHistory(json?:any) { // 회원포인트내역 수정 [MBR_PNT_HIST]
		const res = await jsonApi('/bo/mb/updatePointHistory', JSON.parse(json));
		return res.data;
	}
	async deletePointHistory(json?:any) { // 회원포인트내역 삭제 [MBR_PNT_HIST]
		const res = await jsonApi('/bo/mb/getPointHistoryList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

