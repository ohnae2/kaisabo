import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getMemberList(json?:any) { // 회원 리스트 [MB_MBR]
		const res = await jsonApi('/bo/mb/getMemberList', json);
		return res.data;
	}
	async getMember(json?:any) { // 회원 상세조회 [MB_MBR]
		const res = await jsonApi('/bo/mb/getMember', json);
		return res.data;
	}
	async setMemberList(json?:any) { // 회원 리스트등록 [MB_MBR]
		const res = await jsonApi('/bo/mb/setMemberList', json);
		return res.data;
	}
	async insertMember(json?:any) { // 회원 등록 [MB_MBR]
		const res = await jsonApi('/bo/mb/insertMember', json);
		return res.data;
	}
	async updateMember(json?:any) { // 회원 수정 [MB_MBR]
		const res = await jsonApi('/bo/mb/updateMember', json);
		return res.data;
	}
	async deleteMember(json?:any) { // 회원 삭제 [MB_MBR]
		const res = await jsonApi('/bo/mb/getMemberList', json);
		return res.data;
	}
}
export default new CodeService();

