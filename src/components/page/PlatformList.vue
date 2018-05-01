<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>后台管理</el-breadcrumb-item>
                <el-breadcrumb-item>投资记录管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box-search">
            <el-select v-model="industry" placeholder="选择行业" class="handle-select mr10">
                <el-option key="0" value="">--请选择--</el-option>
                <el-option key="1" label="理财" value="1">理财</el-option>
                <el-option key="2" label="游戏" value="2">游戏</el-option>
            </el-select>

            <el-select v-model="type" placeholder="选择类型" class="handle-select mr10">
                <el-option key="0" value="">--请选择--</el-option>
                <el-option key="1" label="截图" value="1">截图</el-option>
                <el-option key="2" label="下载" value="2">下载</el-option>
            </el-select>

            <el-select v-model="status" placeholder="选择状态" class="handle-select mr10">
                <el-option key="0" value="">--请选择--</el-option>
                <el-option key="1" label="未开始" value="0">未开始</el-option>
                <el-option key="2" label="正在进行中" value="1">正在进行中</el-option>
                <el-option key="3" label="已结束" value="2">已结束</el-option>
            </el-select>

            <el-button type="primary" icon="search" @click="searchTask()">搜索</el-button>
        </div>

        <div class="handle-box">
            <el-button type="primary" icon="add" @click="handleAddMoney()">新增理财平台</el-button>
        </div>

        <el-table :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="平台名称" width="100"></el-table-column>
            <el-table-column prop="type" label="平台类型" width="100"></el-table-column>
            <el-table-column prop="incomeReturn" label="年收益率" width="100"></el-table-column>
            <el-table-column prop="monthReturn" label="月收益率" width="90"></el-table-column>
            <el-table-column prop="dayReturn" label="日收益率" width="90"></el-table-column>
            <el-table-column prop="yesterdayIncome" label="昨日收益" width="90"></el-table-column>
            <el-table-column prop="totalIncome" label="累计收益" width="90"></el-table-column>
            <el-table-column prop="totalMoney" label="总金额" width="150"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作" width="90" prop="id">
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
    import {platformList} from '../../api/getData';

    export default {
        data() {
            return {
                tableData: [],
                name: '',
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
                    console.log(res.data);
                    res.data.result.data.forEach(function (element) {
                        element.incomeReturn = element.incomeReturn / 100 + "%";
                        element.monthReturn = element.monthReturn / 100 + "%";
                        element.dayReturn = element.dayReturn / 100 + "%";
                        element.status = enumStatus[element.status];
                        element.createTime = new Date(element.createTime).toLocaleString();
                        element.totalMoney = element.totalMoney / 100 + "元";
                    });
                    self.tableData = res.data.result.data;
                    self.total_count = res.data.result.total;
                });
            },

            handleAddMoney() {
                const self = this;
                self.$router.push({path: '/tasklicaicreate'})
            },
            handleEdit(taskId, index, row) {
                const self = this;
                self.$router.push({path: '/taskedit', query: {taskId: taskId}});
            },
            handleDelete(taskid) {
                deleteTask(taskid).then((res) => {
                    console.log(res);
                    this.getPlatformListData();
                });
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

    .handle-box-search {
        margin-bottom: 20px;
        float: left;
    }
</style>
