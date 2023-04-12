import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPeakseasonList(json?:any) { // 성수기 리스트 [MB_PKSN]
		const res = await jsonApi('/bo/mb/getPeakseasonList', json ? json : {});
		return res.data;
	}
	async getPeakseason(json?:any) { // 성수기 상세조회 [MB_PKSN]
		const res = await jsonApi('/bo/mb/getPeakseason', json ? json : {});
		return res.data;
	}
	async setPeakseasonList(json?:any) { // 성수기 리스트등록 [MB_PKSN]
		const res = await jsonApi('/bo/mb/setPeakseasonList', json ? json : {});
		return res.data;
	}
	async insertPeakseason(json?:any) { // 성수기 등록 [MB_PKSN]
		const res = await jsonApi('/bo/mb/insertPeakseason', json ? json : {});
		return res.data;
	}
	async updatePeakseason(json?:any) { // 성수기 수정 [MB_PKSN]
		const res = await jsonApi('/bo/mb/updatePeakseason', json ? json : {});
		return res.data;
	}
	async deletePeakseason(json?:any) { // 성수기 삭제 [MB_PKSN]
		const res = await jsonApi('/bo/mb/getPeakseasonList', json ? json : {});
		return res.data;
	}
}
export default new CodeService();

