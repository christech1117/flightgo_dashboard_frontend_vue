import axios from 'axios'
// const server = require('../../config.js').restServer
const server = 'https://www.flightgoai-service.com:9101'
const socket = {
  state: {
    socket: '',
    customerInfo: '',
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
    messages: {}
  },
  mutations: {
    setGetSocket(state, data) {
      state.socket = data
    },
    setCustomerInfo(state, data) {
      state.customerInfo = JSON.parse(data).user
    },
    addRoomDetailInfos(state, data) {
      state.roomdetail.chatRoomId = data.chatRoomId
      state.messages[data.chatRoomId].push(data)
    },
    setRoomDetailInfos(state, chatRoomId) {
      state.messages[chatRoomId] = []
    },
    setUsers(state, data) {
      state.roomdetail.users = data
    },
    setMessHistoryInfos(state, data) {
      state.messhistory.infos = data
    },
  },
  actions: {
    GetMessHistory({
      commit
    }, chatRoomId) {
      return new Promise(resolve => {
        axios
          .get(server + '/chatmessages/room/' + chatRoomId)
          .then((response) => {
            const data = response.data
            commit('setMessHistoryInfos', data)
            resolve()
          })
      })
    }
  }
}
export default socket
