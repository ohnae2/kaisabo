import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getBoardCommentList(json?:any) { // 게시판 댓글 리스트 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/getBoardCommentList', json ? json : {});
		return res.data;
	}
	async getBoardComment(json?:any) { // 게시판 댓글 상세조회 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/getBoardComment', json ? json : {});
		return res.data;
	}
	async setBoardCommentList(json?:any) { // 게시판 댓글 리스트등록 [DP_BRD_CMMT]
		const res = await jsonApi('/bo/dp/setBoardCommentList', json ? json : {});
		return res.data;
	}
	async insertBoardComment(formdata:FormData) { // 게시판 댓글 등록 [DP_BRD_CMMT]
		const res = await formApi('/bo/dp/insertBoardComment', formdata);
		return res.data;
	}
	async updateBoardComment(formdata:FormData) { // 게시판 댓글 수정 [DP_BRD_CMMT]
		const res = await formApi('/bo/dp/updateBoardComment', formdata);
		return res.data;
	}
	async deleteBoardComment(formdata:FormData) { // 게시판 댓글 삭제 [DP_BRD_CMMT]
		const res = await formApi('/bo/dp/getBoardCommentList', formdata);
		return res.data;
	}
}
export default new CodeService();

