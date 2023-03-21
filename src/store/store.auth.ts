import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state : () => ({ 
    active: false,
    info: {},
  }),
	actions: {
		logout() {
			this.active = true;
      this.info = {};
		},
    loginSuccess(info:object) {
			this.active = false;
      this.info = info;
		},
    loginFail(info:object) {
      this.info = info;
    },
	}
});