<template>
  <v-card>
    <v-card-title>
      <v-checkbox v-model="clearFieldOnClick"></v-checkbox>
      <v-text-field
        v-model="search"
        clearable
        label="Search"
        @click="
          clearFieldOnClick ? (search = '') : null;
          filter = 'All';
        "
      ></v-text-field>
      <v-select
        v-model="filter"
        :items="filterOptions"
        label="Filter"
        outlined
        @click="search = ''"
      ></v-select>
    </v-card-title>

    <v-card-text>
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
        <v-icon v-else>mdi-check</v-icon>
      </v-btn>
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
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line
import { filteredItems, filterOptions } from './filters';

export default {
  name: 'PriceTable',
  data() {
    return {
      clearFieldOnClick: false,
      filter: '',
      filterOptions,
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
    filteredItems() {
      // if (typeof window !== 'undefined')
      //   window.localStorage.setItem('filter', this.filter);
      if (this.filter && this.filter !== 'All')
        return filteredItems(this.filter, this.search, this.getItemSetProfit);

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
  created() {
    // if (typeof window !== 'undefined') {
    //   const filter = window.localStorage.getItem('filter');
    //   this.filter = filter;
    // }
  }
};
</script>
