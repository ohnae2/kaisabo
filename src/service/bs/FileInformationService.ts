import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CodeService {
	async getFileInformationList(json?:any) { // 파일정보 리스트 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/getFileInformationList', JSON.parse(json));
		return res.data;
	}
	async getFileInformation(json?:any) { // 파일정보 상세조회 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/getFileInformation', JSON.parse(json));
		return res.data;
	}
	async setFileInformationList(json?:any) { // 파일정보 리스트등록 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/setFileInformationList', JSON.parse(json));
		return res.data;
	}
	async insertFileInformation(json?:any) { // 파일정보 등록 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/insertFileInformation', JSON.parse(json));
		return res.data;
	}
	async updateFileInformation(json?:any) { // 파일정보 수정 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/updateFileInformation', JSON.parse(json));
		return res.data;
	}
	async deleteFileInformation(json?:any) { // 파일정보 삭제 [BS_FILE_INFO]
		const res = await jsonApi('/bo/bs/getFileInformationList', JSON.parse(json));
		return res.data;
	}
}
export default new CodeService();

