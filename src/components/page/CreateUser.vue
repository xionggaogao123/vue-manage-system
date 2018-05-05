<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 人脉管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增联系人</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">

            <el-form ref="form" :model="form" label-width="90px">

                <el-form-item label="联系人昵称" prop="name">
                    <el-input v-model="form.username" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="电话号码" prop="name">
                    <el-input v-model="form.telphone" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="联系人邮箱" prop="name">
                    <el-input v-model="form.mail" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="联系人性别" prop="name">
                    <el-input v-model="form.sex" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="createUser(form)">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>


<script>
    import {createUser} from '../../api/getData';
    import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";

    export default {
        components: {ElOption},
        data: function () {
            return {
                logo: '',
                form: {
                    username: '',
                    telphone: '',
                    mail: '',
                    sex: '',
                    birthday: '',
                    job: '',
                    type: '',
                    desc: '',
                },
                platformsSelect: []
            }
        },
        mounted() {
            this.getAllPlatformData();
        },

        created() {
            this.getData();

        },
        methods: {
            createUser(form) {
                createUser(form).then((res) => {
                    if (res.data.result) {
                        const self = this;
                        self.$router.push('/friendList');
                    }
                });
            },
            getData() {

            }
        }
    }
</script>
