<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 理财管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加消费记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box">

            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="消费金额" prop="name">
                    <el-input v-model="form.fee" style="width: 200px"></el-input>
                    元
                </el-form-item>

                <el-form-item label="消费渠道">
                    <el-select v-model="form.platformId" placeholder="请选择">
                        <el-option v-for="item in platformsSelect" :key="item.id" :value="item.id"
                                   :label="item.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注信息" prop="name">
                    <el-input v-model="form.remark" style="width: 200px"></el-input>
                    元
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="createConsume(form)">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>


<script>
    import {createConsume, platformAllList} from '../../api/getData';
    import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";

    export default {
        components: {ElOption},
        data: function () {
            return {
                logo: '',
                form: {
                    fee: '',
                    type: '',
                    remark: '',
                    id: '',
                    name: '',
                    platformId: '',
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
            createConsume(form) {
                let newForm ={
                    fee: form.fee * 100,
                    platformId: form.platformId,
                    remark: form.remark
                };
                createConsume(newForm).then((res) => {
                    if (res.data.result) {
                        const self = this;
                        self.$router.push('/consumeList');
                    }
                });
            },
            getData() {

            }
        }
    }
</script>
