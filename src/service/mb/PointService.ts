import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPointList(json?:any) { // 포인트 리스트 [MB_PNT]
		const res = await jsonApi('/bo/mb/getPointList', json ? json : {});
		return res.data;
	}
	async getPoint(json?:any) { // 포인트 상세조회 [MB_PNT]
		const res = await jsonApi('/bo/mb/getPoint', json ? json : {});
		return res.data;
	}
	async setPointList(json?:any) { // 포인트 리스트등록 [MB_PNT]
		const res = await jsonApi('/bo/mb/setPointList', json ? json : {});
		return res.data;
	}
	async insertPoint(formdata:FormData) { // 포인트 등록 [MB_PNT]
		const res = await formApi('/bo/mb/insertPoint', formdata);
		return res.data;
	}
	async updatePoint(formdata:FormData) { // 포인트 수정 [MB_PNT]
		const res = await formApi('/bo/mb/updatePoint', formdata);
		return res.data;
	}
	async deletePoint(formdata:FormData) { // 포인트 삭제 [MB_PNT]
		const res = await formApi('/bo/mb/getPointList', formdata);
		return res.data;
	}
}
export default new CodeService();

