<template>
  <div>
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
      key: 0
    };
  },
  methods: {
    ...mapActions('pricingData', ['getPricingData', 'getMappingData'])
  },
  async asyncData({ store }) {
    await store.dispatch('pricingData/getMappingData');
    await store.dispatch('pricingData/getPricingData');
  },
  async created() {
    this.interval = setInterval(() => {
      this.getPricingData();
    }, 180000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
