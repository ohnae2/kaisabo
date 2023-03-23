import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getDisplayProductList(json?:any) { // 전시상품 리스트 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/getDisplayProductList', JSON.parse(json));
		return res.data;
	}
	async getDisplayProduct(json?:any) { // 전시상품 상세조회 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/getDisplayProduct', JSON.parse(json));
		return res.data;
	}
	async setDisplayProductList(json?:any) { // 전시상품 리스트등록 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/setDisplayProductList', JSON.parse(json));
		return res.data;
	}
	async insertDisplayProduct(json?:any) { // 전시상품 등록 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/insertDisplayProduct', JSON.parse(json));
		return res.data;
	}
	async updateDisplayProduct(json?:any) { // 전시상품 수정 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/updateDisplayProduct', JSON.parse(json));
		return res.data;
	}
	async deleteDisplayProduct(json?:any) { // 전시상품 삭제 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/getDisplayProductList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

