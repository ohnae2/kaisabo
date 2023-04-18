import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getPaymentCancelList(json?:any) { // 결제취소내역 리스트 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/getPaymentCancelList', json ? json : {});
		return res.data;
	}
	async getPaymentCancel(json?:any) { // 결제취소내역 상세조회 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/getPaymentCancel', json ? json : {});
		return res.data;
	}
	async setPaymentCancelList(json?:any) { // 결제취소내역 리스트등록 [OR_PAY_CNCL]
		const res = await jsonApi('/bo/or/setPaymentCancelList', json ? json : {});
		return res.data;
	}
	async insertPaymentCancel(formdata:FormData) { // 결제취소내역 등록 [OR_PAY_CNCL]
		const res = await formApi('/bo/or/insertPaymentCancel', formdata);
		return res.data;
	}
	async updatePaymentCancel(formdata:FormData) { // 결제취소내역 수정 [OR_PAY_CNCL]
		const res = await formApi('/bo/or/updatePaymentCancel', formdata);
		return res.data;
	}
	async deletePaymentCancel(formdata:FormData) { // 결제취소내역 삭제 [OR_PAY_CNCL]
		const res = await formApi('/bo/or/getPaymentCancelList', formdata);
		return res.data;
	}
}
export default new CodeService();

