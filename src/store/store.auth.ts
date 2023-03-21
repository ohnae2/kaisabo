import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state : () => ({ 
    active: false,
    info: {},
    count: 0,
  }),
	actions: {
		logout() {
      sessionStorage.removeItem('userInfo');
			this.active = false;
      this.info = {};
		},
    loginSuccess(info:any) {
			this.active = true;
      if(info && info.token) {
        sessionStorage.setItem('userInfo', JSON.stringify(info) || '{}');
      }
      this.info = info;
      this.count = 0;
		},
    loginFail() {
      sessionStorage.removeItem('userInfo');
			this.active = false;
      this.info = {};
      this.count++;
    },
	}
});