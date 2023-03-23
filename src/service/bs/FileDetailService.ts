import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getFileDetailList(json?:any) { // 파일상세 리스트 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/getFileDetailList', JSON.parse(json));
		return res.data;
	}
	async getFileDetail(json?:any) { // 파일상세 상세조회 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/getFileDetail', JSON.parse(json));
		return res.data;
	}
	async setFileDetailList(json?:any) { // 파일상세 리스트등록 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/setFileDetailList', JSON.parse(json));
		return res.data;
	}
	async insertFileDetail(json?:any) { // 파일상세 등록 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/insertFileDetail', JSON.parse(json));
		return res.data;
	}
	async updateFileDetail(json?:any) { // 파일상세 수정 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/updateFileDetail', JSON.parse(json));
		return res.data;
	}
	async deleteFileDetail(json?:any) { // 파일상세 삭제 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/getFileDetailList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

