<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>后台管理</el-breadcrumb-item>
                <el-breadcrumb-item>投资记录管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="add" @click="handleAddInvest()">新增投资计划</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="platformName" label="平台名称" width="100"></el-table-column>
            <el-table-column prop="money" label="投资金额" width="100"></el-table-column>
            <el-table-column prop="day" label="投资时间" width="90"></el-table-column>
            <el-table-column prop="expectedIncome" label="预期收益" width="90"></el-table-column>
            <el-table-column prop="startTime" label="投资计利时间" width="180"></el-table-column>
            <el-table-column prop="expireTime" label="投资到期时间" width="180"></el-table-column>
            <el-table-column prop="lendDay" label="已出借天数" width="90"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作" width="80" prop="id">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total_count"
                :page-size="20">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {investList} from '../../api/getData';
    import ElHeader from "../../../node_modules/element-ui/packages/header/src/main.vue";

    export default {
        data() {
            return {
                tableData: [],
                platformName: '',
                money: '',
                day: '',
                startTime: '',
                createTime: '',
                expireTime: '',
                lendDay: '',
                leftDay: '',
                expectedIncome: '',
                type: '',
                status: '',
                select_word: '',
                del_list: [],
                is_search: false,
                cur_page: 1,
                total_count: 0
            }
        },
        created() {
            this.investList();
        },
        computed: {
            data() {
                const self = this;
                return self.tableData;
            }
        },
        methods: {
            investList() {
                let self = this;
                this.is_search = true;
                let enumStatus = {0: "未开始", 1: "进行中", 2: "已结束"};

                let params = {
                    pageNo: self.cur_page,
                    industry: self.industry,
                    type: self.type,
                    status: self.status
                };
                investList(params).then((res) => {
                    res.data.result.data.forEach(function (element) {
                        element.money = element.money / 100 + "元";
                        element.day = element.day  + "天";
                        element.status = enumStatus[element.status];
                        element.startTime = new Date(element.startTime).toLocaleString();
                        element.expireTime = new Date(element.expireTime).toLocaleString();
                        element.expectedIncome = element.expectedIncome / 100 + "元";
                    });
                    self.tableData = res.data.result.data;
                    self.total_count = res.data.result.total;
                });
            },
            handleAddInvest() {
                const self = this;
                self.$router.push({path: '/createInvest'})
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.investList();
            }
        }
    }
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
        float: right;
    }
</style>
