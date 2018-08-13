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
                  <div><i class='fa fa-bars'></i></div>
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
              </ul>
            </div>
            <div id="message" class="user-message">
              <ul v-for="chatMessage in chatMessages" :key="chatMessage.id">
                <li>
                  <b-row>
                    <!-- <b-col class="float-left" v-if="chatMessage.sender===lineUserInfo.userId"> -->
                    <b-col class="float-left">
                      <b-row>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                        <b-col class="message">{{ chatMessage.message }}</b-col>
                      </b-row>
                    </b-col>
                    <b-col class="float-right">
                    </b-col>
                  </b-row>
                </li>
                <li>
                  <b-row>
                    <b-col class="float-left">
                    </b-col>
                    <!-- <b-col class="float-right" v-if="chatMessage.sender===lineUserInfo.providerId"> -->
                      <b-col class="float-right">
                      <b-row>
                        <b-col class="message">​{{ chatMessage.message }}</b-col>
                        <b-col md="2"><img class="img-avatar" src="https://static.wixstatic.com/media/a1ce83_5f99550c2b33471dabf2c1fb906afff0~mv2.png/v1/crop/x_0,y_43,w_512,h_427/fill/w_108,h_92,al_c,usm_0.66_1.00_0.01/a1ce83_5f99550c2b33471dabf2c1fb906afff0~mv2.png" alt="admin@bootstrapmaster.com"></b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </li>
              </ul>
              <!-- 歷史訊息
              <ul v-for="obj in getMessHistoryInfos">
                <li>{{ obj.username }}：{{ obj.msg }}</li>
              </ul> -->
              <!-- 對話訊息 -->
              <ul v-for="obj in getInfos">
                <li>{{ obj.userId }}：{{ obj.message }}</li>
              </ul>
            </div>
            <input class="form-control" id="comment" v-model="chatValue" placeholder="請輸入訊息" @keyup.enter="SendMessage()" />
            <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="SendMessage()">Send</b-button>
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
import { mapGetters, mapActions } from "vuex";
import io from "socket.io-client";
export default {
  data() {
    return {
      userContent: false,
      messageText: "",
      messages: [],
      lastMessage: "客服",
      name: "",
      count: 0,
      roomdetail: {
        id: "",
        users: {},
        infos: []
      },
      chatRoomId: "",
      customerServicId: "5b4e17e4546347baaf930d8c", //hard code, TODO getCS
      customerServiceName: "曾月青",                 //hard code, TODO getCS
      userId: "",
      userName: "",
      providerId: "",
      isLoadingAchieve: false,
      container: {},
      chatValue: "",
      events: {
        newMessage: "new message",
        typing: "typing",
        stopTyping: "stop typing",
        disconnect: "disconnect",
        connection: "connection",
        userLeft: "user left",
        userJoined: "user joined",
        customerServiceJoined: "customer service joined",
        customerServiceLeft: "customer service left",
        pickUp: "pick up",
      }
    };
  },
  created() {
    if (!this.getSocket) {
      //this.$store.commit("setGetSocket", io.connect("localhost:3001/"));
      this.$store.commit("setGetSocket", io.connect("https://www.flightgoai-service.com:8078/"));
    }
  },
  mounted() {
    this.$store.dispatch("GetLineUsers");

    // this.getSocket.on('client message', (data) => {
    //   // console.log(data)
    //   this.$store.commit('addRoomDetailInfos', data)
    //   console.log(this.getInfos)
    //   // this.messages.push(data)
    // })
    const that = this;
    const obj = {
      name: "客服人員",
      // src: getItem('src'),
      chatRoomId: this.chatRoomId
    };
    this.getSocket.on("message", function(obj) {
      console.log(obj);
      that.$store.commit("addRoomDetailInfos", obj);
      window.scroll(0, 10000);
    });
    this.getSocket.on("login", function(obj) {
      that.$store.commit("setUsers", obj);
    });
    this.getSocket.on("logout", function(obj) {
      that.$store.commit("setUsers", obj);
    });

    this.getSocket.on(this.events.newMessage, function(obj) {
      console.log("ON newMessage", obj);
      that.$store.commit("addRoomDetailInfos", obj);
      window.scroll(0, 10000);
    });

    this.getSocket.on(this.events.userJoined, function(obj) {
      that.$store.commit("setUsers", obj);

      // TODO : when user send '客服',should create chat room(2ids) in UI (left side)
    });
    
    this.getSocket.on(this.events.userLeft, function(obj) {
      that.$store.commit("setUsers", obj);
    });

    this.getSocket.on(this.events.customerServiceJoined, function(data) {
      console.log("get customerServiceJoined events", data);
      
    });
    // setTimeout(async () => {
    //   await this.$store.dispatch('getMessHistory', {roomid: this.roomid})
    //   this.$nextTick(() => {
    //     this.container.scrollTop = 10000
    //   })
    // }, 1000)
    this.count = Object.keys(this.lineUsers).length;
  },
  updated() {
    const el = document.getElementById("message");
    el.scrollTop = el.scrollHeight;
    // this.lastMessage = this.getInfos[Object.keys(this.getInfos)[Object.keys(this.getInfos).length - 1]]
  },
  computed: {
    ...mapGetters([
      "lineUsers",
      "lineUserInfo",
      "chatMessages",
      // 'lastMessage',
      "getSocket",
      "getInfos",
      // 'getMessHistoryInfos',
      "getUsers"
    ])
  },
  methods: {
    ...mapActions(["GetChatMessages", "GetLineUserInfo", "SendChatMessage"]),
    JoinRoom(lineUser) {
      this.GetChatMessages(lineUser.chatRoomId);
      this.GetLineUserInfo(lineUser.id);
      this.userContent = true;
      this.chatRoomId = lineUser.chatRoomId;
      this.userId = lineUser.userId;
      this.userName = lineUser.name;
      this.providerId = lineUser.providerId;
      const obj = {
        name: "客服人員",
        // src: getItem('src'),
        type: "customerservice",
        userId: this.userId,
        providerId: this.providerId,
        customerServiceId: this.customerServicId,
        customerServiceName: this.customerServiceName,
        name: this.customerServiceName,
        chatRoomId: this.chatRoomId,
      };

      //
      const pickUpRepsonse = {
        type: "customerservice",
        userId: this.userId,
        providerId: this.providerId,
        customerServiceId: this.customerServicId,
        customerServiceName: this.customerServiceName,
        name: this.customerServiceName,
        chatRoomId: this.chatRoomId
      };
      console.log("pick up from CS", pickUpRepsonse);
      //pick up this user
      this.getSocket.emit(this.events.pickUp, pickUpRepsonse);
      obj.chatRoomId = this.chatRoomId + "_" + this.customerServicId

      // 離開房間
      //this.getSocket.emit('logout', obj)
      this.getSocket.emit(this.events.customerServiceLeft, obj);
      this.$store.commit("setRoomDetailInfos");
      this.messages = [];
      // this.getSocket.emit('login', lineUser)
      //this.getSocket.emit('login', obj)
      //console.log('##customerServiceJoined ##',obj)
      //this.getSocket.emit(this.events.customerServiceJoined, obj)
      //
      // this.getSocket.emit('join room', lineUser.chatRoomId)
      //console.log("customerServiceJoined from CS", obj);
      //console.log('send customerServiceJoined from web',obj)
      this.getSocket.emit(this.events.customerServiceJoined, obj);
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
      console.log('SendMessage()')
      if (this.chatValue !== "") {
        const obj = {
          type: "customerservice",
          providerId: this.providerId,
          customerServiceId: this.customerServicId,
          customerServiceName: this.customerServiceName,
          userId: this.userId,
          img: "",
          time: new Date(),
          chatRoomId: this.chatRoomId,
          message: this.chatValue
          // src: getItem('src'),
          // msg: this.chatValue,
          // room: this.roomId,
        };
        // 传递消息信息
        //this.getSocket.emit('message', obj)
        console.log("##NEW MESSAGE", obj);
        this.getSocket.emit(this.events.newMessage, obj);
        this.chatValue = "";
        this.lastMessage = obj.message;
        this.$nextTick(() => {
          this.container.scrollTop = 10000;
        });
      }
    }
  }
};
</script>
