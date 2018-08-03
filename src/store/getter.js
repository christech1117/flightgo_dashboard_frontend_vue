const getters = {
  lineUsers: state => state.user.lineUsers,
  lineUserInfo: state => state.user.lineUserInfo,
  providerInfo: state => state.user.providerInfo,
  chatMessages: state => state.user.chatMessages,
  lastMessage: state => state.user.lastMessage,

  getSocket: state => state.socket.socket,
  getInfos: state => state.socket.roomdetail.infos,
  getUsers: state => state.socket.roomdetail.users,
  // getMessHistoryInfos: state => state.messhistory.infos,
  // getMessHistoryAll: state => state.messhistory.allmessage,
  // getRobotMsg: state => state.robotmsg
}
export default getters