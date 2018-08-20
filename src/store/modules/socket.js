import axios from 'axios'
const server = require('../../../vue.config.js').server
const socket = {
  state: {
    socket: '',
    // 歷史紀錄
    messhistory: {
      infos: [],
      allmessage: []
    },
    // 房間訊息
    roomdetail: {
      id: '',
      users: {},
      infos: []
    },
    // 是否開啟tab
    istab: false
  },
   mutations: {
    setGetSocket (state, data) {
      state.socket = data
    },
    addRoomDetailInfos(state, data) {
      state.roomdetail.infos.push(data)
    },
    setRoomDetailInfos(state) {
      state.roomdetail.infos = []
    },
    setUsers(state, data) {
      state.roomdetail.users = data
    },
    setMessHistoryInfos(state, data) {
      state.messhistory.infos = data
    },
  },
   actions: {
    getMessHistory({ commit }, chatRoomId) {
      return new Promise(resolve => {
        axios
          .get(server + '/chatmessages/room/' + chatRoomId)
          .then((response) => {
            const data = response.data
            console.log(data)
             commit('setMessHistoryInfos', data)
            resolve()
        })
      })
    }
  }
}
export default socket