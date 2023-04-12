import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPaymentList(json?:any) { // 결제내역 리스트 [OR_PAY]
		const res = await jsonApi('/bo/or/getPaymentList', json ? json : {});
		return res.data;
	}
	async getPayment(json?:any) { // 결제내역 상세조회 [OR_PAY]
		const res = await jsonApi('/bo/or/getPayment', json ? json : {});
		return res.data;
	}
	async setPaymentList(json?:any) { // 결제내역 리스트등록 [OR_PAY]
		const res = await jsonApi('/bo/or/setPaymentList', json ? json : {});
		return res.data;
	}
	async insertPayment(json?:any) { // 결제내역 등록 [OR_PAY]
		const res = await jsonApi('/bo/or/insertPayment', json ? json : {});
		return res.data;
	}
	async updatePayment(json?:any) { // 결제내역 수정 [OR_PAY]
		const res = await jsonApi('/bo/or/updatePayment', json ? json : {});
		return res.data;
	}
	async deletePayment(json?:any) { // 결제내역 삭제 [OR_PAY]
		const res = await jsonApi('/bo/or/getPaymentList', json ? json : {});
		return res.data;
	}
}
export default new CodeService();

