<template>
  <div id="custom-services">
    <div class="animated fadeIn">
      <b-row>
        <b-col class="user-list" md="4">
          <b-card class="text-center">
            <div slot="header">
              客戶列表
            </div>
            <b-tabs>
              <b-tab class="tab" active>
                <template slot="title">
                  待處理
                  <b-badge pill variant="danger">{{ Object.keys(lineUsers).length }}</b-badge>
                </template>
                <b-list-group class="text-left">
                  <b-list-group-item href="#" v-for="lineUser in lineUsers" :key="lineUser.id" @click="JoinRoom(lineUser)">
                    <b-row>
                      <b-col md="3" class="text-center">
                        <div class="avatar">
                          <img class="img-avatar" :src="lineUser.pictureUrl" :alt="lineUser.email">
                        </div>
                      </b-col>
                      <b-col md="5">
                        <div>
                          <strong>{{ lineUser.name }}</strong>
                        </div>
                        <div>{{ lastMessage ? lastMessage : '' }}</div>
                      </b-col>
                      <b-col md="4" class="float-right">
                        <strong>下午 03:50</strong>
                        <b-badge variant="success">未回覆訊息</b-badge>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </b-tab>
              <b-tab class="tab">
                <template slot="title">
                  服務中
                  <b-badge pill variant="danger">9</b-badge>
                </template>
                <b-list-group class="text-left">
                  <b-list-group-item href="#">
                    <b-row>
                      <b-col md="3" class="text-center">
                        <div class="avatar">
                          <img class="img-avatar" src="img/avatars/5.jpg" alt="admin@bootstrapmaster.com">
                        </div>
                      </b-col>
                      <b-col md="5">
                        <div>
                          <strong>彥君</strong>
                        </div>
                        <div>
                          請問東京團體行程7月份還有團嗎
                        </div>
                      </b-col>
                      <b-col md="4" class="float-right">
                        <strong>下午 03:50</strong>
                        <!-- <b-badge variant="success">未回覆訊息</b-badge> -->
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
        <b-col class="user-content animated fadeIn" md="6" v-show="userContent">
          <b-card>
            <div slot="header">
              <b-row>
                <b-col class="text-right" md="3">
                  <div class="avatar">
                    <img class="img-avatar" :src="lineUserInfo.pictureUrl" alt="admin@bootstrapmaster.com">
                  </div>
                </b-col>
                <b-col md="4">
                  <div class="user-name">{{ lineUserInfo.name }}</div>
                </b-col>
                <b-col class="text-center">
                  <div>
                    <div>
                      <i class='fa fa-bars'></i>
                    </div>
                    <div>歷史標籤</div>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="user-info">
              <div class="like">用戶喜好：{{ lineUserInfo.favorite }}</div>
              <hr>
              <div class="detail text-center">會員資料</div>
              <ul>
                <li>姓名：{{ lineUserInfo.name }}</li>
                <li>Email：{{ lineUserInfo.email }}</li>
                <li>電話：{{ lineUserInfo.phoneNumber }}</li>
                <li>
                  <b-button variant="primary" class="btn-pill">服務完畢
                  </b-button>
                </li>
              </ul>
            </div>
            <div id="message" class="user-message">
              <!-- 歷史訊息 -->
              <div v-for="obj in getMessHistoryInfos" :key="obj.id">
                <!-- <othermsg v-if="obj.username!=username"
                          :name="obj.username"
                          :msg="obj.msg"
                          :img="obj.img"
                          :mytime="obj.time">
                </othermsg> -->
                <mymsg v-if="obj.customerServiceName==username" :username="obj.customerServiceName" :message="obj.message" :avatar="obj.avatar" :mytime="obj.time">
                </mymsg>
              </div>

              <!-- 對話訊息 -->
              <div v-for="obj in getInfos" :key="obj.id">
                <!-- <othermsg v-if="obj.username!=username"
                          :name="obj.username"
                          :msg="obj.msg"
                          :img="obj.img"
                          :mytime="obj.time">
                </othermsg> -->
                <mymsg v-if="obj.customerServiceName==username" :username="obj.customerServiceName" :message="obj.message" :avatar="obj.avatar" :mytime="obj.time">
                </mymsg>
              </div>
            </div>
            <input class="form-control" id="comment" v-model="chatValue" placeholder="請輸入訊息" @keyup.enter="SendMessage()" />
            <b-button pressed block variant="primary" aria-pressed="true" type="submit" @click="SendMessage()">送出
            </b-button>
            {{customerServiceInfo}}
          </b-card>
        </b-col>
        <!-- <b-col class="user-other" md="3">
          <b-card>
            <div slot="header">
              wait..
            </div>
          </b-card>
        </b-col> -->
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'
import Mymsg from '../../components/Mymsg.vue'
import Othermsg from '../../components/Othermsg.vue'
export default {
  data() {
    return {
      userContent: false,
      messageText: '',
      messages: [],
      lastMessage: '客服',
      name: '',
      count: 0,
      roomdetail: {
        id: '',
        users: {},
        infos: []
      },
      chatRoomId: '',
      customerServicId: '5b4e17e4546347baaf930d8c', //hard code, TODO getCS
      customerServiceName: '曾月青', //hard code, TODO getCS
      userId: '',
      username: '曾月青',
      providerId: '',
      isLoadingAchieve: false,
      container: {},
      chatValue: '',
      events: {
        newMessage: 'new message',
        typing: 'typing',
        stopTyping: 'stop typing',
        disconnect: 'disconnect',
        connection: 'connection',
        userLeft: 'user left',
        userJoined: 'user joined',
        customerServiceJoined: 'customer service joined',
        customerServiceLeft: 'customer service left',
        pickUp: 'pick up'
      }
    }
  },
  created() {
    if (!this.getSocket) {
      this.$store.commit('setGetSocket', io.connect('localhost:3001/'))
      // this.$store.commit("setGetSocket", io.connect("https://www.flightgoai-service.com:8078/"));
    }
  },
  mounted() {
    this.$store.dispatch('GetLineUsers')
    const that = this

    this.getSocket.on(this.events.newMessage, obj => {
      // this.messages.splice(-1, 0, obj);

      // console.log(this.messages);
      // console.log('ON newMessage', obj);
      that.$store.commit('addRoomDetailInfos', obj)
    })

    this.getSocket.on(this.events.userJoined, obj => {
      that.$store.commit('setUsers', obj)

      // TODO : when user send '客服',should create chat room(2ids) in UI (left side)
    })

    this.getSocket.on(this.events.userLeft, obj => {
      that.$store.commit('setUsers', obj)
    })

    this.getSocket.on(this.events.customerServiceJoined, function(data) {
      console.log('get customerServiceJoined events', data)
    })
    this.count = Object.keys(this.lineUsers).length
  },
  updated() {
    const el = document.getElementById('message')
    el.scrollTop = el.scrollHeight
    // this.lastMessage = this.getInfos[Object.keys(this.getInfos)[Object.keys(this.getInfos).length - 1]]
  },
  components: {
    Mymsg,
    Othermsg
  },
  computed: {
    ...mapGetters([
      'lineUsers',
      'lineUserInfo',
      'getSocket',
      'getInfos',
      'getMessHistoryInfos',
      'getUsers',
      'customerServiceInfo'
    ])
  },
  methods: {
    ...mapActions(['GetMessHistory', 'GetLineUserInfo', 'SendChatMessage']),
    JoinRoom(lineUser) {
      this.GetMessHistory(lineUser.chatRoomId)
      console.log('test' + this.getMessHistoryInfos)
      this.GetLineUserInfo(lineUser.id)
      this.userContent = true
      this.chatRoomId = lineUser.chatRoomId
      this.providerId = lineUser.providerId
      this.userId = lineUser.userId
      const pickUpRepsonse = {
        type: 'customerservice',
        userId: lineUser.userId,
        providerId: lineUser.providerId,
        customerServiceId: this.customerServicId,
        customerServiceName: this.customerServiceName,
        name: this.customerServiceName,
        chatRoomId: this.chatRoomId
      }
      console.log('pick up from CS', pickUpRepsonse)
      //pick up this user
      this.getSocket.emit(this.events.pickUp, pickUpRepsonse)
      // obj.chatRoomId = this.chatRoomId + "_" + this.customerServicId

      // 離開房間
      this.getSocket.emit(this.events.customerServiceLeft, pickUpRepsonse)
      this.$store.commit('setRoomDetailInfos')

      // 加入房間
      this.getSocket.emit(this.events.customerServiceJoined, pickUpRepsonse)
    },

    //Data Format
    // {
    // type: "customerservice",
    // providerId: "1597108460",
    // userId: "U7d9b155b96a70afe8607c227b9768677",
    // customerServiceId: "5b4e17e4546347baaf930d8c",
    // roomId: "1597108460_U7d9b155b96a70afe8607c227b9768677_5b4e17e4546347baaf930d8c",
    // name: "曾月青",
    // picture: "https://gravatar.com/avatar/53f08004c8f872af684ba2391f25690f?d=identicon",
    // userName: "曾月青",
    // message: message
    // }
    SendMessage() {
      if (this.chatValue !== '') {
        const obj = {
          type: 'customerservice',
          providerId: this.providerId,
          customerServiceId: this.customerServicId,
          customerServiceName: this.customerServiceName,
          userId: this.userId,
          avatar: '',
          time: new Date(),
          chatRoomId: this.chatRoomId,
          message: this.chatValue
        }
        // console.log("send message: ", obj);
        this.getSocket.emit(this.events.newMessage, obj)
        this.chatValue = ''
        this.lastMessage = obj.message
        this.$nextTick(() => {
          this.container.scrollTop = 10000
        })
      }
    }
  }
}
</script>
