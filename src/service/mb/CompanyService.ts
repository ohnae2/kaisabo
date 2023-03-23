import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getCompanyList(json?:any) { // 업체 리스트 [MB_CMP]
		const res = await jsonApi('/bo/mb/getCompanyList', json);
		return res.data;
	}
	async getCompany(json?:any) { // 업체 상세조회 [MB_CMP]
		const res = await jsonApi('/bo/mb/getCompany', json);
		return res.data;
	}
	async setCompanyList(json?:any) { // 업체 리스트등록 [MB_CMP]
		const res = await jsonApi('/bo/mb/setCompanyList', json);
		return res.data;
	}
	async insertCompany(json?:any) { // 업체 등록 [MB_CMP]
		const res = await jsonApi('/bo/mb/insertCompany', json);
		return res.data;
	}
	async updateCompany(json?:any) { // 업체 수정 [MB_CMP]
		const res = await jsonApi('/bo/mb/updateCompany', json);
		return res.data;
	}
	async deleteCompany(json?:any) { // 업체 삭제 [MB_CMP]
		const res = await jsonApi('/bo/mb/getCompanyList', json);
		return res.data;
	}
}
export default new CodeService();

