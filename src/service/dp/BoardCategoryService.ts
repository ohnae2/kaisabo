import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getBoardCategoryList(json?:any) { // 게시판분류 리스트 [DP_BRD_CAT]
		const res = await jsonApi('/bo/dp/getBoardCategoryList', json ? json : {});
		return res.data;
	}
	async getBoardCategory(json?:any) { // 게시판분류 상세조회 [DP_BRD_CAT]
		const res = await jsonApi('/bo/dp/getBoardCategory', json ? json : {});
		return res.data;
	}
	async setBoardCategoryList(json?:any) { // 게시판분류 리스트등록 [DP_BRD_CAT]
		const res = await jsonApi('/bo/dp/setBoardCategoryList', json ? json : {});
		return res.data;
	}
	async insertBoardCategory(formdata:FormData) { // 게시판분류 등록 [DP_BRD_CAT]
		const res = await formApi('/bo/dp/insertBoardCategory', formdata);
		return res.data;
	}
	async updateBoardCategory(formdata:FormData) { // 게시판분류 수정 [DP_BRD_CAT]
		const res = await formApi('/bo/dp/updateBoardCategory', formdata);
		return res.data;
	}
	async deleteBoardCategory(formdata:FormData) { // 게시판분류 삭제 [DP_BRD_CAT]
		const res = await formApi('/bo/dp/getBoardCategoryList', formdata);
		return res.data;
	}
}
export default new CodeService();

