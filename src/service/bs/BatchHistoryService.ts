import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getBatchHistoryList(json?:any) { // 배치이력 리스트 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/getBatchHistoryList', JSON.parse(json));
		return res.data;
	}
	async getBatchHistory(json?:any) { // 배치이력 상세조회 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/getBatchHistory', JSON.parse(json));
		return res.data;
	}
	async setBatchHistoryList(json?:any) { // 배치이력 리스트등록 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/setBatchHistoryList', JSON.parse(json));
		return res.data;
	}
	async insertBatchHistory(json?:any) { // 배치이력 등록 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/insertBatchHistory', JSON.parse(json));
		return res.data;
	}
	async updateBatchHistory(json?:any) { // 배치이력 수정 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/updateBatchHistory', JSON.parse(json));
		return res.data;
	}
	async deleteBatchHistory(json?:any) { // 배치이력 삭제 [BS_BTCH_HIST]
		const res = await jsonApi('/bo/bs/getBatchHistoryList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

