import Vue from 'vue'
import Vuex from 'vuex'

import _ from 'lodash'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        showWelcome: true,
        searchWordArr: localStorage.searchWords ? JSON.parse(localStorage.searchWords) : [],
        songs: [],
        song: null,
        lyricArr: [],
        lrcTimeArr: [],
        lrcMarginTop:0,
        playing:false
    },
    getters: {
        
    },
    actions: {
        FETCH_SONG_LIST(context, options) {
            
            return "";
        }
        
    },
    mutations: {
        hideWelcome(state) {
            state.showWelcome = false;
        }
    }

});


export default store
