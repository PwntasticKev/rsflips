<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :rows="5"
      type="table"
    ></v-skeleton-loader>
    <price-table
      v-else
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
  computed: {
    ...mapActions('users', ['loadUsers'])
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

    // this.$store.dispatch('users/loadUsers', this.$fire);
  }
};
</script>
