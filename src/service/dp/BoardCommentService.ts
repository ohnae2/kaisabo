import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getBoardCommentList(json?:any) { // 게시판 댓글 리스트 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/getBoardCommentList', json);
		return res.data;
	}
	async getBoardComment(json?:any) { // 게시판 댓글 상세조회 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/getBoardComment', json);
		return res.data;
	}
	async setBoardCommentList(json?:any) { // 게시판 댓글 리스트등록 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/setBoardCommentList', json);
		return res.data;
	}
	async insertBoardComment(json?:any) { // 게시판 댓글 등록 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/insertBoardComment', json);
		return res.data;
	}
	async updateBoardComment(json?:any) { // 게시판 댓글 수정 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/updateBoardComment', json);
		return res.data;
	}
	async deleteBoardComment(json?:any) { // 게시판 댓글 삭제 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/getBoardCommentList', json);
		return res.data;
	}
}
export default new CodeService();

