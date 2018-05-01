<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增投资计划</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="投资金额" prop="name" >
                    <el-input v-model="form.money" style="width: 200px"></el-input>元
                </el-form-item>

                <el-form-item label="投资平台">
                    <el-select v-model="form.platforms" placeholder="请选择">
                        <el-option v-for="item in platforms" :key="item.id" value="item" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="投资天数" prop="quantity">
                    <el-input v-model="form.day" style="width: 200px"></el-input>天
                </el-form-item>

                <el-form-item label="时间范围">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="计息时间" v-model="form.startTime"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>

                </el-form-item>

                <el-form-item label="预计收益">
                    <el-input v-model="form.expectedIncome" style="width: 200px"></el-input>元
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addTask(form)">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>


<script>
    import {platformAllList} from '../../api/getData';
    import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";

    export default {
        components: {ElOption},
        data: function () {
            return {
                logo: '',
                form: {
                    money: '',
                    type: '',
                    day: '',
                    id: '',
                    name: '',
                    platformId: '',
                    platforms: [],
                    expectedIncome: '',
                    startTime: '',
                }
            }
        },
        mounted() {

        },

        created() {
            this.getData();
            this.getAllPlatformData();
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
            getAllPlatformData() {
                platformAllList().then((res) => {
                   console.log(res.data);
                    this.platforms = res.data.result;
                });
            },

            addTask(form) {
                console.log(this.logo);
                let newForm = {
                    name: form.name,
                    logo: this.logo,
                    type: form.type,
                    industry: form.industry,
                    level: form.level,
                    quantity: form.quantity,
                    startTime: form.startTime,
                    endTime: form.endTime,
                    taskUrl: form.taskUrl,
                    strategyUrl: form.strategyUrl,
                    reward: form.reward,
                    describe: form.describe,
                    detailStep: form.detailStep,
                    imageNum: form.imageNum,
                    extra: {
                        incomeYear: form.extra.incomeYear,
                        deadline: form.extra.deadline,
                        startMoney: form.extra.startMoney
                    }
                };
                addTask(newForm).then((res) => {
                    console.log(res);
                    if (res.data) {
                        const self = this;
                        self.$router.push('/tasklist');
                    }
                });
            },
            getData() {

            }
        }
    }
</script>
