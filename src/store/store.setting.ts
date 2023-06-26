import { defineStore } from 'pinia';
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const settings = cookies.get('settings');

export const useSettingStore = defineStore('setting', {
  state: () => (settings ? settings : {
    menu: {
      active: false,
    },
    hash: location.hash.replace("#", ''),
    tab: {
      idx: -1,
    },
    favList: [],
  } as any),
  actions: {
    setState() {
      cookies.set('settings', JSON.stringify(this) || '{}');
    },
  },
});

