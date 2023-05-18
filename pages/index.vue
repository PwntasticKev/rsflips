<template>
  <div>
    <price-table></price-table>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import { mapActions } from 'vuex';
// eslint-disable-next-line
import PriceTable from '../components/PriceTable';

export default {
  name: 'IndexPage',
  components: {
    PriceTable
  },
  methods: {
    ...mapActions('pricingData', ['getPricingData'])
  },
  created() {
    this.getPricingData();
  }
};
</script>
