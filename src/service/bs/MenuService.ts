import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getMenuList(json?:any) { // 메뉴 리스트 [BS_MENU]
		const res = await jsonApi('/bo/bs/getMenuList', json ? json : {});
		return res.data;
	}
	async getMenu(json?:any) { // 메뉴 상세조회 [BS_MENU]
		const res = await jsonApi('/bo/bs/getMenu', json ? json : {});
		return res.data;
	}
	async setMenuList(json?:any) { // 메뉴 리스트등록 [BS_MENU]
		const res = await jsonApi('/bo/bs/setMenuList', json ? json : {});
		return res.data;
	}
	async insertMenu(formdata:FormData) { // 메뉴 등록 [BS_MENU]
		const res = await formApi('/bo/bs/insertMenu', formdata);
		return res.data;
	}
	async updateMenu(formdata:FormData) { // 메뉴 수정 [BS_MENU]
		const res = await formApi('/bo/bs/updateMenu', formdata);
		return res.data;
	}
	async deleteMenu(formdata:FormData) { // 메뉴 삭제 [BS_MENU]
		const res = await formApi('/bo/bs/getMenuList', formdata);
		return res.data;
	}
}
export default new CodeService();

