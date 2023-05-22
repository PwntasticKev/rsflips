<template>
  <v-card>
    <v-card-title>
      <v-checkbox v-model="clearFieldOnClick"></v-checkbox>
      <v-text-field
        v-model="search"
        clearable
        label="Search"
        @click="clearFieldOnClick ? (search = '') : null"
      ></v-text-field>
      <v-select
        v-model="filter"
        :items="filterOptions"
        label="Filter"
        outlined
      ></v-select>
    </v-card-title>

    <v-card-text>
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
          <td>
            <v-img :alt="item.name" contain :src="item.img" width="75%" />
          </td>
        </template>
        <template slot="item.high" slot-scope="{ item }">
          <td>{{ item.high.toLocaleString() }}</td>
        </template>
        <template slot="item.low" slot-scope="{ item }">
          <td>{{ item.low.toLocaleString() }}</td>
        </template>
        <template slot="item.profit" slot-scope="{ item }">
          <td>
            <span :style="getProfitClass(item)">
              {{ item.profit.toLocaleString() }}
            </span>
          </td>
        </template>
        <template #top>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on">Columns</v-btn>
            </template>

            <v-card>
              <v-list dense>
                <v-list-item
                  v-for="(column, index) in tableHeaders"
                  :key="index"
                >
                  <v-checkbox
                    v-model="column.visible"
                    :label="column.text"
                  ></v-checkbox>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PriceTable',
  data() {
    return {
      clearFieldOnClick: false,
      filter: '',
      filterOptions: ['All', 'Venator', 'Justicar'],
      paginationOptions: {
        itemsPerPage: 50, // Number of items per page
        page: 1 // Initial page
      },
      search: '',
      tableHeaders: [
        { text: 'ID', value: 'id', visible: true },
        { text: 'Img', value: 'img', visible: true },
        { text: 'Name', value: 'name', visible: true },
        { text: 'Buy Limit', value: 'limit', visible: true },
        { text: 'Buy Price', value: 'low', visible: true },
        { text: 'Sell Price', value: 'high', visible: true },
        { text: 'Profit', value: 'profit', visible: true }
      ]
    };
  },

  computed: {
    ...mapGetters('pricingData', [
      'allItems',
      'venatorFilter',
      'justicarFilter'
    ]),
    filteredItems() {
      if (this.filter === 'Venator') return this.venatorFilter;

      if (this.filter === 'Justicar') return this.justicarFilter;

      return this.allItems.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    getProfitClass(item) {
      const textColor =
        item.profit < 0
          ? this.$vuetify.theme.themes.dark.warning
          : this.$vuetify.theme.themes.dark.primary; // Custom text colors

      return {
        'font-weight': item.profit > 0 ? 'bold' : 'normal',
        color: textColor
      };
    }
  }
};
</script>
