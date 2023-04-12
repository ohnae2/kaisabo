import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getDisplayList(json?:any) { // 전시 리스트 [DP_DISP]
		const res = await jsonApi('/bo/dp/getDisplayList', json ? json : {});
		return res.data;
	}
	async getDisplay(json?:any) { // 전시 상세조회 [DP_DISP]
		const res = await jsonApi('/bo/dp/getDisplay', json ? json : {});
		return res.data;
	}
	async setDisplayList(json?:any) { // 전시 리스트등록 [DP_DISP]
		const res = await jsonApi('/bo/dp/setDisplayList', json ? json : {});
		return res.data;
	}
	async insertDisplay(json?:any) { // 전시 등록 [DP_DISP]
		const res = await jsonApi('/bo/dp/insertDisplay', json ? json : {});
		return res.data;
	}
	async updateDisplay(json?:any) { // 전시 수정 [DP_DISP]
		const res = await jsonApi('/bo/dp/updateDisplay', json ? json : {});
		return res.data;
	}
	async deleteDisplay(json?:any) { // 전시 삭제 [DP_DISP]
		const res = await jsonApi('/bo/dp/getDisplayList', json ? json : {});
		return res.data;
	}
}
export default new CodeService();

