<template>
    <div class="drow">
        <div class="shell">
            <div class="title">
                <span class="timeSelector">时间选择</span>
                <a :class="{ active: index == 1 }" @click="changeIndex(1)">今日问题</a>
                <a :class="{ active: index == 2 }" @click="changeIndex(2)">本周问题</a>
                <a :class="{ active: index == 3 }" @click="changeIndex(3)">本月问题</a>
            </div>
            <div class="userText">
                <div class="contentText" v-for="(item) in momentList" :key="item.id">
                    <div @click="goContent(item.momentId)">
                        <div class="userMessage">
                            <span>{{ item.user.name }}</span>
                            <span class="line">|</span>
                            <span>{{ item.createTime }}</span>
                            <span class="line">|</span>
                            <span
                                v-for="(label) in item.labelList"
                                :key="label.id"
                            >{{ label.name }} &nbsp</span>
                        </div>
                        <div class="textTitle">
                            <span>{{ item.title }}</span>
                        </div>
                        <div class="content">
                            <span>{{ item.content }}</span>
                        </div>
                    </div>
                    <div class="icons">
                        <i class="fa fa-thumbs-up">{{ item.likeNumber }}</i>
                        <i class="fa fa-hand-pointer-o">{{ item.glanceNum }}</i>
                    </div>
                    <div class="bottomLine"></div>
                </div>
            </div>
        </div>
        <div class="rightsidebar">
            <div class="creatorcenter">
                <div class="centerheader">
                    <img class="centerheader-img" src="./images/1.png" />
                    <span class="centerheader-text">创作者中心</span>
                </div>
                <div class="centerbuttons">
                    <div class="imagesline">
                        <img class="centerbuttons-img" src="../../assets/imgs/wenti.png" />
                        <img class="centerbuttons-img" src="../../assets/imgs/huida.png" />
                        <img class="centerbuttons-img" src="../../assets/imgs/shoucang.png" />
                        <img class="centerbuttons-img" src="../../assets/imgs/caogao.png" />
                    </div>
                    <div class="fontsline">
                        <span class="fontsline-font">你的回答</span>
                        <span class="fontsline-font">你的提问</span>
                        <span class="fontsline-font">你的收藏</span>
                        <span class="fontsline-font">你的草稿</span>
                    </div>
                    <div class="tips">欢迎来到寻答，快来提出你的问题吧！</div>
                    <div class="buttonsline">
                        <button class="buttonsline-button" @click="toAsk">+ 开始创作</button>
                        <button class="buttonsline-button" @click="toAsk">? 提出问题</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Home',
    data() {
        return {
            index: 0,
            offset: 0
        }
    },
    components: {
    },
    mounted() {
        this.$store.dispatch('getMomentList', this.offset);
        this.onScroll();
    },
    methods: {
        toAsk() {
            let token = localStorage.getItem('login_token');
            if (token) {
                this.$router.push({ path: '/ask' });
            } else {
                this.$router.push({ path: '/login' })
            }
        },
        goContent(momentId) {
            // console.log(momentId);
            this.$router.push({ path: '/detail', query: { momentId } });
        },
        addLike(item) {
            this.$store.dispatch('PostLikes', { momentId: item.momentId })
        },
        changeIndex(index) {
            this.index = index;
            this.offset = 0;
            if (index == 1) {
                this.$store.dispatch('getDayList', this.offset);
            } else if (index == 2) {
                this.$store.dispatch('getWeekList', this.offset);
            } else if (index == 3) {
                this.$store.dispatch('getMonthList', this.offset);
            }
        },
        //监听滚动
        onScroll() {
            document.addEventListener('scroll', () => {
                let documentHeight = document.body.clientHeight;
                let clientHeight = document.documentElement.clientHeight;
                let reqHeight = documentHeight - clientHeight;
                let scrollY = window.scrollY;
                //滚动到底部以后请求新的数据
                //请求数据向后推10
                if (scrollY >= reqHeight && this.isadd) {
                    this.offset += 10;
                    if (this.index == 1) {
                        this.$store.dispatch('getDayList', this.offset);
                    } else if (this.index == 2) {
                        this.$store.dispatch('getWeekList', this.offset);
                    } else if (this.index == 3) {
                        this.$store.dispatch('getMonthList', this.offset);
                    } else {
                        this.$store.dispatch('getMomentList', this.offset);
                    }
                }
            })
        }
    },
    computed: {
        ...mapState({
            momentList: (state) => state.Moment.momentList,
            isadd: (state) => state.Moment.isadd
        }),

    }
}

</script>

<style lang="less" scoped>
.drow {
    display: flex;
    justify-content: center;
    .shell {
        display: inline-block;
        vertical-align: top;
        width: 65vw;
        height: auto;
        padding-top: 1px;
        background-color: #fff;
        .title {
            height: 60px;
            position: relative;
            display: flex;
            justify-content: space-around;
            border: 1px solid #ddd;
            border-left: none;
            border-right: none;
            margin: 0;
            align-items: center;
            font-size: 16px;

            .active {
                color: #1989fa;
            }
            .timeSelector {
                left: 10px;
                font-size: 19px;
                margin-left: -30px;
            }
            span {
                margin-left: 5px;
            }
            .active {
                color: rgb(50, 132, 255);
            }
            .authSelect {
                width: 170px;
                height: 40px;
                display: inline-block;
                border: 3px solid #8cc4fc;
                border-radius: 3px;
                background-color: none;
            }
        }
        .userText {
            position: relative;
            height: auto;
            width: 100%;
            .contentText {
                position: relative;
                height: 150px;
                width: 95%;
                margin: 20px 0 0 30px;
                .userMessage {
                    display: flex;
                    justify-content: left;
                    color: #4e5969;
                    .line {
                        margin: 0 5px;
                    }
                }
                .textTitle {
                    font-size: 20px;
                    margin-top: 13px;
                }
                .content {
                    padding-top: 20px;
                    margin-right: 60px;
                    height: 25px;
                    font-size: 16px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #4e5969;
                }
                .icons {
                    position: absolute;
                    bottom: 10px;
                    i {
                        margin-right: 20px;
                    }
                }
                .bottomLine {
                    position: absolute;
                    display: inline-block;
                    width: 95%;
                    height: 1px;
                    background-color: #ddd;
                    bottom: 0;
                }
            }
        }
    }
    .rightsidebar {
        position: relative;
        display: inline-block;
        width: 300px;
        height: 150vh;
        // border : red 1px solid;
        margin-left: 10px;
        background-color: white;
        flex-shrink: 0;
        flex-grow: 0;
        right: 0;
        .creatorcenter {
            width: 300px;
            height: 450px;
            // border : black 1px solid;
            .centerheader {
                width: 280px;
                height: 50px;
                // border : blue 1px solid;
                margin-left: auto;
                margin-right: auto;
                display: flex;
                .centerheader-img {
                    margin-top: auto;
                    margin-bottom: auto;
                }
                .centerheader-text {
                    line-height: 50px;
                    height: 50px;
                    font-size: 15px;
                }
            }
            .centerbuttons {
                // border : blueviolet 1px solid;
                width: 300px;
                height: 130px;
                .imagesline {
                    // border : rgb(16, 184, 44) 1px solid;
                    width: 300px;
                    height: 60px;
                    display: flex;
                    justify-content: space-around;
                    .centerbuttons-img {
                        margin: auto;
                        width: 30px;
                        height: 30px;
                    }
                }
                .fontsline {
                    // border : rgb(4, 66, 124) 1px solid;
                    width: 300px;
                    height: 60px;
                    display: flex;
                    justify-content: space-around;
                    .fontsline-font {
                        margin-left: 10px;
                        width: 55px;
                        height: 55px;
                        // border : rgb(218, 93, 10) 1px solid;
                        font-size: 18px;
                        letter-spacing: 5px;
                        text-align: center;
                    }
                }
                .tips {
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 50px;
                    border: rgb(168, 167, 167) 2px solid;
                    width: 260px;
                    height: 160px;
                    color: black;
                    line-height: 20px;
                    padding: 5px;
                    background-color: #e6e6e6;
                }
                .buttonsline {
                    // border : rgb(21, 219, 103) 1px solid;
                    width: 300px;
                    height: 60px;
                    display: flex;
                    justify-content: space-around;
                    // height : 200px;
                    .buttonsline-button {
                        margin: auto;
                        height: 40px;
                        width: 100px;
                        font-size: 15px;
                        color: white;
                        background-color: #1989fa;
                    }
                }
            }
        }
    }
}
// 媒体插叙
@media screen and (max-width: 1500px) {
    .rightsidebar {
        display: inline-block;
    }
    .shell {
        width: 65vw;
    }
}
@media screen and (max-width: 1050px) {
    .drow .rightsidebar {
        display: none;
    }
    .drow .shell {
        width: 100vw;
    }
}
</style>