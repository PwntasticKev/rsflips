<template>
  <div>
    <v-tooltip bottom class="bottom-right-tooltip" fixed right>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          :disabled="loading"
          fab
          :loading="loading"
          v-on="on"
          @click="debouncedClick"
        >
          <v-progress-circular
            v-if="loading"
            color="white"
            indeterminate
            size="28"
          ></v-progress-circular>
          <v-icon v-else>mdi-refresh</v-icon>
        </v-btn>
      </template>
      <span>Reload Data</span>
      <!-- Tooltip content -->
    </v-tooltip>
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

        <v-snackbar
          v-model="showSnackbar"
          bottom
          color="success"
          :timeout="snackbarTimeout"
        >
          Data has been refetched ( every 3 minutes )
        </v-snackbar>
      </v-card-title>

      <v-data-table
        :footer-props="{
          'items-per-page-options': [10, 30, 50, 100, 200]
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { debounce } from 'lodash';
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
        itemsPerPage: 200, // Number of items per page
        page: 1 // Initial page
      },
      loading: false,
      search: '',
      showSnackbar: false,
      snackbarTimeout: 3000,
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
    ...mapActions('pricingData', ['getPricingData', 'getMappingData']),

    debouncedClick: debounce(() => {
      // Perform your asynchronous task here
      this.loading = true;
      this.$emit('refetch-data');

      // Simulate an asynchronous task
      // Replace this with your actual task logic
      new Promise(resolve => {
        setTimeout(() => {
          // Task completed
          resolve();
        }, 2000); // Simulating a 2-second delay
      }).then(() => {
        this.loading = false;
        this.showSnackbar = true;
      });
    }, 200),

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
  },
  async created() {
    this.interval = setInterval(() => {
      this.getPricingData();
      this.showSnackbar = true;
    }, 180000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="scss">
.bottom-right-tooltip {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
