<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加平台昨日收入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">

            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="昨日收益" prop="name">
                    <el-input v-model="form.fee" style="width: 200px"></el-input>
                    元
                </el-form-item>

                <el-form-item label="平台">
                    <el-select v-model="form.platformId" placeholder="请选择">
                        <el-option v-for="item in platformsSelect" :key="item.id" :value="item.id"
                                   :label="item.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="createIncome(form)">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>


<script>
    import {createIncome, platformAllList} from '../../api/getData';
    import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";

    export default {
        components: {ElOption},
        data: function () {
            return {
                logo: '',
                form: {
                    fee: '',
                    type: '',
                    id: '',
                    name: '',
                    platformId: '',
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
            onSubmit() {
                this.$message.success('提交成功！');
            },
            getAllPlatformData() {
                platformAllList().then((res) => {
                    this.platformsSelect = res.data.result;
                });
            },

            createIncome(form) {
                let newForm ={
                    fee: form.fee * 100,
                    platformId: form.platformId,
                };
                createIncome(newForm).then((res) => {
                    console.log(res);
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
