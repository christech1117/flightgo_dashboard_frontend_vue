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
                  <b-badge pill variant="danger">{{ this.lineUsers.length }}</b-badge>
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
                  <b-badge pill variant="danger">{{ this.inServicies.length }}</b-badge>
                </template>
                <b-list-group class="text-left">
                  <b-list-group-item href="#" v-for="inService in inServicies" :key="inService.id" @click="SelectRoom(inService)">
                    <b-row>
                      <b-col md="3" class="text-center">
                        <div class="avatar">
                          <img class="img-avatar" :src="inService.pictureUrl" :alt="inService.email">
                        </div>
                      </b-col>
                      <b-col md="5">
                        <div>
                          <strong>{{ inService.name }}</strong>
                        </div>
                        <div>
                          <div>{{ lastMessage ? lastMessage : '' }}</div>
                        </div>
                      </b-col>
                      <b-col md="4" class="float-right">
                        <strong>下午 03:50</strong>
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
                  <b-button variant="primary" class="btn-pill" @click="complete()">服務完畢
                  </b-button>
                </li>
              </ul>
            </div>
            <div id="message" class="user-message">
              <!-- 歷史訊息 -->
              <div v-for="obj in getMessHistoryInfos" :key="obj.id">
                <othermsg v-if="obj.type==='user'" :username="obj.name" :message="obj.message" :img="obj.avatar" :mytime="obj.time"></othermsg>
                <mymsg v-if="obj.type==='customerservice'" :username="obj.customerServiceName" :message="obj.message" :avatar="obj.avatar" :mytime="obj.time"></mymsg>
              </div>

              <!-- 對話訊息 -->
              <div v-for="obj in getInfos" :key="obj.id">
                <div v-if="obj.chatRoomId===roomdetail.chatRoomId">
                  <othermsg v-if="obj.type==='user'" :username="obj.name" :message="obj.message" :img="obj.avatar" :mytime="obj.time"></othermsg>
                  <mymsg v-if="obj.type==='customerservice'" :username="obj.customerServiceName" :message="obj.message" :avatar="obj.avatar" :mytime="obj.time"></mymsg>
                </div>
              </div>
            </div>
            <input class="form-control" id="comment" v-model="chatValue" placeholder="請輸入訊息" @keyup.enter="SendMessage()" />
            <b-button pressed block variant="primary" aria-pressed="true" type="submit" @click="SendMessage()">送出</b-button>
            <!-- logindata: {{ customerServiceInfo }} -->
            {{ roomdetail }}
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

const events = {
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

export default {
  data() {
    return {
      events: events,
      userContent: false,
      inServicies: [], // 服務中list
      chatValue: '', // 發訊息內容
      lastMessage: '客服',
      name: '',
      chatRoomId: '',
      roomdetail: {
        chatRoomId: '',
        message: []
      },
      messages: [],

      customerServicId: '5b4e17e4546347baaf930d8c',
      customerServiceName: '曾月青',
      userId: '',
      username: '曾月青',
      providerId: '',
      isLoadingAchieve: false,
      container: {}
    }
  },
  components: {
    Mymsg,
    Othermsg
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

    // 新訊息
    this.getSocket.on(this.events.newMessage, obj => {
      // if (obj.chatRoomId === this.chatRoomId) {
      this.roomdetail.message.push(obj.message)
      // this.messages.push(this.roomdetail[obj.chatRoomId])
      // this.roomdetail.message.push(obj.message)
      // }

      // console.log(array)
      // Object.keys(obj).forEach((item, index, array) => {
      // })
      console.log(this.roomdetail)
      that.$store.commit('addRoomDetailInfos', obj)
    })

    // 使用者加入房間
    this.getSocket.on(this.events.userJoined, obj => {
      // console.log(this.obj)
      // if (obj.message === '客服') {
      //   this.lineUsers.unshift(obj)
      // }
      that.$store.commit('setUsers', obj)
    })

    // 使用者離開房間
    this.getSocket.on(this.events.userLeft, obj => {
      that.$store.commit('setUsers', obj)
    })

    // 服務人員加入房間
    this.getSocket.on(this.events.customerServiceJoined, data => {
      console.log('get customerServiceJoined events', data)
    })
  },
  updated() {
    const el = document.getElementById('message')
    el.scrollTop = el.scrollHeight
    // this.lastMessage = this.getInfos[Object.keys(this.getInfos)[Object.keys(this.getInfos).length - 1]]
  },
  computed: {
    ...mapGetters([
      'lineUsers',
      'lineUserInfo',
      'getSocket',
      'getInfos',
      'getMessHistoryInfos',
      'getUsers'
      // 'customerServiceInfo'
    ])
  },
  methods: {
    ...mapActions(['GetMessHistory', 'GetLineUserInfo']),
    JoinRoom(lineUser) {
      this.userContent = true
      this.GetMessHistory(lineUser.chatRoomId) // 取得歷史訊息
      this.GetLineUserInfo(lineUser.id) // 取得line所有使用者

      // 待處理拿掉一筆資料
      const index = this.lineUsers.indexOf(lineUser)
      this.lineUsers.splice(index, 1)
      // 服務中新增一筆資料
      this.inServicies.unshift(lineUser)

      this.chatRoomId = lineUser.chatRoomId
      this.providerId = lineUser.providerId
      this.userId = lineUser.userId

      const pickUpRepsonse = {
        type: 'customerservice',
        userId: this.userId,
        providerId: this.providerId,
        customerServiceId: this.customerServicId,
        customerServiceName: this.customerServiceName,
        name: this.customerServiceName,
        chatRoomId: this.chatRoomId
      }
      // pick up this user
      this.getSocket.emit(this.events.pickUp, pickUpRepsonse)

      // 離開房間
      // console.log('leave room: ', pickUpRepsonse)
      this.getSocket.emit(this.events.customerServiceLeft, pickUpRepsonse)
      // this.$store.commit('setRoomDetailInfos')

      // 加入房間
      // console.log('join room: ', pickUpRepsonse)
      this.getSocket.emit(this.events.customerServiceJoined, pickUpRepsonse)
      this.chatRoomId = pickUpRepsonse.chatRoomId + '_' + this.customerServicId
    },
    SelectRoom(inService) {
      this.userContent = true
      this.GetMessHistory(inService.chatRoomId) // 取得歷史訊息
      this.GetLineUserInfo(inService.id) // 取得line所有使用者
    },
    SendMessage() {
      if (this.chatValue !== '') {
        const obj = {
          type: 'customerservice',
          providerId: this.providerId,
          customerServiceId: this.customerServicId,
          customerServiceName: this.customerServiceName,
          userId: this.userId,
          avatar:
            'http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb',
          time: new Date(),
          chatRoomId: this.chatRoomId,
          message: this.chatValue
        }
        // console.log('send message: ', obj)
        this.getSocket.emit(this.events.newMessage, obj)
        this.chatValue = ''
        this.lastMessage = obj.message
        this.$nextTick(() => {
          this.container.scrollTop = 10000
        })
      }
    },
    complete() {
      // 服務完畢拿掉該服務中資料
      this.userContent = false
      console.log('服務完畢')
    }
  }
}
</script>
