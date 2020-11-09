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
            <div class="md:w-full">
              <span class="font-bold text-lg ">Ride {{ taxiRide.id }}</span>
            </div>
            <div class="md:w-1/3 text-right">
              <span
                class="text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
                >Distance (miles)</span
              >
            </div>
            <div class="md:w-2/3">
              {{ taxiRide.distance }}
            </div>
            <div class="md:w-1/3 text-right">
              <span
                class="text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
                >Start Time</span
              >
            </div>
            <div class="md:w-2/3">
              {{ taxiRide.startTime | formatDate }}
            </div>
            <div class="md:w-1/3 text-right">
              <span
                class="text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
                >Duration ((HH:)mm:ss)</span
              >
            </div>
            <hr />
            <div class="md:w-2/3">
              {{ taxiRide.duration }} seconds
              <span class="text-gray-500"
                >{{ taxiRide.duration | formatDuration }} (HH):mm:ss</span
              >
            </div>
            <div class="md:w-1/3 text-right">
              <span
                class="text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
                >Fare</span
              >
            </div>
            <div class="md:w-2/3">
              {{ taxiRide.taxiFare }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  format as formatDateFns,
  addHours,
  getMinutes,
  getHours,
  getSeconds
} from "date-fns";
import Vue from "vue";

Vue.filter("formatDate", function(value) {
  return formatDateFns(new Date(value), "eee PPP, HH:mm");
});

Vue.filter("formatDuration", function(value) {
  const convertToDuration = secondsAmount => {
    const normalizeTime = time => (time.length === 1 ? `0${time}` : time);

    const SECONDS_TO_MILLISECONDS_COEFF = 1000;
    const MINUTES_IN_HOUR = 60;

    const milliseconds = secondsAmount * SECONDS_TO_MILLISECONDS_COEFF;

    const date = new Date(milliseconds);
    const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR;
    const dateWithoutTimezoneDiff = addHours(date, timezoneDiff);

    const hours = normalizeTime(String(getHours(dateWithoutTimezoneDiff)));
    const minutes = normalizeTime(String(getMinutes(dateWithoutTimezoneDiff)));
    const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)));

    const hoursOutput = hours !== "00" ? `${hours}:` : "";

    return `${hoursOutput}${minutes}:${seconds}`;
  };
  return convertToDuration(value);
});

export default {
  name: "TaxiRides",
  methods: {
    ...mapActions(["fetchTaxiRides"])
  },
  computed: mapGetters(["allTaxiRides"]),
  created() {
    this.fetchTaxiRides();
  }
};
</script>
