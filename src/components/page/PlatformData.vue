<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>财务数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="tableData" label-width="90px">

                <el-form-item label="总金额:">
                    <el-form-item v-model="tableData.totalFee">
                        {{tableData.totalFee}} 元
                    </el-form-item>
                </el-form-item>

                <el-form-item label="昨天总收益:">
                    <el-form-item v-model="tableData.yesterdayIncome">
                        {{tableData.yesterdayIncome}} 元
                    </el-form-item>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>

<script>
    import {countTotalMoney} from '../../api/getData';

    export default {
        data: function () {
            return {
                tableData: {
                    totalFee: '',
                    yesterdayIncome: '',
                    dayReturn: ''
                },
                totalFee: '',
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false

            }
        },
        created() {
            this.countTotalMoney();
        },
        computed: {
            data() {
                const self = this;
                return self.tableData;
            }
        },
        methods: {
            countTotalMoney() {
                let self = this;
                countTotalMoney().then((res) => {
                    self.tableData = res.data.result;
                })
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.countTotalMoney();
            }
        }
    }
</script>
