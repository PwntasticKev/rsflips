<template>
  <div>
    <v-data-table
      v-if="loading"
      :headers="headers"
      :items="loading ? skeletonData : pricingData"
      :loading="loading"
    >
      <template v-slot:items>
        <tr>
          <td colspan="3">
            <v-skeleton-loader :rows="5" type="table"></v-skeleton-loader>
          </td>
        </tr>
      </template>
    </v-data-table>
    <price-table
      :key="key"
      @refetch-data="
        getPricingData();
        key + 1;
      "
    ></price-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// eslint-disable-next-line
import PriceTable from '../components/PriceTable';

export default {
  name: 'IndexPage',
  components: {
    PriceTable
  },
  data() {
    return {
      loading: true,
      pricingData: [], // Actual pricing data from API
      skeletonData: Array(5).fill({}), // Skeleton data for loading state
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' }
      ],
      key: 0
    };
  },
  methods: {
    ...mapActions('pricingData', ['getPricingData', 'getMappingData'])
  },
  async asyncData({ store }) {
    await store.dispatch('pricingData/getMappingData');
  },
  async created() {
    await this.getPricingData();
    this.loading = false;
  }
};
</script>
