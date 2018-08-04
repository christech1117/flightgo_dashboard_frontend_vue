import axios from 'axios'

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
          .get('https://flightgo-backend-dev.herokuapp.com/chatmessages/room/' + chatRoomId)
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