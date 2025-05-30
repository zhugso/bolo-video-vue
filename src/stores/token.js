import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useTokenStore = defineStore('token', () => {
  // const token = ref('');
  const getToken = computed(() => {
    // return token.value === '' ? window.localStorage.getItem('token') : token.value;
    return window.localStorage.getItem('token');
  });
  function setToken(tk) {
    // token.value = tk;
    if (tk === '') {
      window.localStorage.removeItem('token');
    } else {
      window.localStorage.setItem('token', tk);
    }
  }
  return { getToken, setToken };
});
