<template>
    <div>
        <div class="container">
            <div class="blog-module  mt-10">
                <div class="module-title">封面图片</div>
                <div class="flex-1">
                    <!-- <el-upload class="avatar-uploader" :limit="1" :action="imgUploadUrl" :show-file-list="false"
                        :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload" :headers="headerObj"
                        :on-remove="handleRemove">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <el-upload :limit="1" :action="imgUploadUrl" list-type="picture-card" :on-success="handleCoverSuccess"
                        :before-upload="beforeCoverUpload" :headers="headerObj" :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
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
                <div>
                    <el-button @click="handleBlogs" type="primary" :disabled="loadingHandle || creatSccess"
                        :loading="loadingHandle">
                        {{ creatSccess ? '已发布成功' : (loadingHandle ? '正在发布...' : (createFail ? '发布失败，请重新发布' : '发布')) }}
                    </el-button>
                </div>
                <!-- <div class="sm:ml-12"><el-button>取消</el-button></div> -->
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
        headerObj: {},
        loadingHandle: false,
        dialogImageUrl: '',
        dialogVisible: false,
        createFail: false,
        creatSccess: false,
        imageFile: null
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
        handleBlogs() {
            this.createBlogs()
        },
        createBlogs() {
            this.loadingHandle = true
            console.log(this.imageFile)
            let formdata = new FormData()
            formdata.append('image', this.imageFile)
            formdata.append('title', 'test title')
            formdata.append('slug', 'blog slug')
            formdata.append('content', 'blog内容')
            formdata.append('id', '')
            formdata.append('categoryIds', '64855ba24d11eb48c28fb488')
            formdata.append('categoryIds', '64855ba24d11eb48c28fb488')


            this.$blogApi.createOrUpdateBlogs(formdata).then(res => {
                console.log('发布成功', res)
                this.loadingHandle = false
                this.creatSccess = true
            }).catch(err => {
                console.log('发布失败', err)
                this.loadingHandle = false
                this.createFail = true
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = this.imageUrl;
            this.dialogVisible = true;
        },
        handleCoverSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw)
            // let formdata = new FormData()
            // formdata.append('image', file.raw)
            this.imageFile = file.raw
            // this.$blogApi.uploadImage(formdata).then(res => {
            //     this.$message.success('文件上传成功')
            //     this.imageUrl = res.data.image_path
            //     // console.log('imageUrl', this.imageUrl)
            // })
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

.disabled {}

.el-upload--picture-card {
    display: none;
}
</style>