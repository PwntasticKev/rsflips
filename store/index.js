import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { cookieUniversalNuxt } from 'cookie-universal-nuxt';
import pricingData from './pricingData';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: process.client ? cookieUniversalNuxt : null, // Use cookie-universal-nuxt on the client-side
  paths: ['modules']
});

const store = () =>
  new Vuex.Store({
    modules: {
      pricingData
    },
    plugins: [vuexLocal.plugin]
  });

export default store;
