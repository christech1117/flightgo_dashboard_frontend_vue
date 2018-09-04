const getters = {
  lineUsers: state => state.user.lineUsers,
  lineUserInfo: state => state.user.lineUserInfo,
  providerInfo: state => state.user.providerInfo,
  lastMessage: state => state.user.lastMessage,

  getSocket: state => state.socket.socket,
  getCustomerInfo: state => state.socket.customerInfo,
  getUsers: state => state.socket.roomdetail.users,
  getMessages: state => state.socket.messages,
  getMessHistoryInfos: state => state.socket.chatHistory,
  customerServiceInfo: state => state.login.customerServiceInfo
}
export default getters
