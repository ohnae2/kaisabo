import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPointList(json?:any) { // 포인트 리스트 [MB_PNT]
		const res = await jsonApi('/bo/mb/getPointList', JSON.parse(json));
		return res.data;
	}
	async getPoint(json?:any) { // 포인트 상세조회 [MB_PNT]
		const res = await jsonApi('/bo/mb/getPoint', JSON.parse(json));
		return res.data;
	}
	async setPointList(json?:any) { // 포인트 리스트등록 [MB_PNT]
		const res = await jsonApi('/bo/mb/setPointList', JSON.parse(json));
		return res.data;
	}
	async insertPoint(json?:any) { // 포인트 등록 [MB_PNT]
		const res = await jsonApi('/bo/mb/insertPoint', JSON.parse(json));
		return res.data;
	}
	async updatePoint(json?:any) { // 포인트 수정 [MB_PNT]
		const res = await jsonApi('/bo/mb/updatePoint', JSON.parse(json));
		return res.data;
	}
	async deletePoint(json?:any) { // 포인트 삭제 [MB_PNT]
		const res = await jsonApi('/bo/mb/getPointList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

