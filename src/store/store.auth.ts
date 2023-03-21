import { defineStore } from 'pinia';


export const useAuthStore = defineStore('auth', {
  state : () => ({ 
    active: false,
    info: JSON.parse(sessionStorage.getItem('userInfo') || '{}'),
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
        sessionStorage.setItem('codeList', JSON.stringify(info.codeList) || '{}');
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        sessionStorage.setItem('token', info.token);
      }
      this.info = info;
      this.count = 0;
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
      this.info = {};
    },
		logout() {
      this.removeSession();
      location.href = '/';
		},
	}
});