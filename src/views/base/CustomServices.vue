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
                  <b-badge pill variant="danger">5</b-badge>
                </template>
                <b-list-group class="text-left">
                  <b-list-group-item href="#" v-for="user in users" :key="user.user_id">
                    <b-row>
                      <b-col md="3" class="text-center">
                        <div class="avatar">
                          <img class="img-avatar" :src="user.picture_url" :alt="user.email">
                        </div>
                      </b-col>
                      <b-col md="5">
                        <div>
                          <strong>{{ user.name }}</strong>
                        </div>
                        <div>{{ user.message }}</div>
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
        <b-col class="user-content" md="6">
          <b-card>
            <div slot="header">
            <b-row>
              <b-col class="text-right" md="3">
                <div class="avatar">
                  <img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com">
                </div>
              </b-col>
              <b-col md="4">
                <div class="user-name">Jackalkao</div>
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
              <div class="like">用戶喜好：東北亞行程、島嶼旅遊</div>
              <hr>
              <div class="detail text-center">會員資料</div>
              <ul>
                <li>姓名：Jackalkao</li>
                <li>Email：user@gmail.cpm</li>
                <li>電話：0912345678</li>
                <li>​護照過期日：2023年6月</li>
              </ul>
            </div>
            <div class="user-message">
              <ul>
                <li>
                  <b-row>
                    <b-col class="float-left">
                      <b-row>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                        <b-col class="message">請問東京團體行程7月份還有團嗎</b-col>
                      </b-row>
                    </b-col>
                    <b-col class="float-right">
                      <!-- <b-row>
                        <b-col>請問東京團體行程7月份還有團嗎</b-col>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                      </b-row> -->
                    </b-col>
                  </b-row>
                </li>
                <li>
                  <b-row>
                    <b-col class="float-left">
                      <!-- <b-row>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                        <b-col>請問東京團體行程7月份還有團嗎</b-col>
                      </b-row> -->
                    </b-col>
                    <b-col class="float-right">
                      <b-row>
                        <b-col class="message">​您好，已將您的問題轉給真人客服，請稍後片刻</b-col>
                        <b-col md="2"><img class="img-avatar" src="https://static.wixstatic.com/media/a1ce83_5f99550c2b33471dabf2c1fb906afff0~mv2.png/v1/crop/x_0,y_43,w_512,h_427/fill/w_108,h_92,al_c,usm_0.66_1.00_0.01/a1ce83_5f99550c2b33471dabf2c1fb906afff0~mv2.png" alt="admin@bootstrapmaster.com"></b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </li>
                <li>
                  <b-row>
                    <b-col class="float-left">
                      <!-- <b-row>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                        <b-col>請問東京團體行程7月份還有團嗎</b-col>
                      </b-row> -->
                    </b-col>
                    <b-col class="float-right">
                      <b-row>
                        <b-col class="message">通知真人客服中</b-col>
                        <b-col md="2"><img class="img-avatar" src="https://static.wixstatic.com/media/a1ce83_5f99550c2b33471dabf2c1fb906afff0~mv2.png/v1/crop/x_0,y_43,w_512,h_427/fill/w_108,h_92,al_c,usm_0.66_1.00_0.01/a1ce83_5f99550c2b33471dabf2c1fb906afff0~mv2.png" alt="admin@bootstrapmaster.com"></b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </li>
                <li>
                  <b-row>
                    <b-col class="float-left">
                      <!-- <b-row>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                        <b-col>請問東京團體行程7月份還有團嗎</b-col>
                      </b-row> -->
                    </b-col>
                    <b-col class="float-right">
                      <b-row>
                        <b-col class="message">你好，我是線上服務專員-曾月青(小青)</b-col>
                        <b-col md="2"><img class="img-avatar" src="https://static.wixstatic.com/media/a1ce83_35dc7d6b70fa4d5898f7d717946aa621~mv2.jpg/v1/crop/x_0,y_22,w_260,h_217/fill/w_108,h_92,al_c,q_80,usm_0.66_1.00_0.01/a1ce83_35dc7d6b70fa4d5898f7d717946aa621~mv2.webp" alt="admin@bootstrapmaster.com"></b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </li>
                <li>
                  <b-row>
                    <b-col class="float-left">
                      <!-- <b-row>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                        <b-col>請問東京團體行程7月份還有團嗎</b-col>
                      </b-row> -->
                    </b-col>
                    <b-col class="float-right">
                      <b-row>
                        <b-col class="message">目前7月份還有一檔東京豪華5日遊，尚有3位</b-col>
                        <b-col md="2"><img class="img-avatar" src="https://static.wixstatic.com/media/a1ce83_35dc7d6b70fa4d5898f7d717946aa621~mv2.jpg/v1/crop/x_0,y_22,w_260,h_217/fill/w_108,h_92,al_c,q_80,usm_0.66_1.00_0.01/a1ce83_35dc7d6b70fa4d5898f7d717946aa621~mv2.webp" alt="admin@bootstrapmaster.com"></b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </li>
                <li>
                  <b-row>
                    <b-col class="float-left">
                      <b-row>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                        <b-col class="message">好，我要下訂兩位</b-col>
                      </b-row>
                    </b-col>
                    <b-col class="float-right">
                      <!-- <b-row>
                        <b-col>請問東京團體行程7月份還有團嗎</b-col>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                      </b-row> -->
                    </b-col>
                  </b-row>
                </li>
                <li>
                  <b-row>
                    <b-col class="float-left">
                      <!-- <b-row>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                        <b-col>請問東京團體行程7月份還有團嗎</b-col>
                      </b-row> -->
                    </b-col>
                    <b-col class="float-right">
                      <b-row>
                        <b-col class="message">好的，林先生，我們將訂單送到您的信箱</b-col>
                        <b-col md="2"><img class="img-avatar" src="http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb" alt="admin@bootstrapmaster.com"></b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </li>
              </ul>
            </div>
            <textarea class="form-control" rows="3" id="comment" placeholder="請輸入訊息"></textarea>
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
  export default {
    data() {
      return {
        users: [
          {
            "_id": {
                "$oid": "5b391413029720a8300603b2"
            },
            "createdtime": {
                "$date": "2018-07-01T17:48:40.953Z"
            },
            "user_id": "2",
            "name": "Jackalkao",
            "email": "Mymail@gmail.com",
            "gender": "男性",
            "phone_number": "987654321",
            "picture_url": "http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb",
            "message": "請問東京團體行程7月份還有團嗎",
          },
          {
            "_id": {
                "$oid": "5b409662ec02e50004629059"
            },
            "user_id": "3",
            "name": "EricJhang",
            "email": "gkal@gmail.com",
            "gender": "男性",
            "phone_number": "9303874",
            "picture_url": "http://dl.profile.line-cdn.net/0hx95gNWqiJxYIHgtM9kVYQTRbKXt_MCFecH5ocCRKeXIsLTIQZC1vI3oZKiYhLmhDMy09dnlJeS8i",
            "message": "請問有郵輪行程嗎",
          },
          {
            "_id": {
                "$oid": "5b409662ec02e50004629059"
            },
            "user_id": "4",
            "name": "家永",
            "email": "gkal@gmail.com",
            "gender": "男性",
            "phone_number": "9303874",
            "picture_url": "https://static.wixstatic.com/media/7055e85d7ec9425a9353e516d5b19d81.jpg/v1/crop/x_0,y_597,w_2073,h_1737/fill/w_148,h_124,al_c,q_80,usm_0.66_1.00_0.01/7055e85d7ec9425a9353e516d5b19d81.webp",
            "message": "兩大一小，小孩要加多少錢",
          },
          {
            "_id": {
                "$oid": "5b409662ec02e50004629059"
            },
            "user_id": "5",
            "name": "王雅婷",
            "email": "gkal@gmail.com",
            "gender": "男性",
            "phone_number": "9303874",
            "picture_url": "https://static.wixstatic.com/media/a38649d65bd949f1a23175c75483200f.jpg/v1/crop/x_650,y_0,w_1619,h_1357/fill/w_148,h_124,al_c,q_80,usm_0.66_1.00_0.01/a38649d65bd949f1a23175c75483200f.webp",
            "message": "我想訂飛紐約的機票",
          },
          {
            "_id": {
                "$oid": "5b409662ec02e50004629059"
            },
            "user_id": "6",
            "name": "就是愛吃",
            "email": "gkal@gmail.com",
            "gender": "男性",
            "phone_number": "9303874",
            "picture_url": "https://static.wixstatic.com/media/d67dcdfb27f141658547637bfc0fe5ff.jpg/v1/crop/x_328,y_0,w_2345,h_1965/fill/w_148,h_124,al_c,q_80,usm_0.66_1.00_0.01/d67dcdfb27f141658547637bfc0fe5ff.webp",
            "message": "現在去看極光甚麼時候可以出團",
          },
          {
            "_id": {
                "$oid": "5b409662ec02e50004629059"
            },
            "user_id": "7",
            "name": "手拿包",
            "email": "gkal@gmail.com",
            "gender": "男性",
            "phone_number": "9303874",
            "picture_url": "https://static.wixstatic.com/media/0c27d9aa1d464108a6b342d9deef3970.jpg/v1/crop/x_307,y_0,w_2387,h_2000/fill/w_148,h_124,al_c,q_80,usm_0.66_1.00_0.01/0c27d9aa1d464108a6b342d9deef3970.webp",
            "message": "東京有吃貨行程嗎",
          },
          {
            "_id": {
                "$oid": "5b409662ec02e50004629059"
            },
            "user_id": "8",
            "name": "我就是愛旅行",
            "email": "gkal@gmail.com",
            "gender": "男性",
            "phone_number": "9303874",
            "picture_url": "https://static.wixstatic.com/media/3273c6e2911e44059093e6011be353a5.jpg/v1/crop/x_402,y_0,w_3155,h_2644/fill/w_148,h_124,al_c,q_80,usm_0.66_1.00_0.01/3273c6e2911e44059093e6011be353a5.webp",
            "message": "兩大一小，小孩要加多少錢",
          },
        ],
        messages: [],
        sockets:{
          'chat message': function(msg) { this.messages.push(msg); }
        }
      }
    }
  }
</script>

<style scoped>

</style>