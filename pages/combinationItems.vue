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
        @click="search = ''"
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
        <template slot="item.name" slot-scope="{ item }">
          <td class="py-2">{{ item.name }}</td>
        </template>
        <template slot="item.pieces" slot-scope="{ item }">
          <template>
            <td v-for="piece in item.pieces" :key="piece.name" class="py-2">
              {{ piece.name }} - {{ piece.low }}
              <!--              <br />-->
            </td>
          </template>
        </template>
        <template slot="item.high" slot-scope="{ item }">
          <td>{{ item.high }}</td>
        </template>
        <template slot="item.low" slot-scope="{ item }">
          <td>{{ item.low }}</td>
        </template>
        <template slot="item.profit" slot-scope="{ item }">
          <td>
            <span :style="getProfitClass(item)">{{ item.profit }}</span>
          </td>
        </template>
        <template #top>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on">Columns</v-btn>
            </template>

            <v-card>
              <v-list dense>
                <v-list-item v-for="column in tableHeaders" :key="column.text">
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
      paginationOptions: {
        itemsPerPage: 30, // Number of items per page
        page: 1 // Initial page
      },
      search: '',
      tableHeaders: [
        { text: 'ID', value: 'id', visible: true },
        { text: 'Img', value: 'img', visible: false },
        { text: 'Name', value: 'name', visible: true },
        { text: 'Pieces', value: 'pieces', visible: true },
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
      const combinedItems = [
        ...this.getItemSetProfit(27612, [27614], 0, 5),
        ...this.getItemSetProfit(22438, [22327, 22326, 22328]),
        ...this.getItemSetProfit(27690, [27681, 27687, 27684], 500000),
        ...this.getItemSetProfit(22978, [22966, 11889]),
        ...this.getItemSetProfit(21006, [21043, 6914]),
        ...this.getItemSetProfit(24488, [24419, 24420, 24421]),
        ...this.getItemSetProfit(21049, [21018, 21021, 21024]),
        ...this.getItemSetProfit(11924, [11931, 11932, 11933]),
        ...this.getItemSetProfit(22003, [22006, 1540]),
        ...this.getItemSetProfit(22003, [11286, 1540]),
        ...this.getItemSetProfit(13271, [13265, 5940]),
        ...this.getItemSetProfit(12902, [11791, 12932])
      ];

      console.log(combinedItems);

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
          : this.$vuetify.theme.themes.dark.primary; // Custom text colors

      return {
        'font-weight': 'bold',
        color: textColor
      };
    }
  }
};
</script>
