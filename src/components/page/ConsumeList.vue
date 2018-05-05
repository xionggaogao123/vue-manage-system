<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>消费明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-button type="primary" icon="add" @click="getEachMontyConsumeData">每月消费数据</el-button>
            <el-button type="primary" icon="add" @click="createConsume()">新增消费记录</el-button>
        </div>

        <el-table :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fee" label="消费金额" width="180"></el-table-column>
            <el-table-column prop="platformName" label="支付渠道" width="155"></el-table-column>
            <el-table-column prop="createTime" label="消费时间" width="200"></el-table-column>
            <el-table-column prop="remark" label="备注" width="200"></el-table-column>
            <el-table-column label="操作" width="302" prop="id">
                <template scope="scope">
                    <el-button size="small"  @click="handleEditPlatform(scope.row.id, scope.$index, scope.row)">编辑</el-button>
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
    import {consumeList} from '../../api/getData';
    import ElHeader from "../../../node_modules/element-ui/packages/header/src/main.vue";

    export default {
        components: {ElHeader},
        data() {
            return {
                tableData: [],
                fee: '',
                platformName: '',
                remark: '',
                createTime: '',
                select_word: '',
                del_list: [],
                is_search: false,
                cur_page: 1,
                total_count: 0
            }
        },
        created() {
            this.consumeList();
        },
        computed: {
            data() {
                const self = this;
                return self.tableData;
            }
        },
        methods: {
            consumeList() {
                let self = this;
                this.is_search = true;

                let params = {
                    pageNo: self.cur_page,
                };
                consumeList(params).then((res) => {
                    res.data.result.data.forEach(function (element) {
                        element.fee = element.fee / 100 + "元";
                        element.createTime = new Date(element.createTime).toLocaleString();
                    });
                    self.tableData = res.data.result.data;
                    self.total_count = res.data.result.total;
                });
            },
            createConsume() {
                const self = this;
                self.$router.push({path: '/createConsume'})
            },
            getEachMontyConsumeData() {
                const self = this;
                self.$router.push({path: '/eachMonthConsume'})
            },

            handleCurrentChange(val) {
                this.cur_page = val;
                this.consumeList();
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
