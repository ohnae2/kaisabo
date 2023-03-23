import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getMenuList(json?:any) { // 메뉴 리스트 [BS_MENU]
		const res = await jsonApi('/bo/bs/getMenuList', json);
		return res.data;
	}
	async getMenu(json?:any) { // 메뉴 상세조회 [BS_MENU]
		const res = await jsonApi('/bo/bs/getMenu', json);
		return res.data;
	}
	async setMenuList(json?:any) { // 메뉴 리스트등록 [BS_MENU]
		const res = await jsonApi('/bo/bs/setMenuList', json);
		return res.data;
	}
	async insertMenu(json?:any) { // 메뉴 등록 [BS_MENU]
		const res = await jsonApi('/bo/bs/insertMenu', json);
		return res.data;
	}
	async updateMenu(json?:any) { // 메뉴 수정 [BS_MENU]
		const res = await jsonApi('/bo/bs/updateMenu', json);
		return res.data;
	}
	async deleteMenu(json?:any) { // 메뉴 삭제 [BS_MENU]
		const res = await jsonApi('/bo/bs/getMenuList', json);
		return res.data;
	}
}
export default new CodeService();

