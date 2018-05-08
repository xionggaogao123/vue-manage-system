<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">

            </el-breadcrumb>
        </div>

        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="投资金额" prop="name">
                    <el-input v-model="form.money" style="width: 200px"></el-input>
                    元
                </el-form-item>
                <el-form-item label="平台">
                    <el-select v-model="form.platformId" placeholder="请选择">
                        <el-option v-for="item in platformsSelect" :key="item.id" :value="item.id"
                                   :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投资天数" prop="quantity">
                    <el-input v-model="form.day" style="width: 200px"></el-input>
                    天
                </el-form-item>
                <el-form-item label="计息时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="计息时间" v-model="form.startTime"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="预计收益">
                    <el-input v-model="form.expectedIncome" style="width: 200px"></el-input>
                    元
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createInvest(form)">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
    import {createInvest, platformAllList} from '../../api/getData';
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
                    expectedIncome: '',
                    startTime: '',
                },
                platformsSelect: []
            }
        },
        mounted() {
            this.getAllPlatformData();
        },

        computed: {
            data() {
                const self = this;
                return self.tableData;
            }
        },
        methods: {
            getAllPlatformData() {
                platformAllList().then((res) => {
                    this.platformsSelect = res.data.result;
                });
            },
            createInvest(form) {
                let newForm = {
                    money: form.money * 100,
                    expectedIncome: form.expectedIncome * 100,
                    platformId: form.platformId,
                    day: form.day,
                    startTime: form.startTime
                };
                createInvest(newForm).then((res) => {
                    if (res.data.result) {
                        const self = this;
                        self.$router.push('/investList');
                    }
                });
            },
            getData() {

            }
        }
    }
</script>
