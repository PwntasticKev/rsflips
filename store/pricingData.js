import axios from 'axios';

const state = {
  pricesById: {},
  mapItems: []
};

const getters = {
  allItems: state =>
    state.mapItems.map(item => {
      const priceById = state.pricesById[item.id] || {};

      const profit = priceById.high
        ? Math.floor(priceById.high * 0.99 - priceById.low).toLocaleString()
        : 0;
      priceById.low = parseInt(priceById?.low, 10).toLocaleString();
      priceById.high = parseInt(priceById?.high, 10).toLocaleString();
      return {
        ...item,
        ...priceById,
        profit,
        img: `https://oldschool.runescape.wiki/images/c/c1/${item.name.replace(
          /\s+/g,
          '_'
        )}.png?${item.id}b`
      };
    }),

  getItemsById: (state, getters) => itemIds =>
    itemIds.map(itemId => getters.allItems.find(item => item.id === itemId)),

  getItemSetProfit:
    (state, getters) =>
    (itemSet, itemsToCreateSet, conversionCost = 0, qty = null) => {
      const totalPrice = getters.totalPriceConverted(
        itemSet,
        itemsToCreateSet,
        conversionCost,
        qty
      );

      const originalItem = getters.allItems.find(item => item.id === itemSet);

      const modifiedItem = getters.getModifiedItem(originalItem, totalPrice);

      return [modifiedItem, ...getters.getItemsById(itemsToCreateSet)];
    },

  getModifiedItem: () => (item, totalPrice) => {
    const highPriceWithoutCommas = parseInt(item.high.replace(/,/g, ''), 10);
    return {
      id: 'SET-Price',
      img: `https://oldschool.runescape.wiki/images/c/c1/${item.name.replace(
        /\s+/g,
        '_'
      )}.png?${item.id}b`,
      name: `${item.name} (set)`,
      high: item.high,
      profit: Math.floor(
        highPriceWithoutCommas * 0.99 - totalPrice
      ).toLocaleString()
    };
  },

  totalPriceConverted: state => (itemSet, itemIds, conversionCost, qty) => {
    let total = 0;
    itemIds.forEach(itemId => {
      const lowPriceWithoutCommas = state.pricesById[itemId].low.replace(
        /,/g,
        ''
      );
      const price = qty ? lowPriceWithoutCommas * qty : lowPriceWithoutCommas;

      total += parseInt(price, 10);
    });

    return (total += conversionCost);
  }
};

const mutations = {
  SET_PRICES_BY_ID: (state, items) => {
    state.pricesById = items;
  },
  SET_ITEMS: (state, items) => {
    state.mapItems = items;
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
    }
  },
  async getMappingData({ state, commit }) {
    if (state.mapItems.length > 0) return;

    try {
      const { data } = await axios.get(
        'https://prices.runescape.wiki/api/v1/osrs/mapping'
      );

      commit('SET_ITEMS', data);
    } catch (error) {
      console.error('Error fetching Pricing data:', error);
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
