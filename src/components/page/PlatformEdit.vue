<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑平台信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="平台名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="总金额" prop="quantity">
                    <el-input v-model="form.totalMoney"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updatePlatform(form)">提交</el-button>
                    <el-button @click="cancelTask(form)">取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>

<script>
    import {findPlatform, updatePlatform} from '../../api/getData';

    export default {
        data: function () {
            return {
                form: {
                    name: '',
                    totalMoney: ''
                }
            }
        },
        mounted() {
            findPlatform(id).then((res) => {
                this.form = res.data.result
            });
        },

        created() {
            this.getPlatformDetail();
        },

        methods: {
            getPlatformDetail() {
                let self = this;
                let params = {
                    id: this.$route.query.id
                };
                findPlatform(params).then((res) => {
                    self.form = res.data.result
                });
            },
            updatePlatform(form) {
                let params = {
                    id: this.$route.query.id,
                    name: form.name,
                    totalMoney: form.totalMoney * 100
                };
                updatePlatform(params).then((res) => {
                    if (res.data.result) {
                        const self = this;
                        self.$router.push('/platformList');
                    }
                });
            },

            getData() {

            }
        }
    }
</script>
