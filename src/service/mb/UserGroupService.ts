import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getUserGroupList(json?:any) { // 그룹 리스트 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/getUserGroupList', json ? json : {});
		return res.data;
	}
	async getUserGroup(json?:any) { // 그룹 상세조회 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/getUserGroup', json ? json : {});
		return res.data;
	}
	async setUserGroupList(json?:any) { // 그룹 리스트등록 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/setUserGroupList', json ? json : {});
		return res.data;
	}
	async insertUserGroup(formdata:FormData) { // 그룹 등록 [MB_USR_GRP]
		const res = await formApi('/bo/mb/insertUserGroup', formdata);
		return res.data;
	}
	async updateUserGroup(formdata:FormData) { // 그룹 수정 [MB_USR_GRP]
		const res = await formApi('/bo/mb/updateUserGroup', formdata);
		return res.data;
	}
	async deleteUserGroup(formdata:FormData) { // 그룹 삭제 [MB_USR_GRP]
		const res = await formApi('/bo/mb/getUserGroupList', formdata);
		return res.data;
	}
}
export default new CodeService();

