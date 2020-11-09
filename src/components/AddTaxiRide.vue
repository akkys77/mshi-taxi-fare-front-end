<template>
  <div>
    <div class="bg-blue w-full p-8 flex font-sans">
      <div
        class="bg-white p-2 rounded m-1 border-b border-grey cursor-pointer hover:bg-grey-lighter"
      >
        <form class="flex w-full" @submit="onSubmit">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="md:w-1/3 py-1">
              <label
                class="block text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
                for="distance"
              >
                Distance
              </label>
            </div>
            <div class="md:w-2/3 py-1">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-auto py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="distance"
                type="text"
                v-model="distance"
                placeholder="Add distance in miles"
              />
            </div>
            <div class="md:w-1/3 py-1">
              <label
                class="block text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
                for="startTime"
              >
                Start Time
              </label>
            </div>
            <div class="md:w-2/3 py-1">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-auto py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="startTime"
                type="datetime-local"
                v-model="startTime"
              />
            </div>
            <div class="md:w-1/3 py-1">
              <label
                class="block text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4"
                for="duration"
              >
                Duration
              </label>
            </div>
            <div class="md:w-2/3 py-1">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-auto py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="duration"
                type="text"
                v-model="duration"
                placeholder="Add duration in seconds"
              />
            </div>
            <div class="md:w-1/3 py-1"></div>
            <div class="md:w-2/3 py-1">
              <input
                type="submit"
                value="Add a ride..."
                class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTaxiRide",
  data() {
    return {
      id: "",
      distance: "",
      startTime: "",
      duration: "",
      taxiFare: ""
    };
  },
  methods: {
    ...mapActions(["addTaxiRide"]),
    onSubmit(event) {
      event.preventDefault();
      this.addTaxiRide({
        id: this.id,
        distance: this.distance,
        startTime: this.startTime,
        duration: this.duration
      });
      this.id = this.id + 1;
      this.distance = "";
      this.startTime = new Date();
      this.duration = 0;
    }
  }
};
</script>
