<template>
    <div>
        <div class="container">
            <div class="blog-module  mt-10">
                <div class="module-title">封面图片</div>
                <div class="flex-1">
                    <el-upload class="avatar-uploader" :action="imgUploadUrl" :show-file-list="false"
                        :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload">
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
        slugValue: ''
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
    mounted() {
        this.imgUploadUrl = process.env.BASE_URL + "/api/admin/image";
        console.log('imgUploadUrl', this.imgUploadUrl)

    },
    methods: {
        handleCoverSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.imageUrl)
            console.log('this.imageUrl', file)
        },
        beforeCoverUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            console.log('imgUploadUrl', this.imgUploadUrl)

            // if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },

        handleEditorFocus(event) {
            // console.log(event);
            // event.enable(true)
            // if (this.textLength >= this.maxLength) {
            //   event.enable(false) // 在获取焦点的时候禁用
            // }
        },
        handleEditorChange(event) {
            // this.textLength = event.text.length - 1
            // if (this.textLength >= this.maxLength) {
            //   event.quill.enable(false)
            //   return
            // }
            this.$emit('change', event)
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
</style>