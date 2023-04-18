import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getMenuRoleList(json?:any) { // 업체메뉴권한 리스트 [BS_MENU_ROLE]
		const res = await jsonApi('/bo/bs/getMenuRoleList', json ? json : {});
		return res.data;
	}
	async getMenuRole(json?:any) { // 업체메뉴권한 상세조회 [BS_MENU_ROLE]
		const res = await jsonApi('/bo/bs/getMenuRole', json ? json : {});
		return res.data;
	}
	async setMenuRoleList(json?:any) { // 업체메뉴권한 리스트등록 [BS_MENU_ROLE]
		const res = await jsonApi('/bo/bs/setMenuRoleList', json ? json : {});
		return res.data;
	}
	async insertMenuRole(formdata:FormData) { // 업체메뉴권한 등록 [BS_MENU_ROLE]
		const res = await formApi('/bo/bs/insertMenuRole', formdata);
		return res.data;
	}
	async updateMenuRole(formdata:FormData) { // 업체메뉴권한 수정 [BS_MENU_ROLE]
		const res = await formApi('/bo/bs/updateMenuRole', formdata);
		return res.data;
	}
	async deleteMenuRole(formdata:FormData) { // 업체메뉴권한 삭제 [BS_MENU_ROLE]
		const res = await formApi('/bo/bs/getMenuRoleList', formdata);
		return res.data;
	}
}
export default new CodeService();

