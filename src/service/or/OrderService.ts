import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getOrderList(json?:any) { // 주문 리스트 [OR_ORD]
		const res = await jsonApi('/bo/or/getOrderList', JSON.parse(json));
		return res.data;
	}
	async getOrder(json?:any) { // 주문 상세조회 [OR_ORD]
		const res = await jsonApi('/bo/or/getOrder', JSON.parse(json));
		return res.data;
	}
	async setOrderList(json?:any) { // 주문 리스트등록 [OR_ORD]
		const res = await jsonApi('/bo/or/setOrderList', JSON.parse(json));
		return res.data;
	}
	async insertOrder(json?:any) { // 주문 등록 [OR_ORD]
		const res = await jsonApi('/bo/or/insertOrder', JSON.parse(json));
		return res.data;
	}
	async updateOrder(json?:any) { // 주문 수정 [OR_ORD]
		const res = await jsonApi('/bo/or/updateOrder', JSON.parse(json));
		return res.data;
	}
	async deleteOrder(json?:any) { // 주문 삭제 [OR_ORD]
		const res = await jsonApi('/bo/or/getOrderList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

