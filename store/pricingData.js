import axios from 'axios';

const state = {
  pricesById: {},
  mapItems: []
};

const getters = {
  allItems: state =>
    state.mapItems.map(item => {
      const priceById = state.pricesById?.[item.id] || {};
      const profit =
        priceById.high && priceById.low
          ? new Intl.NumberFormat().format(
              Math.floor(priceById.high * 0.99 - priceById.low)
            )
          : 'N/A';
      const low = priceById.low
        ? new Intl.NumberFormat().format(parseInt(priceById.low, 10))
        : 'N/A';
      const high = priceById.high
        ? new Intl.NumberFormat().format(parseInt(priceById.high, 10))
        : 'N/A';

      return {
        ...item,
        ...priceById,
        profit,
        low,
        high,
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
    // qty needs to be rethunk. mayeb an object?
    // example {id: id, qty: 250}
    (itemSet, itemsToCreateSet, conversionCost = 0, qty = {}) => {
      const totalPrice = getters.totalPriceConverted(
        itemSet,
        itemsToCreateSet,
        conversionCost,
        qty
      );
      // item to be converted to.
      const originalItem = getters.allItems.find(item => item.id === itemSet);

      const modifiedItem = getters.getModifiedItem(originalItem, totalPrice);

      return [modifiedItem, ...getters.getItemsById(itemsToCreateSet)];
    },

  getModifiedItem: () => (item, totalPrice) => {
    const highPriceWithoutCommas = item.high
      ? parseInt(item.high.replace(/,/g, ''), 10)
      : 0;
    const formatter = new Intl.NumberFormat();

    return {
      id: 'SET-Price',
      img: `https://oldschool.runescape.wiki/images/c/c1/${item.name.replace(
        /\s+/g,
        '_'
      )}.png?${item.id}b`,
      name: `${item?.name} (set)`,
      high: formatter.format(highPriceWithoutCommas),
      profit: formatter.format(
        Math.floor(highPriceWithoutCommas * 0.99 - totalPrice)
      )
    };
  },

  totalPriceConverted:
    state =>
    (itemSet, itemIds, conversionCost, qty = null) => {
      let total = 0;

      // Calculate qtyItemNoCommas
      const qtyItemLow =
        qty && state.pricesById[qty.id]
          ? String(state.pricesById[qty.id].low).replace(/,/g, '')
          : 0;
      const qtyItemNoCommas = qtyItemLow * (qty && qty.qty ? qty.qty - 1 : 0);

      itemIds.forEach(itemId => {
        const lowPriceNoCommas = String(state.pricesById[itemId]?.low).replace(
          /,/g,
          ''
        );
        // find the item's low price.
        const price = lowPriceNoCommas ? parseInt(lowPriceNoCommas, 10) : 0;

        total += price;
      });

      return total + qtyItemNoCommas + conversionCost;
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

    if (process.client) {
      const storedData = localStorage.getItem('pricingData');
      if (storedData) {
        console.log('theres data stored');
        commit('SET_ITEMS', JSON.parse(storedData));
        return;
      }
    }

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
