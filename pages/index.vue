<template>
  <div>
    <price-table></price-table>
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
  created() {
    this.getPricingData();
    this.getMappingData();
  }
};
</script>
