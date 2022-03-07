<template>
    <div>
        <!-- 头部信息 -->
        <div class="header">
            <!-- LOGO -->
            <div class="logo" v-on:click="ToHome()">
                <!-- <span style = "margin:auto;color:red" v-on:click = "ToHome()">LOGO</span> -->
                <img src="@/assets/logo_full.jpg" />
            </div>
            <!-- 菜单区 -->
            <div class="headermenu">
                <div class="headfont" v-on:click="ToHome()" :class="{ active: curIndex == 1 }">首页</div>
                <div class="headfont">问答</div>
                <div class="headfont">资讯</div>
            </div>
            <!-- 搜索输入框 -->
            <input type="text" class="searchinput" placeholder="Search for .. " />
            <!-- 头部按钮区 -->
            <div class="headrightsize" v-show="islogin">
                <!-- 用户按钮 -->
                <div class="userbuttons">
                    <a class="userbutton">
                        <img src="./images/1.png" />
                    </a>
                </div>
                <!-- 用户信息 -->
                <div class="usershowinfo">
                    <!-- 下拉菜单 -->
                    <el-dropdown @command="ElDropDownHandle">
                        <!-- 用户头像 -->
                        <div class="userhead el-dropdown-link" v-on:click="ToUser()">
                            <img :src="userInfo.avatar_url" />
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user-solid" command="usermain">用户主页</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-plus" command="question">写问题</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-close" command="exit">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 用户名 -->
                    <div class="username">{{ userInfo.name }}</div>
                </div>
            </div>
            <!-- 未登录的样式 -->
            <div class="unlogininfo" v-show="!islogin">
                <button v-on:click="LoginButton()">登录</button>
                <button v-on:click="RegisterButton()">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
export default
    {
        name: "Header",
        data() {
            return {
                userInfo: {},
                islogin: false,
                curIndex: 1
            };
        },
        mounted() {
            this.GetUserInfo();
        },
        methods: {
            // 点击首页按钮跳到首页
            ToHome() {
                this.$router.push("/home");
            },
            // 获取用户信息
            async GetUserInfo() {
                this.$API.reqHeadUserInfo().then((result) => {
                    // console.log(result);
                    if (200 == result.status) {
                        this.islogin = true;
                        this.userInfo = result.data.data[0];
                    }
                    else {
                        this.islogin = false;
                    }
                }, (error) => {
                    // console.log("ERROR",error);
                    this.islogin = false;
                });
                // let result = await this.$API.reqHeadUserInfo();
                // console.log(result);
            },
            // 按下登录按钮
            LoginButton() {
                window.open("/login", "_blank");
                // this.$router.push("/login");
            },
            // 按下注册按钮
            RegisterButton() {
                window.open("/register", "_blank");
                // this.$router.push("/register");
            },
            // 去用户详情页面
            ToUser() {
                this.$router.push("/user");
            },
            // 下拉菜单的回调
            ElDropDownHandle(command) {
                // 用户主页
                if ("usermain" == command) {
                    this.ToUser();
                }
                // 写问题
                else if ("question" == command) {
                    window.open("/ask", "_blank");
                }
                // 退出登录
                else if ("exit" == command) {
                    localStorage.removeItem("login_token");
                    this.GetUserInfo();
                    this.$router.push("/home");
                }
            }
        }
    }
</script>

<style scoped>
.header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    /* border : black 1px solid; */
    margin-bottom: 5px;
    background-color: white;
}
.headermenu {
    display: flex;
    justify-content: center;
    width: 350px;
    height: 100px;
}
.searchinput {
    border: #1989fa 1px solid;
    border-radius: 5px 5px 5px 5px;
    margin: auto;
    /* margin-top : 30px; */
    height: 40px;
    width: 300px;
}
.logo {
    display: flex;
    margin: auto 0px auto 20px;
    background-color: black;
    width: 160px;
    height: 65px;
    opacity: 0.9;
    /* 不可压缩,不可伸展 */
    flex-shrink: 0;
    flex-grow: 0;
}
.logo img {
    width: 100%;
    height: 100%;
}
.headrightsize {
    display: flex;
    height: 45px;
    width: 400px;
    margin: auto 20px auto 50px;
    justify-content: flex-end;
    /* border : purple 1px solid; */
}
.unlogininfo {
    display: flex;
    height: 45px;
    width: 400px;
    margin: auto 20px auto 50px;
    justify-content: flex-end;
    /* border : purple 1px solid; */
}
.unlogininfo button {
    height: 40px;
    width: 60px;
    color: #fff;
    margin: auto 20px auto 0px;
    background-color: #1989fa;
}
.userbuttons {
    height: 45px;
    width: 100px;
    display: flex;
    justify-content: space-around;
    /* border : blue 1px solid; */
}
.usershowinfo {
    display: flex;
    height: 45px;
    width: 150px;
    justify-content: space-around;
    /* border : black 1px solid; */
}
.headfont {
    display: flex;
    margin: auto 0px;
    justify-content: center;
    font-size: 23px;
    line-height: 70px;
    width: 80px;
    height: 70px;
    border: 1px solid #fff;
    cursor: pointer;
}
.active {
    color: #1989fa;
}
.headfont:hover {
    border-bottom: 3px solid #1989fa;
    color: black;
}
.username {
    margin: auto;
    font-size: 21px;
}
.userhead {
    height: 40px;
    width: 40px;
    border-radius: 20px 20px 20px 20px;
    background-color: black;
    margin: auto;
    opacity: 0.9;
    overflow: hidden;
}
.userhead img {
    height: 100%;
    width: 100%;
}
.usersize > a {
    width: 50px;
    height: 40px;
}
.userbuttons > .userbutton {
    /* margin : auto; */
    margin-top: auto;
    margin-bottom: auto;
    /* vertical-align:middle; */
}

@media screen and (max-width: 1200px) and (min-width: 1000px) {
    .headermenu {
        display: flex;
    }
    .headrightsize {
        width: 350px;
    }
}
@media screen and (max-width: 1000px) {
    .headermenu {
        display: none;
    }
    .headrightsize {
        width: 200px;
    }
    .username {
        display: flex;
    }
}
@media screen and (max-width: 800px) {
    .username {
        display: none;
    }
    .userbuttons {
        display: flex;
    }
    .userhead {
        margin-right: auto;
    }
    .headrightsize {
        width: 100px;
    }
}
@media screen and (max-width: 700px) {
    .userbuttons {
        display: none;
    }
    .userhead {
        margin-right: 15px;
    }
    .searchinput {
        display: flex;
    }
}
@media screen and (max-width: 460px) {
    .searchinput {
        display: none;
    }
    .lalala {
        display: none;
    }
}
</style>