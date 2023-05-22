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
        ? Math.floor(priceById.high * 0.99 - priceById.low)
        : 0;
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
  venatorFilter: (state, getters) => {
    console.log(getters, 'allitems');
    return getters.allItems
      .filter(
        item =>
          item.name.toLowerCase().includes('venator bow') ||
          item.name.toLowerCase().includes('venator shard')
      )
      .flatMap(item => {
        if (item.name.toLowerCase().includes('venator bow')) {
          const venatorShard = getters.allItems.find(i =>
            i.name.toLowerCase().includes('venator shard')
          );
          const totalPrice = venatorShard.low * 5;
          const adjustedHighPrice = item.high * 0.99;
          const profit = Math.floor(
            adjustedHighPrice - totalPrice
          ).toLocaleString();

          const modifiedItem = {
            ...item,
            id: `${item.id}-SET`,
            name: 'SET PRICE',
            profit
          };

          return [item, modifiedItem];
        }
        return [item];
      });
  },
  justicarFilter: (state, getters) =>
    getters.allItems
      .filter(
        item =>
          item.name.toLowerCase().includes('justiciar legguards') ||
          item.name.toLowerCase().includes('justiciar faceguard') ||
          item.name.toLowerCase().includes('justiciar chestguard') ||
          item.name.toLowerCase().includes('justiciar armour set')
      )
      .flatMap(item => {
        if (item.name.toLowerCase().includes('justiciar armour set')) {
          const faceguard = getters.allItems.find(i =>
            i.name.toLowerCase().includes('justiciar faceguard')
          );
          const chestguard = getters.allItems.find(i =>
            i.name.toLowerCase().includes('justiciar chestguard')
          );
          const legguards = getters.allItems.find(i =>
            i.name.toLowerCase().includes('justiciar legguards')
          );

          const faceguardLow = faceguard.low;
          const chestguardLow = chestguard.low;
          const legguardsLow = legguards.low;

          const adjustedHighPrice = item.high * 0.99;
          const profit = Math.floor(
            adjustedHighPrice - (faceguardLow + chestguardLow + legguardsLow)
          ).toLocaleString();

          const modifiedItem = {
            ...item,
            id: `${item.id}-SET`,
            img: 'https://oldschool.runescape.wiki/images/3/37/Justiciar_armour_set.png?7263b',
            name: 'SET PRICE',
            profit
          };

          return [item, modifiedItem];
        }
        return [item];
      }),
  voidwakerFilter: (state, getters) =>
    getters.allItems
      .filter(
        item =>
          item.name.toLowerCase().includes('Voidwaker blade') ||
          item.name.toLowerCase().includes('Voidwaker hilt') ||
          item.name.toLowerCase().includes('Voidwaker gem') ||
          item.name.toLowerCase().includes('Voidwaker')
      )
      .flatMap(item => {
        if (item.name.toLowerCase().includes('Voidwaker')) {
          const blade = getters.allItems.find(i =>
            i.name.toLowerCase().includes('Voidwaker blade')
          );
          const hilt = getters.allItems.find(i =>
            i.name.toLowerCase().includes('Voidwaker hilt')
          );
          const gem = getters.allItems.find(i =>
            i.name.toLowerCase().includes('Voidwaker gem')
          );

          const bladeLow = blade.low;
          const hiltLow = hilt.low;
          const gemLow = gem.low;

          const adjustedHighPrice = item.high * 0.99;
          const profit = Math.floor(
            adjustedHighPrice - (bladeLow + hiltLow + gemLow)
          ).toLocaleString();

          const modifiedItem = {
            ...item,
            id: `${item.id}-SET`,
            img: 'https://oldschool.runescape.wiki/images/5/5e/Voidwaker.png?7263b',
            name: 'SET PRICE',
            profit
          };

          return [item, modifiedItem];
        }
        return [item];
      })
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
