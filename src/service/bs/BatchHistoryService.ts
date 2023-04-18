import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getBatchHistoryList(json?:any) { // 배치이력 리스트 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/getBatchHistoryList', json ? json : {});
		return res.data;
	}
	async getBatchHistory(json?:any) { // 배치이력 상세조회 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/getBatchHistory', json ? json : {});
		return res.data;
	}
	async setBatchHistoryList(json?:any) { // 배치이력 리스트등록 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/setBatchHistoryList', json ? json : {});
		return res.data;
	}
	async insertBatchHistory(formdata:FormData) { // 배치이력 등록 [BS_BTCH_HIST]
		const res = await formApi('/bo/bs/insertBatchHistory', formdata);
		return res.data;
	}
	async updateBatchHistory(formdata:FormData) { // 배치이력 수정 [BS_BTCH_HIST]
		const res = await formApi('/bo/bs/updateBatchHistory', formdata);
		return res.data;
	}
	async deleteBatchHistory(formdata:FormData) { // 배치이력 삭제 [BS_BTCH_HIST]
		const res = await formApi('/bo/bs/getBatchHistoryList', formdata);
		return res.data;
	}
}
export default new CodeService();

