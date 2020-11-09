<template>
  <div id="app">
    <TaxiRides />
    <AddTaxiRide />
  </div>
</template>

<script>
import TaxiRides from "./components/TaxiRides";
import AddTaxiRide from "./components/AddTaxiRide";

export default {
  name: "App",
  components: {
    TaxiRides,
    AddTaxiRide
  },
  data: function() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="postcss">
body {
  @apply bg-blue-800 flex justify-center content-center items-center;
}
#app {
  @apply rounded bg-gray-200 p-8 border border-blue-900 shadow-md flex flex-col flex-grow;
  min-width: 320px;
  max-width: 800px;
}
</style>
