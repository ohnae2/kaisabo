import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getFileInformationList(json?:any) { // 파일정보 리스트 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/getFileInformationList', json ? json : {});
		return res.data;
	}
	async getFileInformation(json?:any) { // 파일정보 상세조회 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/getFileInformation', json ? json : {});
		return res.data;
	}
	async setFileInformationList(json?:any) { // 파일정보 리스트등록 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/setFileInformationList', json ? json : {});
		return res.data;
	}
	async insertFileInformation(formdata:FormData) { // 파일정보 등록 [BS_FILE_INFO]
		const res = await formApi('/bo/bs/insertFileInformation', formdata);
		return res.data;
	}
	async updateFileInformation(formdata:FormData) { // 파일정보 수정 [BS_FILE_INFO]
		const res = await formApi('/bo/bs/updateFileInformation', formdata);
		return res.data;
	}
	async deleteFileInformation(formdata:FormData) { // 파일정보 삭제 [BS_FILE_INFO]
		const res = await formApi('/bo/bs/getFileInformationList', formdata);
		return res.data;
	}
}
export default new CodeService();

