import axios from 'axios'
const server = require('../../../vue.config.js').server

const user = {
  state: {
    lineUsers: [],
    lineUserInfo: [],
    providerInfo: [],
    chatMessages: [],
    lastMessage: []
  },

  mutations: {
    GET_LINE_USERS(state, lineUsers) {
      state.lineUsers = lineUsers
    },
    GET_LINE_USER_INFO(state, lineUserInfo) {
      state.lineUserInfo = lineUserInfo
    },
    GET_PROVIDER_INFO(state, providerInfo) {
      state.providerInfo = providerInfo
    },
    GET_CHAT_MESSAGES (state, chatMessages) {
      state.chatMessages = chatMessages
    },
    SEND_CHAT_MESSAGE(state, chatMessages) {
      state.chatMessages = chatMessages
    }
  },

  actions: {
    GetLineUsers({ commit }) {
      return new Promise(resolve => {
        axios
          .get(server + '/lineUsers')
          .then((response) => {
            const data = response.data.rows
            commit('GET_LINE_USERS', data)
            resolve()
            
            // users.forEach(user => {
            //   axios
            //   .get('https://flightgo-backend-dev.herokuapp.com/chatmessages/room/' + user.chatRoomId + '/lastmessage')
            //   .then((response) => {
            //     const lastMessage = response.data[0]
            //     const data = Object.assign({}, user, lastMessage);

            //     commit('GET_LINE_USERS', data)
            //     resolve()
            //   })
            // });
        })
      })
    },
    GetLineUserInfo({ commit }, id) {
      return new Promise(resolve => {
        axios
          .get(server + '/lineUsers/' + id)
          .then((response) => {
            const data = response.data

            commit('GET_LINE_USER_INFO', data)
            resolve()
        })
      })
    },
    GetProviderInfo({ commit }, providerId) {
      return new Promise(resolve => {
        axios
          .get(server + '/providers/' + providerId)
          .then((response) => {
            const data = response.data

            commit('GET_LINE_USER_INFO', data)
            resolve()
        })
      })
    },
    GetChatMessages({ commit }, chatRoomId) {
      return new Promise(resolve => {
        axios
          .get(server + '/chatmessages/room/' + chatRoomId)
          .then((response) => {
            const data = response.data

            commit('GET_CHAT_MESSAGES', data)
            resolve()
        })
      })
    },
    SendChatMessage({ commit }) {
      return new Promise(resolve => {
        axios
          .post(server + '/chatmessages', {
            id: "5b4c145e2d7d3e00149e7404",
            message: "test message",
            roomId: "U33d4b31a307907a59aa13c46c68e2919_U06bd3288c92b8a0a9ca506440eb2856a",
            sender: "U33d4b31a307907a59aa13c46c68e2919",
            recipient: "U06bd3288c92b8a0a9ca506440eb2856a",
          })
          .then((response) => {
            const data = response.data

            commit('SEND_CHAT_MESSAGE', data)
            resolve()
        })
      })
    }
  }
}

export default user