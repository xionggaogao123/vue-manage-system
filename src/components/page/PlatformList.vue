<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>平台列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-button type="primary" icon="add" @click="getEachMontyConsumeData()">每月收入数据</el-button>
            <el-button type="primary" icon="add" @click="createPlatform()">新增理财平台</el-button>
        </div>

        <el-table :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="平台名称" width="120"></el-table-column>
            <el-table-column prop="yesterdayIncome" label="昨日收益" width="90"></el-table-column>
            <el-table-column prop="totalIncome" label="累计收益" width="90"></el-table-column>
            <el-table-column prop="totalMoney" label="总金额" width="150"></el-table-column>
            <el-table-column prop="incomeReturn" label="年收益率" width="100"></el-table-column>
            <el-table-column prop="incomeReturn" label="月收益率" width="96"></el-table-column>
            <el-table-column prop="incomeReturn" label="日收益率" width="90"></el-table-column>
            <el-table-column label="操作" width="302" prop="id">
                <template scope="scope">
                    <el-button size="small"  @click="addIncome(scope.row.id)">添加昨日收益</el-button>
                    <el-button size="small"  @click="handleEditPlatform(scope.row.id, scope.$index, scope.row)">编辑</el-button>
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
    import {platformList,createPlatform} from '../../api/getData';
    import ElHeader from "../../../node_modules/element-ui/packages/header/src/main.vue";

    export default {
        components: {ElHeader},
        data() {
            return {
                tableData: [],
                name: '',
                totalBalance: '',
                createTime: '',
                incomeReturn: '',
                monthReturn: '',
                dayReturn: '',
                totalMoney: '',
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
            this.getPlatformListData(this.industry, this.type, this.status);
        },
        computed: {
            data() {
                const self = this;
                return self.tableData;
            }
        },
        methods: {
            getPlatformListData() {
                let self = this;
                this.is_search = true;
                let enumStatus = {0: "未开始", 1: "进行中", 2: "已结算"};

                let params = {
                    pageNo: self.cur_page,
                    industry: self.industry,
                    type: self.type,
                    status: self.status
                };
                platformList(params).then((res) => {
                    res.data.result.data.forEach(function (element) {
                        element.incomeReturn = element.incomeReturn / 100 + "%";
                        element.monthReturn = element.monthReturn / 100 + "%";
                        element.dayReturn = element.dayReturn / 100 + "%";
                        element.status = enumStatus[element.status];
                        element.createTime = new Date(element.createTime).toLocaleString();
                        element.yesterdayIncome = element.yesterdayIncome / 100 + "元";
                        element.totalMoney = element.totalMoney / 100 + "元";
                    });
                    self.tableData = res.data.result.data;
                    self.total_count = res.data.result.total;
                });
            },

            createPlatform() {
                const self = this;
                self.$router.push({path: '/createPlatform'})
            },
            addIncome(id) {
                const  self = this;
                console.log(id);
                self.$router.push({path: '/createIncome', query: {platformId: id}});
            },
            handleEditPlatform(id){
                const self = this;
                self.$router.push({path: '/updatePlatform', query: {id: id}});
            },
            handleDelete(taskid) {
                deleteTask(taskid).then((res) => {
                    console.log(res);
                    this.getPlatformListData();
                });
            },
            getEachMontyConsumeData() {
                const self = this;
                self.$router.push( '/platformData');
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getPlatformListData();
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
