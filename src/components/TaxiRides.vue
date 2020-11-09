<template>
  <div>
    <h1 class="text-4xl font-bold">Taxi Fares</h1>
    <div class="taxi-fares bg-blue w-full p-8 flex font-sans">
      <div class="rounded p-2 w-full">
        <div class="flex flex-col bg-grey-light py-1">
          <div
            v-for="taxiRide in allTaxiRides"
            class="taxi-fares bg-white p-2 rounded m-1 border-b border-grey hover:bg-grey-lighter flex flex-wrap"
            v-bind:key="taxiRide.key"
          >
            <Ride taxiRide="taxiRide"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Ride from "./Ride"

export default {
  name: "TaxiRides",
  components:{Ride},
  methods: {
    ...mapActions(["fetchTaxiRides"])
  },
  computed: mapGetters(["allTaxiRides"]),
  created() {
    this.fetchTaxiRides();
  }
};
</script>
