<template>
    <div class="plate">
        <div class="container">
            <div class="login_title">欢迎登录</div>
            <input type="text" placeholder="请输入用户名" v-model="username" />
            <input type="password" placeholder="请输入密码" ref="pwdinput" />
            <span class="tipmessage" v-show="tipsShow">{{ tipText }}</span>
            <button v-on:click="UserLogin()">登录</button>
            <span>
                没有账号?
                <router-link to="/register">去注册</router-link>
            </span>
        </div>
        <div class="square">
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div class="circle">
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
import md5 from "./script/md5";

export default {
    name: "Login",
    data() {
        return {
            username: "",
            tipsShow: false,
            tipText: "",
        }
    },
    methods: {
        async UserLogin() {
            this.tipsShow = false;
            if ("" == this.username) {
                this.tipText = "用户名不能为空";
                this.tipsShow = true;
            }
            else if ("" == this.$refs["pwdinput"].value) {
                this.tipText = "密码不能为空";
                this.tipsShow = true;
            }
            else {
                // 向服务器发送数据
                let result = await this.$API.reqLogin({ name: this.username, password: md5(this.$refs["pwdinput"].value) });
                // console.log(result);
                if (200 == result.status) {
                    localStorage.setItem("login_token", result.data.data.token);
                    this.$notify({
                        title: "登录",
                        message: "登录成功",
                        duration: 3000,
                    });
                    this.$router.push("/home");
                }
            }
        }
    }
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
}
.plate {
    height: 100vh;
    /* 盒子布局 居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 多余隐藏 */
    overflow: hidden;
    /* 背景颜色 */
    background-image: linear-gradient(45deg, #8ec5fc 0%, #e0c3fc 100%);
}
.container {
    /* 相对定位 */
    position: relative;
    /* 盒子布局 */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 500px;
    z-index: 1;
    background-color: white;
    border: 15px solid white;
    /* 阴影 */
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    /* 圆角 */
    border-radius: 16px;
}
.container .login_title {
    font-size: 26px;
    margin: 65px auto;
}
.container input {
    width: 280px;
    height: 30px;
    /* 段落缩进 */
    text-indent: 8px;
    /* 边框-没有 */
    border: none;
    /* 边框底部 */
    border-bottom: 1px solid #ddd;
    outline: none;
    /* 边距 */
    margin: 12px auto;
}
.container .tipmessage {
    font-size: 14px;
    color: red;
    margin-top: 30px;
}
.container button {
    width: 280px;
    height: 40px;
    margin: 10px auto 20px auto;
    /* 没有边框 */
    border: none;
    /* 背景颜色 */
    background-image: linear-gradient(45deg, #8ec5fc 0%, #e0c3fc 100%);
    color: white;
    font-weight: 600;
    /* 字符间距 */
    letter-spacing: 8px;
    border-radius: 8px;
    /* 指向时,鼠标指针样式 */
    cursor: pointer;
    /* 动画过渡 */
    transition: 0.5s;
}
.container button:hover {
    background-image: linear-gradient(45deg, #e0c3fc 100%, #8ec5fc 0%);
    background-position-x: -280px;
}
.container span {
    font-size: 14px;
}
.container a {
    color: plum;
    /* 下划线 */
    text-decoration: none;
}
ul li {
    position: absolute;
    border: 1px solid white;
    background-color: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 30px;
    /* 设置列表属性为空 */
    list-style: none;
}
.square li {
    top: 40vh;
    left: 60vw;
    opacity: 0;
    /* 动画 动画名 动画时长 线性的 无限次播放 */
    animation: square 10s linear infinite;
}
.square li:nth-child(1) {
    top: 10vh;
    left: 20vw;

    /* 动画延迟 */
    animation-delay: 2s;
}
.square li:nth-child(2) {
    top: 80vh;
    left: 10vw;
    animation-delay: 3s;
}
.square li:nth-child(3) {
    top: 50vh;
    left: 25vw;
    animation-delay: 4s;
}
.square li:nth-child(4) {
    top: 20vh;
    left: 85vw;
    animation-delay: 6s;
}
.square li:nth-child(5) {
    top: 85vh;
    left: 75vw;
    animation-delay: 1s;
}
@keyframes square {
    0% {
        transform: scale(0) rotateY(0deg);
        opacity: 1;
    }
    100% {
        transform: scale(5) rotateY(1440deg);
        opacity: 0;
    }
}
.circle li {
    bottom: 0;
    opacity: 0;
    animation: circle 8s linear infinite;
}
.circle li:nth-child(1) {
    left: 20vw;
    animation-delay: 2s;
}
.circle li:nth-child(2) {
    left: 35vw;
    animation-delay: 5s;
}
.circle li:nth-child(3) {
    left: 50vw;
    animation-delay: 1s;
}
.circle li:nth-child(4) {
    left: 65vw;
    animation-delay: 4s;
}
.circle li:nth-child(5) {
    left: 80vw;
    animation-delay: 3s;
}
@keyframes circle {
    0% {
        transform: scale(0) rotateY(0deg) rotateZ(45deg);
        opacity: 1;
        bottom: 0vh;
    }
    100% {
        transform: scale(3) rotateY(1800deg) rotateZ(45deg);
        bottom: 90vh;
        opacity: 0;
    }
}
</style>