<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人脉管理</el-breadcrumb-item>
                <el-breadcrumb-item>好友列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-button type="primary" icon="add" @click="createUser()">添加联系人</el-button>
        </div>

        <el-table :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="username" label="昵称" width="120"></el-table-column>
            <el-table-column prop="telphone" label="电话号码" width="120"></el-table-column>
            <el-table-column prop="mail" label="邮箱" width="120"></el-table-column>
            <el-table-column prop="sex" label="性别" width="100"></el-table-column>
            <el-table-column prop="birthday" label="生日" width="160"></el-table-column>
            <el-table-column prop="job" label="职业" width="110"></el-table-column>
            <el-table-column prop="type" label="关系" width="120"></el-table-column>
            <el-table-column label="操作" width="150" prop="id">
                <template scope="scope">
                    <el-button size="small" @click="handleEditPlatform(scope.row.id, scope.$index, scope.row)">编辑
                    </el-button>
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
    import {userList, createUser} from '../../api/getData';
    import ElHeader from "../../../node_modules/element-ui/packages/header/src/main.vue";

    export default {
        components: {ElHeader},
        data() {
            return {
                tableData: [],
                username: '',
                telphone: '',
                mail: '',
                sex: '',
                birthday: '',
                job: '',
                type: '',
                desc: '',
                select_word: '',
                del_list: [],
                is_search: false,
                cur_page: 1,
                total_count: 0
            }
        },
        created() {
            this.getUserListData();
        },
        computed: {
            data() {
                const self = this;
                return self.tableData;
            }
        },
        methods: {
            getUserListData() {
                let self = this;
                this.is_search = true;
                let typeEnums = {1: "家人", 2: "好友", 3: "同学"};

                let params = {
                    pageNo: self.cur_page,
                    type: self.type,
                };
                userList(params).then((res) => {
                    res.data.result.data.forEach(function (element) {
                        element.birthday = new Date(element.birthday).toLocaleString();
                        element.type = typeEnums[element.type];
                    });
                    self.tableData = res.data.result.data;
                    self.total_count = res.data.result.total;
                });
            },
            createUser() {
                const self = this;
                self.$router.push({path: '/createUser'})
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getUserListData();
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
