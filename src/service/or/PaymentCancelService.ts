import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPaymentCancelList(json?:any) { // 결제취소내역 리스트 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/getPaymentCancelList', JSON.parse(json));
		return res.data;
	}
	async getPaymentCancel(json?:any) { // 결제취소내역 상세조회 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/getPaymentCancel', JSON.parse(json));
		return res.data;
	}
	async setPaymentCancelList(json?:any) { // 결제취소내역 리스트등록 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/setPaymentCancelList', JSON.parse(json));
		return res.data;
	}
	async insertPaymentCancel(json?:any) { // 결제취소내역 등록 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/insertPaymentCancel', JSON.parse(json));
		return res.data;
	}
	async updatePaymentCancel(json?:any) { // 결제취소내역 수정 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/updatePaymentCancel', JSON.parse(json));
		return res.data;
	}
	async deletePaymentCancel(json?:any) { // 결제취소내역 삭제 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/getPaymentCancelList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

