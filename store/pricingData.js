import { $axios } from '@nuxtjs/axios';

export default {
  state: {
    items: []
  },
  getters: {
    getItems: state => state.items
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    }
  },
  actions: {
    async getPricingData({ commit }) {
      console.log('hitting the pricing data for data');
      try {
        const [mappingResponse, latestResponse] = await Promise.all([
          $axios.get('https://prices.runescape.wiki/api/v1/osrs/mapping'),
          $axios.get('https://prices.runescape.wiki/api/v1/osrs/latest')
        ]);

        const mappingData = mappingResponse.data;
        const latestData = latestResponse.data;

        if (Array.isArray(latestData.testData)) {
          const items = mappingData.map(item => {
            const matchingItem = latestData.testData.find(
              latestItem => latestItem.id === item.id
            );
            return {
              ...item,
              ...(matchingItem || {})
            };
          });
          commit('SET_ITEMS', items);
        } else console.error('testData is not an array:', latestData.testData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
