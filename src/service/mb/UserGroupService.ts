import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getUserGroupList(json?:any) { // 그룹 리스트 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/getUserGroupList', json);
		return res.data;
	}
	async getUserGroup(json?:any) { // 그룹 상세조회 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/getUserGroup', json);
		return res.data;
	}
	async setUserGroupList(json?:any) { // 그룹 리스트등록 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/setUserGroupList', json);
		return res.data;
	}
	async insertUserGroup(json?:any) { // 그룹 등록 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/insertUserGroup', json);
		return res.data;
	}
	async updateUserGroup(json?:any) { // 그룹 수정 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/updateUserGroup', json);
		return res.data;
	}
	async deleteUserGroup(json?:any) { // 그룹 삭제 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/getUserGroupList', json);
		return res.data;
	}
}
export default new CodeService();

