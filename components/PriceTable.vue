<template>
  <v-card>
    <v-card-title>
      <v-checkbox v-model="clearFieldOnClick"></v-checkbox>
      <v-text-field
        v-model="search"
        clearable
        label="Search"
        @click="
          searchOnClick ? (search = '') : null;
          filter = 'All';
        "
      ></v-text-field>
      <v-select
        v-model="chooseFilter"
        :items="filterOptions"
        label="Filter"
        outlined
        @click="search = ''"
      ></v-select>
      <v-btn
        color="primary"
        :disabled="loading"
        fab
        :loading="loading"
        small
        @click="$emit('refetch-data')"
      >
        <v-progress-circular
          v-if="loading"
          color="white"
          indeterminate
          size="24"
        ></v-progress-circular>
        <v-icon v-else>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-data-table
      :footer-props="{
        'items-per-page-options': [10, 30, 50, 100]
      }"
      :headers="tableHeaders"
      :items="filteredItems"
      :options="paginationOptions"
      :search="search"
    >
      <!--        https://oldschool.runescape.wiki/images/f/fc/A_powdered_wig.png?7263b-->
      <template slot="item.img" slot-scope="{ item }">
        <td class="py-2">
          <v-img
            :alt="`Flipping item- ${item.id}`"
            aspect-ratio="1"
            contain
            :src="item.img"
            width="70%"
          />
        </td>
      </template>
      <template slot="item.high" slot-scope="{ item }">
        <td>{{ item.high }}</td>
      </template>
      <template slot="item.low" slot-scope="{ item }">
        <td>{{ item.low }}</td>
      </template>
      <template slot="item.profit" slot-scope="{ item }">
        <td>
          <span :style="getProfitClass(item)">
            {{ item.profit }}
          </span>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line
import Filters from './filters';

export default {
  name: 'PriceTable',
  data() {
    return {
      searchOnClick: null,
      filter: '',
      filterOptions: Filters.filterOptions,
      paginationOptions: {
        itemsPerPage: 30, // Number of items per page
        page: 1 // Initial page
      },
      loading: false,
      search: '',
      tableHeaders: [
        { text: 'ID', value: 'id', visible: true },
        { text: 'Img', value: 'img', visible: false },
        { text: 'Name', value: 'name', visible: true },
        { text: 'Buy Limit', value: 'limit', visible: true },
        { text: 'Buy Price', value: 'low', visible: true },
        { text: 'Sell Price', value: 'high', visible: true },
        { text: 'Profit', value: 'profit', visible: true }
      ]
    };
  },

  computed: {
    ...mapGetters('pricingData', ['allItems', 'getItemSetProfit']),

    chooseFilter: {
      get() {
        return this.filter;
      },
      set(v) {
        if (process.client) {
          localStorage.setItem('filterSelected', JSON.stringify(v));
          this.filter = v;
        }
      }
    },
    clearFieldOnClick: {
      get() {
        return this.searchOnClick;
      },
      set(v) {
        if (process.client) {
          localStorage.setItem('clearSearchOnClick', JSON.stringify(v));
          this.searchOnClick = v;
        }
      }
    },

    filteredItems() {
      if (this.filter && this.filter !== 'All') {
        return Filters.filteredItems(
          this.filter,
          this.search,
          this.getItemSetProfit
        );
      }

      return this.allItems.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    getProfitClass(item) {
      const textColor =
        `${item?.profit}`.replace(/,/g, '') < 0
          ? this.$vuetify.theme.themes.dark.warning
          : this.$vuetify.theme.themes.dark.success; // Custom text colors

      return {
        'font-weight': 'bold',
        color: textColor
      };
    }
  },
  mounted() {
    if (process.client) {
      const searchOption = localStorage.getItem('clearSearchOnClick');
      const filterOption = localStorage.getItem('filterSelected');
      if (JSON.parse(searchOption))
        this.searchOnClick = JSON.parse(searchOption);

      if (JSON.parse(filterOption)) this.filter = JSON.parse(filterOption);
    }
  }
};
</script>
