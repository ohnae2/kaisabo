import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getEventList(json?:any) { // 이벤트 리스트 [DP_EVT]
		const res = await jsonApi('/bo/dp/getEventList', JSON.parse(json));
		return res.data;
	}
	async getEvent(json?:any) { // 이벤트 상세조회 [DP_EVT]
		const res = await jsonApi('/bo/dp/getEvent', JSON.parse(json));
		return res.data;
	}
	async setEventList(json?:any) { // 이벤트 리스트등록 [DP_EVT]
		const res = await jsonApi('/bo/dp/setEventList', JSON.parse(json));
		return res.data;
	}
	async insertEvent(json?:any) { // 이벤트 등록 [DP_EVT]
		const res = await jsonApi('/bo/dp/insertEvent', JSON.parse(json));
		return res.data;
	}
	async updateEvent(json?:any) { // 이벤트 수정 [DP_EVT]
		const res = await jsonApi('/bo/dp/updateEvent', JSON.parse(json));
		return res.data;
	}
	async deleteEvent(json?:any) { // 이벤트 삭제 [DP_EVT]
		const res = await jsonApi('/bo/dp/getEventList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

