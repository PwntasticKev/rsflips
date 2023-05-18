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

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="showDetails(item)">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PriceTable',
  data() {
    return {
      clearFieldOnClick: false,
      items: [],
      filter: '',
      filterOptions: ['All', 'Venator'],
      paginationOptions: {
        itemsPerPage: 10, // Number of items per page
        page: 1 // Initial page
      },
      search: '',
      tableHeaders: [
        { text: 'ID', value: 'id', visible: true },
        { text: 'Name', value: 'name', visible: true },
        { text: 'Buy Limit', value: 'limit', visible: true },
        { text: 'Buy Price', value: 'buyPrice', visible: true },
        { text: 'Sell Price', value: 'sellPrice', visible: true },
        {
          text: 'Most Recent Purchase',
          value: 'mostRecentPurchase',
          visible: true
        },
        { text: 'Margin', value: 'margin', visible: true },
        { text: 'Daily Volume', value: 'dailyVolume', visible: true },
        { text: 'Potential Profit', value: 'potentialProfit', visible: true },
        { text: 'Actions', value: 'actions', visible: true }
      ]
    };
  },

  computed: {
    filteredItems() {
      if (this.filter === 'Venator') {
        return this.items.filter(
          item =>
            item.name.toLowerCase().includes('venator bow') ||
            item.name.toLowerCase().includes('venator shard')
        );
      }
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    showDetails(item) {
      // Handle showing details for the selected item
      console.log('Showing details for:', item);
    }
  },
  mounted() {}
};
</script>
