import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getBoardList(json?:any) { // 게시판 리스트 [DP_BRD]
		const res = await jsonApi('/bo/dp/getBoardList', json);
		return res.data;
	}
	async getBoard(json?:any) { // 게시판 상세조회 [DP_BRD]
		const res = await jsonApi('/bo/dp/getBoard', json);
		return res.data;
	}
	async setBoardList(json?:any) { // 게시판 리스트등록 [DP_BRD]
		const res = await jsonApi('/bo/dp/setBoardList', json);
		return res.data;
	}
	async insertBoard(json?:any) { // 게시판 등록 [DP_BRD]
		const res = await jsonApi('/bo/dp/insertBoard', json);
		return res.data;
	}
	async updateBoard(json?:any) { // 게시판 수정 [DP_BRD]
		const res = await jsonApi('/bo/dp/updateBoard', json);
		return res.data;
	}
	async deleteBoard(json?:any) { // 게시판 삭제 [DP_BRD]
		const res = await jsonApi('/bo/dp/getBoardList', json);
		return res.data;
	}
}
export default new CodeService();

