import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state : () => ({ 
    active: false,
    menuList: JSON.parse(sessionStorage.getItem('menuList') || '[]'),
    codeList: JSON.parse(sessionStorage.getItem('codeList') || '{}'),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo') || '{}'),
    count: 0,
  }),
	actions: {
    loginSuccess(info:any) {
			this.active = true;
      if(info && info.token) {
        const userInfo = {
          id: info.id,
          cmpId: info.cmpId,
          cmpNm: info.cmpNm,
          nm: info.nm,
        }
        sessionStorage.setItem('menuList', JSON.stringify(info.menuList) || '{}');
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        sessionStorage.setItem('token', info.token);
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

      this.userInfo = info;
      this.count = 0;
      
      setTimeout(function(){
        location.href = '/';
      }, 500);
		},
    loginFail() {
      this.removeSession();
      this.count++;
    },
    removeSession() {
      sessionStorage.removeItem('menuList');
      sessionStorage.removeItem('codeList');
      sessionStorage.removeItem('userInfo');
      sessionStorage.removeItem('token');
			this.active = false;
      this.userInfo = {};
    },
		logout() {
      this.removeSession();
      location.href = '/';
		},
	}
});