import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state : () => ({ 
    active: false,
    menuList: JSON.parse(sessionStorage.getItem('menuList') || '[]'),
    companyList: JSON.parse(sessionStorage.getItem('companyList') || '[]'),
    codeList: JSON.parse(sessionStorage.getItem('codeList') || '{}'),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo') || '{}'),
    count: 0,
  }),
	actions: {
    loginSuccess(info:any) {
      if(info && info.token) {
        const userInfo = {
          id: info.id,
          cmpId: info.cmpId,
          cmpNm: info.cmpNm,
          token: info.token,
          nm: info.nm,
        }
        sessionStorage.setItem('menuList', JSON.stringify(info.menuList) || '[]');
        sessionStorage.setItem('companyList', JSON.stringify(info.companyList) || '[]');
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.userInfo = userInfo;
      }
      let groupCodeArr:any = {};
      for(let o of info.codeList) {
        let codeArr:any = [];
        for(let c of o.cdList) {
          codeArr.push({ text: c.cdNm, value: c.cd, dataType: 'string'});
        }
        groupCodeArr[o.grpCd] = codeArr;
      }
      sessionStorage.setItem('codeList', JSON.stringify(groupCodeArr) || '{}');

      this.count = 0;
      
			this.active = true;
			this.menuList = info.menuList;
			this.companyList = info.companyList;
			this.codeList = info.codeList; // 이곳에 안담으면 아래 setTimeout을해도 문제가 생김...
      
      location.href = '/';
		},
    loginFail() {
      this.removeSession();
      this.count++;
    },
    removeSession() {
      sessionStorage.removeItem('menuList');
      sessionStorage.removeItem('companyList');
      sessionStorage.removeItem('codeList');
      sessionStorage.removeItem('userInfo');
			this.active = false;
      this.userInfo = {};
    },
		logout() {
      this.removeSession();
      location.href = '/';
		},
	}
});