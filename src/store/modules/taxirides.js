const state = {
  taxiRides: []
};

const getters = {
  allTaxiRides: state => {
    return state.taxiRides;
  }
};

const actions = {
  async fetchTaxiRides({ commit }) {
    const res = await fetch("http://127.0.0.1:5000/", {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert(
            "Server returned " + response.status + " : " + response.statusText
          );
        }
      })
      .then(response => {
        this.result = response.body;
        return response;
      })
      .catch(err => {
        console.log(err);
      });
    console.log(res);

    commit("setTaxiRides", res);
  },
  async addTaxiRide({ commit }, taxiRideInput) {
    const startTime = taxiRideInput.startTime;
    const body = {
      distance: parseFloat(taxiRideInput.distance),
      startTime: startTime,
      duration: parseFloat(taxiRideInput.duration)
    };
    const res = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert(
            "Server returned " + response.status + " : " + response.statusText
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
    commit("addTaxiRide", res.data);
  }
};

const mutations = {
  setTaxiRides: (state, taxiRides) => (state.taxiRides = taxiRides),
  addTaxiRide: (state, newTaxiRide) => state.taxiRides.push(newTaxiRide)
};

export default {
  state,
  getters,
  actions,
  mutations
};
