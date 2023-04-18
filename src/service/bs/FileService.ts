import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getFileList(json?:any) { // 파일 리스트 [BS_FILE]
		const res = await jsonApi('/bo/bs/getFileList', json ? json : {});
		return res.data;
	}
	async getFile(json?:any) { // 파일 상세조회 [BS_FILE]
		const res = await jsonApi('/bo/bs/getFile', json ? json : {});
		return res.data;
	}
	async setFileList(json?:any) { // 파일 리스트등록 [BS_FILE]
		const res = await jsonApi('/bo/bs/setFileList', json ? json : {});
		return res.data;
	}
	async insertFile(formdata:FormData) { // 파일 등록 [BS_FILE]
		const res = await formApi('/bo/bs/insertFile', formdata);
		return res.data;
	}
	async updateFile(formdata:FormData) { // 파일 수정 [BS_FILE]
		const res = await formApi('/bo/bs/updateFile', formdata);
		return res.data;
	}
	async deleteFile(formdata:FormData) { // 파일 삭제 [BS_FILE]
		const res = await formApi('/bo/bs/getFileList', formdata);
		return res.data;
	}
}
export default new CodeService();

