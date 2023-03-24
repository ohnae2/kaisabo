import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
  state : () => ({ 
    menu: {
      active: true,
    },
    hash: location.hash.replace('#',''),
    tab: {
      idx: -1,
    },
    favList : <any>(JSON.parse(localStorage.getItem('favList') || '[]')),
  }),
	actions: {
		toggleMenu() {
      this.menu.active = !this.menu.active;
		},
	},
  
});

