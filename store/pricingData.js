import axios from 'axios';

const state = {
  pricesById: {},
  mapItems: []
};

const getters = {
  allItems: state =>
    state.mapItems.map(item => {
      const priceById = state.pricesById[item.id] || {};
      console.log(priceById, 'priceByIdpriceByIdpriceById');

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
  venatorFilter: (state, getters) => {
    const venatorBowItems = getters.allItems.filter(
      item =>
        item.name.toLowerCase().includes('venator bow') ||
        item.name.toLowerCase().includes('venator shard')
    );

    return venatorBowItems.flatMap(item => {
      if (item.name.toLowerCase().includes('venator bow')) {
        const venatorShard = getters.allItems.find(i =>
          i.name.toLowerCase().includes('venator shard')
        );
        const totalPrice = venatorShard ? venatorShard.low * 5 : 0;
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
  voidwakerFilter: (state, getters) => {
    const voidwakerItems = getters.allItems.filter(
      item =>
        item.name.toLowerCase().includes('voidwaker') ||
        item.name.toLowerCase().includes('voidwaker blade') ||
        item.name.toLowerCase().includes('voidwaker hilt') ||
        item.name.toLowerCase().includes('voidwaker gem')
    );

    const blade = getters.allItems.find(i =>
      i.name.toLowerCase().includes('voidwaker blade')
    );
    const hilt = getters.allItems.find(i =>
      i.name.toLowerCase().includes('voidwaker hilt')
    );
    const gem = getters.allItems.find(i =>
      i.name.toLowerCase().includes('voidwaker gem')
    );
    const voidwaker = getters.allItems.find(i =>
      i.name.toLowerCase().includes('voidwaker')
    );

    const bladeLow = blade ? blade.low : 0;
    const hiltLow = hilt ? hilt.low : 0;
    const gemLow = gem ? gem.low : 0;

    const totalPrice = bladeLow + hiltLow + gemLow + 500000;

    const modifiedItem = {
      ...voidwaker,
      id: 'voidwaker-set',
      img: 'https://oldschool.runescape.wiki/images/5/5e/Voidwaker.png?7263b',
      name: 'Voidwaker (set)',
      profit: (voidwakerItems[0].high * 0.99 - totalPrice).toLocaleString()
    };

    return [...voidwakerItems, modifiedItem];
  },
  dragonHunterLance: (state, getters) => {
    const lanceItems = getters.allItems.filter(
      item =>
        item.name.toLowerCase().includes('Dragon hunter lance') ||
        item.name.toLowerCase().includes(`hydra's claw`) ||
        item.name.toLowerCase().includes('zamorakian hasta')
    );

    const claw = getters.allItems.find(i =>
      i.name.toLowerCase().includes(`hydra's claw`)
    );
    const hasta = getters.allItems.find(i =>
      i.name.toLowerCase().includes('zamorakian hasta')
    );
    const lance = getters.allItems.find(i =>
      i.name.toLowerCase().includes('Dragon hunter lance')
    );

    const clawLow = claw ? claw.low : 0;
    const hastaLow = hasta ? hasta.low : 0;

    const totalPrice = clawLow + hastaLow;

    const modifiedItem = {
      ...lance,
      id: 'lance-set',
      img: 'https://oldschool.runescape.wiki/images/c/c1/Dragon_hunter_lance.png?22978b',
      name: 'Dragon Hunter Lance (set)',
      profit: (lanceItems[0].high * 0.99 - totalPrice).toLocaleString()
    };

    return [...lanceItems, modifiedItem];
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
