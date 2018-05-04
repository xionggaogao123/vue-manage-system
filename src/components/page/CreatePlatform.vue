<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增平台</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">

            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="平台名称" prop="name">
                    <el-input v-model="form.name" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="平台类型">
                    <el-select v-model="form.type" placeholder="选择类型" class="handle-select mr10">
                        <el-option key="1" label="货币基金" value="1">货币基金</el-option>
                        <el-option key="2" label="p2p" value="2">p2p</el-option>
                        <el-option key="3" label="基金" value="3">基金</el-option>
                        <el-option key="4" label="股票" value="4">股票</el-option>
                        <el-option key="5" label="黄金" value="5">黄金</el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="年收益率" prop="quantity">
                    <el-input v-model="form.incomeReturn" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="月收益率" prop="quantity">
                    <el-input v-model="form.monthReturn" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="日收益率" prop="quantity">
                    <el-input v-model="form.dayReturn" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="createPlatform(form)">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>


<script>
    import {createPlatform, platformAllList} from '../../api/getData';
    import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";

    export default {
        components: {ElOption},
        data: function () {
            return {
                logo: '',
                form: {
                    type: '',
                    incomeReturn: '',
                    monthReturn: '',
                    dayReturn: '',
                    id: '',
                    name: '',
                    platformId: '',
                    expectedIncome: '',
                    startTime: '',
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

            createPlatform(form) {
                createPlatform(form).then((res) => {
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
