import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getBoardCommentList(json?:any) { // 게시판 댓글 리스트 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/getBoardCommentList', JSON.parse(json));
		return res.data;
	}
	async getBoardComment(json?:any) { // 게시판 댓글 상세조회 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/getBoardComment', JSON.parse(json));
		return res.data;
	}
	async setBoardCommentList(json?:any) { // 게시판 댓글 리스트등록 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/setBoardCommentList', JSON.parse(json));
		return res.data;
	}
	async insertBoardComment(json?:any) { // 게시판 댓글 등록 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/insertBoardComment', JSON.parse(json));
		return res.data;
	}
	async updateBoardComment(json?:any) { // 게시판 댓글 수정 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/updateBoardComment', JSON.parse(json));
		return res.data;
	}
	async deleteBoardComment(json?:any) { // 게시판 댓글 삭제 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/getBoardCommentList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

