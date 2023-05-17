import Vue from 'vue';
import Vuex from 'vuex';

import VuexPersistence from 'vuex-persist';
// import module from './module';

// For persisted store key
// const { searchParams } = new URL(window.location.href);
// const token = searchParams.get('t') || 'NO-TOKEN';

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  // key: `vuex-${token}`,
  storage: window.sessionStorage,
  modules: ['module'] // only save 'moduleName' module
});

export default new Vuex.Store({
  modules: {
    module
  },
  plugins: [vuexLocal.plugin],
  strict: true
});
