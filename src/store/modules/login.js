import axios from 'axios'
import Cookies from 'js-cookie'

const login = {
  state: {
    customerServiceInfo: []
  },
  mutations: {
    LOGIN(state, data) {
      state.customerServiceInfo = data
    },
  },
  actions: {
    Login({
      commit
    }, loginForm) {
      return new Promise(resolve => {
        axios
          .post('https://flightgo-backend-dev.herokuapp.com/auth', {
            access_token: '1gnEhIylRyg3gFe3nXuxhAxZKIbPIZr9'
          }, {
            headers: {
              Authorization: 'Basic ' + window.btoa(loginForm.username + ':' + loginForm.password)
            },
          })
          .then((response) => {
            const data = response.data

            Cookies.set('customerServiceInfo', data);

            commit('LOGIN', data)
            resolve()
          })
      })
    }
  }
}
export default login
