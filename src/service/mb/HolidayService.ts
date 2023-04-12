import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getHolidayList(json?:any) { // 휴일 리스트 [MB_HLD]
		const res = await jsonApi('/bo/mb/getHolidayList', json ? json : {});
		return res.data;
	}
	async getHoliday(json?:any) { // 휴일 상세조회 [MB_HLD]
		const res = await jsonApi('/bo/mb/getHoliday', json ? json : {});
		return res.data;
	}
	async setHolidayList(json?:any) { // 휴일 리스트등록 [MB_HLD]
		const res = await jsonApi('/bo/mb/setHolidayList', json ? json : {});
		return res.data;
	}
	async insertHoliday(json?:any) { // 휴일 등록 [MB_HLD]
		const res = await jsonApi('/bo/mb/insertHoliday', json ? json : {});
		return res.data;
	}
	async updateHoliday(json?:any) { // 휴일 수정 [MB_HLD]
		const res = await jsonApi('/bo/mb/updateHoliday', json ? json : {});
		return res.data;
	}
	async deleteHoliday(json?:any) { // 휴일 삭제 [MB_HLD]
		const res = await jsonApi('/bo/mb/getHolidayList', json ? json : {});
		return res.data;
	}
}
export default new CodeService();

