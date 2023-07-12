<template>
    <div>
        <div class="container">
            <div class="blog-module  mt-10">
                <div class="module-title">封面图片</div>
                <div class="module-content">
                    <!-- <el-upload class="avatar-uploader" :limit="1" :action="imgUploadUrl" :show-file-list="false"
                        :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload" :headers="headerObj"
                        :on-remove="handleRemove">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->

                    <el-image class="avatar avatar-uploader el-upload" :src="blogDetailsData.image_url" fit="cover">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                    <!-- <el-upload :limit="1" :action="imgUploadUrl" list-type="picture-card" :on-success="handleCoverSuccess"
                        :headers="headerObj" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload> -->
                </div>
            </div>
            <div class="blog-module">
                <div class="module-title">
                    blog分类
                </div>
                <div class="module-content">
                    <el-select v-model="categoryIds" multiple placeholder="请选择" @change="categoryIdsChange">
                        <el-option v-for="item in categorysList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="blog-module">
                <div class="module-title">
                    blog标题
                </div>
                <div class="module-content">
                    <el-input v-model="blogDetailsData.title" placeholder="请输入标题"></el-input>
                </div>
            </div>
            <div class="blog-module">
                <div class="module-title">
                    blog内容
                </div>
                <div class="module-content">
                    <blog-edit-tab-information ref="editBlog" />
                </div>
            </div>

            <div class="blog-module">
                <div class="module-title">
                    Slug
                </div>
                <div class="module-content">
                    <el-input v-model="blogDetailsData.title" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="blog-module">
                <div class="module-title">
                    Tags
                </div>
                <div class="module-content">
                    <el-select v-model="tagsIds" multiple placeholder="请选择" @change="tagIdsChange">
                        <el-option v-for="item in tagsList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="button-group">
                <div>
                    <el-button @click="handleBlogs" type="primary" :disabled="loadingHandle || creatSccess"
                        :loading="loadingHandle">
                        {{ creatSccess ? '已提交成功' : (loadingHandle ? '正在提交...' : (createFail ? '提交失败，请重新期缴' : '确认修改')) }}
                    </el-button>
                </div>
                <!-- <div class="sm:ml-12"><el-button>取消</el-button></div> -->
            </div>
        </div>

        <footer-one />
    </div>
</template>

<script>

import BlogEditTabInformation from '../../../components/Blog/BlogEditTabInformation';
import FooterOne from "../../../components/Utility/Footer/FooterOne.vue";
import uslug from 'uslug'
export default {
    components: { BlogEditTabInformation, FooterOne },
    data: () => ({
        blogTitle: '',
        blogSlug: '',
        imageUrl: '',
        imgUploadUrl: '',
        categorysList: [],
        tagsList: [],
        categoryValue: [],
        tagValue: [],
        headerObj: {},
        loadingHandle: false,
        dialogImageUrl: '',
        dialogVisible: false,
        createFail: false,
        creatSccess: false,
        imageFile: null,
        blogId: '',
        categoryIds: [],
        tagsIds: [],
        blogDetailsData: {}
    }),
    async asyncData({ $blogApi, params }) {
        const { categories, tags } = await $blogApi.getOptions({ tags: true, categories: true })
        let categoriesArray = []
        let tagsArray = []
        tags.map(item => {
            let obj = {}
            obj.label = item
            obj.value = item
            tagsArray.push(obj)
        })
        categories.map(item => {
            let obj = {}
            obj.label = item.slug
            obj.value = item.id
            categoriesArray.push(obj)
        })
        if (params.id) {
            return { tagsList: tagsArray, categorysList: categoriesArray, blogId: params.id }
        }
        return { tagsList: tagsArray, categorysList: categoriesArray }
    },
    create() {
        this.imgUploadUrl = process.env.BASE_URL + "/api/image";
        this.headerObj = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
        // console.log('imgUploadUrl', this.imgUploadUrl)
    },
    watch: {
        'blogDetailsData.blogTitle'(newVal, oldVal) {
            if (newVal) {
                console.log(newVal)
                this.blogDetailsData.blogSlug = uslug(newVal)
                console.log(this.blogDetailsData.blogSlug)
            }
        }
    },
    mounted() {
        this.getBlogsDetails()
    },
    methods: {
        getBlogsDetails() {
            this.$blogApi.getBlogDetails({ id: this.blogId })
                .then(res => {
                    console.log(res)
                    this.blogDetailsData = res.data
                    const { categoryIds, content, tags } = res.data
                    this.$refs.editBlog.content = content
                    this.categoryIds = categoryIds
                    this.tagsIds = tags
                })
                .catch(err => {
                    console.log(err)
                })
        },
        tagIdsChange(value) {
            this.tagsIds = value
        },
        categoryIdsChange(value) {
            console.log('categoryIdsChange', value)
            this.categoryIds = value
            console.log('categoryIds', this.categoryIds)
        },
        handleBlogs() {
            this.createBlogs()
        },
        createBlogs() {
            this.loadingHandle = true
            let blogObj = {}
            blogObj.categoryIds = this.categoryIds
            blogObj.tagsIds = this.tagsIds
            blogObj.id = this.blogDetailsData.id
            blogObj.slug = this.blogDetailsData.slug
            blogObj.title = this.blogDetailsData.title
            blogObj.content = this.$refs.editBlog.content

            console.log('blogObj', blogObj)
            // return
            // this.categoryIds.map(item => {
            //     formdata.append('categoryIds[]', item)
            // })
            // this.tagsIds.map(item => {
            //     formdata.append('tagIds[]', item)
            // })
            // formdata.append('image', this.imageFile)
            // formdata.append('title', this.blogTitle)
            // formdata.append('slug', this.blogSlug)
            // formdata.append('content', this.$refs.editBlog.content)
            // formdata.append('id', this.blogId)
            this.$blogApi.createOrUpdateBlogs(blogObj).then(res => {
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
            this.imageFile = file.raw
        },
    }
}
</script>

<style scoped>
.blog-module {
    display: block;
    margin-top: 20px;
}

.module-title {
    width: 100%;
    font-weight: bold;
    margin-top: 10px;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;
}

@media (min-width:640px) {
    .blog-module {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 30px;
    }

    .module-title {
        width: 13%;
    }

    .module-content {
        flex: 1;
    }
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
    position: relative;
}

.disabled {}

.el-upload--picture-card {
    display: none;
}
</style>