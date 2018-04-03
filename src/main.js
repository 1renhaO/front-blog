import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Container,
  Main,
  Form,
  FormItem,
  DatePicker,
  TimePicker,
  Input,
  Col,
  Row,
  Button,
  Upload,
  Loading,
  Card,
  Message
} from 'element-ui'

Vue.use(Container)
Vue.use(Main)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Loading)

Vue.prototype.$message = Message

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
