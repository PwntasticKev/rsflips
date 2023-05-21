import axios from 'axios';

const state = {
  pricesById: {},
  allItems: []
};

const getters = {
  allItems: state =>
    state.allItems.map(item => {
      const priceById = state.pricesById[item.id] || {}; // Check for undefined
      const profit = priceById.high ? priceById.high * 0.01 - priceById.low : 0; // Check if priceById.high exists
      return {
        ...item,
        ...priceById,
        profit,
        img: `https://oldschool.runescape.wiki/images/c/c1/${item.name.replace(
          /\s+/g,
          '_'
        )}.png?${item.id}b`
      };
    })
};

const mutations = {
  SET_PRICES_BY_ID: (state, items) => {
    state.pricesById = items;
  },
  SET_ITEMS: (state, items) => {
    state.allItems = items;
  }
};

const actions = {
  getPricingData: async ({ commit }) => {
    try {
      // axios.get('https://prices.runescape.wiki/api/v1/osrs/mapping'),
      const { data } = await axios.get(
        'https://prices.runescape.wiki/api/v1/osrs/latest'
      );

      commit('SET_PRICES_BY_ID', data.data);
    } catch (error) {
      console.error('Error fetching Pricing data:', error);
      // Handle the error case
    }
  },
  getMappingData: async ({ commit }) => {
    try {
      const { data } = await axios.get(
        'https://prices.runescape.wiki/api/v1/osrs/mapping'
      );

      commit('SET_ITEMS', data);
    } catch (error) {
      console.error('Error fetching Pricing data:', error);
      // Handle the error case
    }
  }
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
