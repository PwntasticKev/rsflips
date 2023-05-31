<template>
  <div>
    <price-table @refetch-data="getPricingData()"></price-table>
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
  methods: {
    ...mapActions('pricingData', ['getPricingData', 'getMappingData'])
  },
  async asyncData({ store }) {
    await store.dispatch('pricingData/getPricingData');
    await store.dispatch('pricingData/getMappingData');
  },
  async created() {
    this.interval = setInterval(() => {
      this.getPricingData();
    }, 600000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
