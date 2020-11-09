<template>
  <div class="md:w-full" :class="computedBackground" v-on:click="alert()">
    <div class="flex flex-wrap">
      <span class="md:w-full font-bold text-lg"
        >Ride {{ taxiRide.id }} <span v-if="clicked">Clicked</span></span
      >
      <div class="md:w-1/3 text-right">
        <span class="text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
          >Distance</span
        >
      </div>
      <div class="md:w-2/3">
        {{ taxiRide.distance }} miles
      </div>
      <div class="md:w-1/3 text-right">
        <span class="text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
          >Start Time</span
        >
      </div>
      <div class="md:w-2/3">
        {{ taxiRide.startTime | formatDate }}
      </div>
      <div class="md:w-1/3 text-right">
        <span class="text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
          >Duration</span
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
        <span class="text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
          >Fare</span
        >
      </div>
      <div class="md:w-2/3">{{ taxiRide.taxiFare }} $</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  format as formatDateFns,
  addHours,
  addSeconds,
  getMinutes,
  getHours,
  getSeconds,
} from "date-fns";
Vue.filter("formatDate", function(value) {
  return formatDateFns(new Date(value), "eee PPP, HH:mm:ss");
});

const convertToDuration = (secondsAmount) => {
  const normalizeTime = (time) => (time.length === 1 ? `0${time}` : time);

  const SECONDS_TO_MILLISECONDS_COEFF = 1000;
  const MINUTES_IN_HOUR = 60;

  const milliseconds = secondsAmount * SECONDS_TO_MILLISECONDS_COEFF;

  const date = new Date(milliseconds);
  const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR;
  const dateWithoutTimezoneDiff = addHours(date, timezoneDiff);

  const hours = normalizeTime(String(getHours(dateWithoutTimezoneDiff)));
  const minutes = normalizeTime(String(getMinutes(dateWithoutTimezoneDiff)));
  const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)));

  // const hoursOutput = hours !== "00" ? `${hours}:` : "";

  return `${hours}:${minutes}:${seconds}`;
};
Vue.filter("formatDuration", function(value) {
  return convertToDuration(value);
});

export default {
  name: "Ride",
  data: function() {
    return { clicked: false };
  },
  props: ["taxiRide"],
  methods: {
    alert: function() {
      this.clicked = true;
      alert(
        `Duration: ${convertToDuration(
          this.taxiRide.duration
        )}, End time: ${addSeconds(
          new Date(this.taxiRide.startTime),
          this.taxiRide.duration
        )} `
      );
    },
  },
  computed: {
    computedBackground() {
      let className = "bg-grey-200";
      if (this.taxiRide.distance > 2) className = "bg-red-600";
      return className;
    },
  },
};
</script>
