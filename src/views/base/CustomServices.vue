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
                        <div>
                          請問東京團體行程7月份還有團嗎
                        </div>
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
        <b-col class="user-content" md="5">
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

            </div>

              <b-form-group>
                <b-form-input type="text" id="name" placeholder="請輸入訊息"></b-form-input>
              </b-form-group>

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
            "user_id": "U33d4b31a307907a59aa13c46c68e2919",
            "name": "Jackalkao",
            "email": "Mymail@gmail.com",
            "gender": "男性",
            "phone_number": "987654321",
            "picture_url": "http://dl.profile.line-cdn.net/0m0e4aece97251c359cd788050c37794d45a22cd7eeabb",
          },
          {
            "_id": {
                "$oid": "5b409662ec02e50004629059"
            },
            "user_id": "U06bd3288c92b8a0a9ca506440eb2856a",
            "name": "EricJhang",
            "email": "gkal@gmail.com",
            "gender": "男性",
            "phone_number": "9303874",
            "picture_url": "http://dl.profile.line-cdn.net/0hx95gNWqiJxYIHgtM9kVYQTRbKXt_MCFecH5ocCRKeXIsLTIQZC1vI3oZKiYhLmhDMy09dnlJeS8i"
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>