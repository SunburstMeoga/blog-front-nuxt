<template>
    <div>
        <div class="container">
            <div class="blog-module  mt-10">
                <div class="module-title">封面图片</div>
                <div class="flex-1">
                    <el-upload class="avatar-uploader" :action="imgUploadUrl" :http-request="httpRequest"
                        :show-file-list="false" :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload"
                        :headers="headerObj">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <div class="blog-module">
                <div class="module-title">
                    blog分类
                </div>
                <div class="flex-1">
                    <el-select v-model="categoryValue" multiple placeholder="请选择">
                        <el-option v-for="item in categorysList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="blog-module">
                <div class="module-title">
                    blog标题
                </div>
                <div class="flex-1">
                    <el-input v-model="blogTitle" placeholder="请输入标题"></el-input>
                </div>
            </div>
            <div class="blog-module">
                <div class="module-title">
                    blog内容
                </div>
                <div class="editor-box flex-1">
                    <blog-edit-tab-information />
                </div>
            </div>

            <div class="blog-module">
                <div class="module-title">
                    Slug
                </div>
                <div class="flex-1">
                    <el-input v-model="blogTitle" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="blog-module">
                <div class="module-title">
                    Tags
                </div>
                <div class="flex-1">
                    <el-select v-model="slugValue" multiple placeholder="请选择">
                        <el-option v-for="item in categorysList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="flex justify-between items-center mb-4 sm:justify-end">
                <div><el-button type="primary" :loading="true">发布</el-button></div>
                <div class="sm:ml-12"><el-button>取消</el-button></div>
            </div>
        </div>

        <footer-one />
    </div>
</template>

<script>

import BlogEditTabInformation from '../../components/Blog/BlogEditTabInformation';
import FooterOne from "../../components/Utility/Footer/FooterOne.vue";

export default {
    components: { BlogEditTabInformation, FooterOne },
    data: () => ({
        blogTitle: '',
        imageUrl: '',
        imgUploadUrl: '',
        categorysList: [],
        categoryValue: '',
        slugValue: '',
        headerObj: {}

    }),
    async asyncData({ $blogApi }) {
        const { data } = await $blogApi.getBlogCategories()
        let array = []
        data.docs.map(item => {
            let obj = {}
            obj.label = item.slug
            obj.value = item.id
            array.push(obj)
        })
        console.log(data)
        return { categorysList: array }
    },
    create() {
        this.imgUploadUrl = process.env.BASE_URL + "/api/image";
        this.headerObj = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
        // console.log('imgUploadUrl', this.imgUploadUrl)
    },
    methods: {
        handleCoverSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            var formdata = new FormData()
            formdata.append('filename', file)
            formdata.append('name', 'filename')
            formdata.append('desc', 'desc')
            console.log('formdata', formdata)
            this.$blogApi.uploadImage({ image_path: formdata }).then(res => {
                this.$message.success('文件上传成功')
                console.log(res)
                // if (res.data.code === 100) {
                //     this.$message.success('文件上传成功')
                //     console.log(res)
                // } else {
                //     this.$message.error('文件上传失败')
                // }
            })
        },
        httpRequest(params) {
            console.log(params.file)//拿到上传的文件
            var formdata = new FormData()
            formdata.append('filename', params.file)
            formdata.append('name', 'filename')
            formdata.append('desc', 'desc')
            console.log('formdata', formdata)
            console.log()
            this.$blogApi.uploadImage({ image_path: formdata }).then(res => {
                this.$message.success('文件上传成功')
                console.log(res)
                // if (res.data.code === 100) {
                //     this.$message.success('文件上传成功')
                //     console.log(res)
                // } else {
                //     this.$message.error('文件上传失败')
                // }
            })
        },
        beforeCoverUpload(file) {
            console.log('file', file)
            // const isJPG = file.type === 'image/jpeg';
            // const isLt2M = file.size / 1024 / 1024 < 2;
            // console.log('file', file)

            // // if (!isJPG) {
            // //     this.$message.error('上传头像图片只能是 JPG 格式!');
            // // }
            // if (!isLt2M) {
            //     this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isLt2M;
        }
    }
}
</script>

<style scoped>
.blog-module {
    @apply flex justify-start items-start mb-10;
}

.module-title {
    @apply w-2/12 font-bold;
}

.el-select {
    width: 100%;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>