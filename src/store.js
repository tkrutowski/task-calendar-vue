import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false
    },

    getters: {
        isLoading(state) {
            return !!state.loading;
        }
    },

    mutations: {
        ENABLE_LOADING(state) {
            state.loading = true;
            console.log("enabled");
        },
        DISABLE_LOADING(state) {
            state.loading = false;
            console.log("disabled");
        }
    },

    actions: {
        setLoading(context, payload) {
            if (payload) {
                context.commit("ENABLE_LOADING");
            } else {
                context.commit("DISABLE_LOADING");
            }
        }
    }
});
