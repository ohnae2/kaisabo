import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
  state : () => ({ 
    menu: {
      active: true,
    },
  }),
	actions: {
		menuToggle() {
      this.menu.active = !this.menu.active;
		},
	}
});

