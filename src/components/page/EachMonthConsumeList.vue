<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>每月消费数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="month" label="月份" width="300"></el-table-column>
            <el-table-column prop="totalFee" label="总消费金额" width="255"></el-table-column>
            <el-table-column label="操作" width="475" prop="id">
                <template scope="scope">
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
    import {eachMonthConsumeList} from '../../api/getData';
    import ElHeader from "../../../node_modules/element-ui/packages/header/src/main.vue";

    export default {
        components: {ElHeader},
        data() {
            return {
                tableData: [],
                fee: '',
                platformName: '',
                month: '',
                totalFee: '',
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
                eachMonthConsumeList(params).then((res) => {
                    res.data.result.data.forEach(function (element) {
                        element.totalFee = element.totalFee / 100 + "元";
                    });
                    self.tableData = res.data.result.data;
                    self.total_count = res.data.result.total;
                });
            },
            createConsume() {
                const self = this;
                self.$router.push({path: '/createConsume'})
            },

            handleCurrentChange(val) {
                this.cur_page = val;
                this.consumeList();
            }
        }
    }
</script>

<style scoped>

</style>
