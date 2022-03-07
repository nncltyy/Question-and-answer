<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col class="leftArea" :md="16" :xl="24">
                <el-card class="box-card">
                    <div class="flex">
                        <div>
                            <div class="upload_avatar">
                                <img class="Author" :src="avatar" v-if="!imgKey" key="1" />
                                <img class="Author" :src="avatar" v-if="imgKey" key="2" />
                                <input
                                    class="input-img"
                                    type="file"
                                    accept="image/*"
                                    @change="upAvatar"
                                />
                            </div>
                            <h3 class="username">{{ username }}</h3>
                        </div>
                        <div class="flex_auto">
                            <h4>擅长方向：JAVA,C++,PYTHON</h4>
                            <p>
                                <i class="el-icon-s-order"></i>
                                <span>前端工程师</span>
                            </p>
                            <p>
                                <i class="el-icon-s-cooperation"></i>
                                <span>家里蹲大学</span>
                            </p>
                            <p>
                                <el-link type="primary" icon="el-icon-edit">点击编辑资料</el-link>
                            </p>
                        </div>
                        <div class="hidden-md-and-down">
                            <el-button type="primary">关注</el-button>
                            <el-button plain type="primary">已关注</el-button>
                        </div>
                    </div>
                </el-card>

                <el-tabs style="border-radius:5px;" type="border-card">
                    <el-tab-pane label="我的动态">
                        <div class="ArticleList">
                            <!-- <div class="listItem" v-for="(item, index) in articleList" :key="index">
                                <div class="con-top">
                                    <span>{{ item.user.name }}</span>
                                    <span>|</span>
                                    <span>{{ item.createTime }}</span>
                                </div>
                                <el-link
                                    class="title"
                                    :href="'/detail?momentId=' + item.momentId"
                                    target="_blank"
                                >{{ item.title }}</el-link>
                                <el-link
                                    class="block"
                                    :underline="false"
                                    :href="'/detail?momentId=' + item.momentId"
                                    target="_blank"
                                >
                                    <div class="flex">
                                        <div class="content">
                                            <span class="text">{{ item.content }}</span>
                                            <div class="btns">
                                                <el-button type="text">
                                                    <i class="el-icon-thumb"></i>
                                                    <span>{{ item.likeNumber }}</span>
                                                </el-button>
                                                <el-button type="text">
                                                    <i class="el-icon-view"></i>
                                                    <span>{{ item.glanceNum }}</span>
                                                </el-button>
                                            </div>
                                        </div>
                                    </div>
                                </el-link>
                            </div>-->
                            <div class="contentText" v-for="(item) in articleList" :key="item.id">
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
                                    <div class="btns">
                                        <el-button type="text">
                                            <i class="el-icon-thumb"></i>
                                            <span>{{ item.likeNumber }}</span>
                                        </el-button>
                                        <el-button type="text">
                                            <i class="el-icon-view"></i>
                                            <span>{{ item.glanceNum }}</span>
                                        </el-button>
                                    </div>
                                </div>
                                <div class="bottomLine"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我的关注">我的关注</el-tab-pane>
                    <el-tab-pane label="我的回答">我的回答</el-tab-pane>
                    <el-tab-pane label="我的提问">我的提问</el-tab-pane>
                    <el-tab-pane label="我的收藏">我的收藏</el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col class="rightArea" :md="8" :xl="24">
                <el-card>
                    <h3>个人荣誉</h3>
                    <el-divider></el-divider>
                    <p>
                        <i class="el-icon-s-check"></i>
                        <span>被点赞{{ sumLike }}次</span>
                    </p>
                    <p>
                        <i class="el-icon-s-opportunity"></i>
                        <span>被发现{{ sumGlance }}次</span>
                    </p>
                    <el-divider></el-divider>
                    <h3>获得的荣誉</h3>
                    <p>
                        <img class="image" src />
                        <img class="image" src />
                    </p>
                </el-card>

                <el-card>
                    <div class="flex">
                        <div class="flexItem">
                            <p>关注</p>
                            <p>33</p>
                        </div>
                        <el-divider class="divider" direction="vertical"></el-divider>
                        <div class="flexItem">
                            <p>粉丝</p>
                            <p>3300</p>
                        </div>
                    </div>
                </el-card>

                <el-card>
                    <div class="joinTime">
                        <h3>加入时间</h3>
                        <p>{{ creatAt }}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import userApi from "@/api/user";
import moment from "moment";
export default {
    name: "User",
    data() {
        return {
            username: "",
            sumLike: 0,
            sumGlance: 0,
            avatar: '',
            createTime: '',
            articleList: [],
            imgKey: true
        };
    },
    mounted() {
        userApi
            .getUserInfo()
            .then((res) => {
                this.evalValue(res.data);
                return userApi.getQuestions();
            })
            .then((res) => {
                if (res.data.code == 200) {
                    let resData = res.data.data;
                    resData.forEach((item) => {
                        var date = new Date(item.createTime);
                        var datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
                        item.createTime = datetime;
                    });
                    this.articleList = resData;
                }
            });
    },
    computed: {
        creatAt() {
            var date = new Date(this.createTime);
            console.log(date);
            var datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
            return datetime;
        }
    },
    methods: {
        //赋值
        evalValue(data) {
            console.log(data);
            this.username = data.name;
            this.sumLike = data.sumLike;
            this.sumGlance = data.sumGlance;
            this.avatar = data.avatar_url;
            this.createTime = data.creatat;
        },
        goContent(momentId) {
            this.$router.push({ path: '/detail', query: { momentId } });
        },
        //上传头像
        upAvatar(event) {
            let file = event.target.files[0];
            if (!file || file.length == 0) {
                return
            }
            var fileName = file.name;
            var fileType = fileName.substr(fileName.lastIndexOf(".")).toUpperCase();
            if (fileType != ".GIF" && fileType != ".PNG" && fileType != ".JPG" && fileType != ".JPEG") {
                alert('请选择图片文件！') // 提示
                return
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                alert('上传图片大小不能超过 2MB！') // 提示
                $('.input-img').get(0).value = ''
                return
            }
            let formdata = new FormData()
            formdata.append("avatar", file);
            //更新用户头像
            userApi.uploadAvatar(formdata).then((res) => {
                if (res.data.code == 200) {
                    this.$nextTick(() => {
                        this.imgKey = !this.imgKey;
                        console.log(this.imgKey);
                    })
                }
            })


        }
    }
};
</script>
<style lang="less" scoped>
.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px;

    .ArticleList {
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

    .joinTime {
        text-align: center;
    }

    .flex {
        width: 100%;
        display: flex;
        justify-content: space - between;
        flex-wrap: nowrap;

        .flexItem {
            width: 50%;
            text-align: center;
        }

        .divider {
            height: auto;
        }

        .flex_auto {
            flex: 1;
            padding-left: 15px;

            p {
                margin: 10px 0;
            }

            span {
                margin-left: 10px;
            }
        }
    }

    .rightArea {
        p {
            margin: 10px 0;
        }

        span {
            margin-left: 10px;
        }

        .image {
            width: 100px;
            height: 100px;
            margin-right: 10px;
        }
    }

    ::v-deep.el-card {
        margin: 20px 0 0;

        .upload_avatar {
            position: relative;
            width: 100px;
            height: 100px;
            .Author {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: gray;
                margin-bottom: 10px;
            }
            .input-img {
                position: absolute;
                width: 100px;
                border-radius: 50%;
                height: 100px;
                left: 0;
                top: 0px;
                opacity: 0;
            }
        }
        .username {
            width: 100px;
            text-align: center;
        }
    }
    ::v-deep .el-tabs {
        margin: 20px 0 0;
    }
}
</style>