import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getDisplayProductList(json?:any) { // 전시상품 리스트 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/getDisplayProductList', json ? json : {});
		return res.data;
	}
	async getDisplayProduct(json?:any) { // 전시상품 상세조회 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/getDisplayProduct', json ? json : {});
		return res.data;
	}
	async setDisplayProductList(json?:any) { // 전시상품 리스트등록 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/setDisplayProductList', json ? json : {});
		return res.data;
	}
	async insertDisplayProduct(formdata:FormData) { // 전시상품 등록 [DP_DISP_PROD]
		const res = await formApi('/bo/dp/insertDisplayProduct', formdata);
		return res.data;
	}
	async updateDisplayProduct(formdata:FormData) { // 전시상품 수정 [DP_DISP_PROD]
		const res = await formApi('/bo/dp/updateDisplayProduct', formdata);
		return res.data;
	}
	async deleteDisplayProduct(formdata:FormData) { // 전시상품 삭제 [DP_DISP_PROD]
		const res = await formApi('/bo/dp/getDisplayProductList', formdata);
		return res.data;
	}
}
export default new CodeService();

