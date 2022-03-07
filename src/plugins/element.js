import Vue from "vue";
// 分别导入组件Element中的组件
import {Button,Input,Notification,Message,Row,Col,Card,Link,Tabs,TabPane,Divider,Image,Dropdown,DropdownMenu,DropdownItem} from "element-ui";

// 使用导入Element组件的元素
Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Link);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Divider);
Vue.use(Image);
Vue.use(DropdownMenu);
Vue.use(Dropdown);
Vue.use(DropdownItem);

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;