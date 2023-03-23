import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getUserList(json?:any) { // 사용자 리스트 [MB_USR]
		const res = await jsonApi('/bo/mb/getUserList', JSON.parse(json));
		return res.data;
	}
	async getUser(json?:any) { // 사용자 상세조회 [MB_USR]
		const res = await jsonApi('/bo/mb/getUser', JSON.parse(json));
		return res.data;
	}
	async setUserList(json?:any) { // 사용자 리스트등록 [MB_USR]
		const res = await jsonApi('/bo/mb/setUserList', JSON.parse(json));
		return res.data;
	}
	async insertUser(json?:any) { // 사용자 등록 [MB_USR]
		const res = await jsonApi('/bo/mb/insertUser', JSON.parse(json));
		return res.data;
	}
	async updateUser(json?:any) { // 사용자 수정 [MB_USR]
		const res = await jsonApi('/bo/mb/updateUser', JSON.parse(json));
		return res.data;
	}
	async deleteUser(json?:any) { // 사용자 삭제 [MB_USR]
		const res = await jsonApi('/bo/mb/getUserList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

