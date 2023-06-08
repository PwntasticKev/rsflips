import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { cookieUniversalNuxt } from 'cookie-universal-nuxt';
import pricingData from './pricingData';
import users from './users';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: process.client ? cookieUniversalNuxt : null,
  modules: ['pricingData'], // Specify the 'pricingData' module
  reducer: state => ({
    pricingData: {
      mapItems: state.pricingData.mapItems // Only persist the 'mapItems' property from the 'pricingData' module
    }
  })
});

const store = () =>
  new Vuex.Store({
    modules: {
      pricingData,
      users
    },
    plugins: [vuexLocal.plugin]
  });

export default store;
