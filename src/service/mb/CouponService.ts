import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getCouponList(json?:any) { // 쿠폰 리스트 [MB_CPN]
		const res = await jsonApi('/bo/mb/getCouponList', json);
		return res.data;
	}
	async getCoupon(json?:any) { // 쿠폰 상세조회 [MB_CPN]
		const res = await jsonApi('/bo/mb/getCoupon', json);
		return res.data;
	}
	async setCouponList(json?:any) { // 쿠폰 리스트등록 [MB_CPN]
		const res = await jsonApi('/bo/mb/setCouponList', json);
		return res.data;
	}
	async insertCoupon(json?:any) { // 쿠폰 등록 [MB_CPN]
		const res = await jsonApi('/bo/mb/insertCoupon', json);
		return res.data;
	}
	async updateCoupon(json?:any) { // 쿠폰 수정 [MB_CPN]
		const res = await jsonApi('/bo/mb/updateCoupon', json);
		return res.data;
	}
	async deleteCoupon(json?:any) { // 쿠폰 삭제 [MB_CPN]
		const res = await jsonApi('/bo/mb/getCouponList', json);
		return res.data;
	}
}
export default new CodeService();
