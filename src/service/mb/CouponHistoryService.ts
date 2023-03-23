import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getCouponHistoryList(json?:any) { // 회원쿠폰내역 리스트 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/getCouponHistoryList', json);
		return res.data;
	}
	async getCouponHistory(json?:any) { // 회원쿠폰내역 상세조회 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/getCouponHistory', json);
		return res.data;
	}
	async setCouponHistoryList(json?:any) { // 회원쿠폰내역 리스트등록 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/setCouponHistoryList', json);
		return res.data;
	}
	async insertCouponHistory(json?:any) { // 회원쿠폰내역 등록 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/insertCouponHistory', json);
		return res.data;
	}
	async updateCouponHistory(json?:any) { // 회원쿠폰내역 수정 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/updateCouponHistory', json);
		return res.data;
	}
	async deleteCouponHistory(json?:any) { // 회원쿠폰내역 삭제 [MBR_CPN_HIST]
		const res = await jsonApi('/bo/mb/getCouponHistoryList', json);
		return res.data;
	}
}
export default new CodeService();

