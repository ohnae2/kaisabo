import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getCouponHistoryList(json?:any) { // 회원쿠폰내역 리스트 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/getCouponHistoryList', json ? json : {});
		return res.data;
	}
	async getCouponHistory(json?:any) { // 회원쿠폰내역 상세조회 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/getCouponHistory', json ? json : {});
		return res.data;
	}
	async setCouponHistoryList(json?:any) { // 회원쿠폰내역 리스트등록 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/setCouponHistoryList', json ? json : {});
		return res.data;
	}
	async insertCouponHistory(formdata:FormData) { // 회원쿠폰내역 등록 [MBR_CPN_HIST]
		const res = await formApi('/bo/mb/insertCouponHistory', formdata);
		return res.data;
	}
	async updateCouponHistory(formdata:FormData) { // 회원쿠폰내역 수정 [MBR_CPN_HIST]
		const res = await formApi('/bo/mb/updateCouponHistory', formdata);
		return res.data;
	}
	async deleteCouponHistory(formdata:FormData) { // 회원쿠폰내역 삭제 [MBR_CPN_HIST]
		const res = await formApi('/bo/mb/getCouponHistoryList', formdata);
		return res.data;
	}
}
export default new CodeService();

