<template>
    <div v-loading="isLoading" :element-loading-text="'上传进度' + progress" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <input class="file" type="file" style="display:none" id="file" ref="input" @change="doUpload">
        <div class="quill-editor" :content="content" @change="onEditorChange($event)" @blur="onEditorBlur($event)"
            style="height: 250px;" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        const self = this
        return {
            content: '',
            isLoading: false,
            progress: 0,
            editorOption: {
                // some quill options
                modules: {
                    toolbar: {
                        container: [
                            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                            ['blockquote', 'code-block'],
                            ['link', 'image'],

                            [{ 'header': 1 }, { 'header': 2 }], // custom button values
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
                            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
                            [{ 'direction': 'rtl' }], // text direction

                            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
                            [{ 'font': [] }],
                            [{ 'align': [] }],

                            ['clean'] // remove formatting button
                        ],
                        handlers: {
                            'image': function () {
                                this.quill.format('image', false)// 禁用quill内部上传图片方法
                                self.imgHandler(this)
                            }
                        }
                    }
                }
            }
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        },
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            console.log('editor change!', editor, html, text)
            this.content = html
        },
        imgHandler(handle) {
            this.quill = handle.quill
            var inputfile = document.getElementById('file')
            inputfile.click()
        },
        doUpload: async function () {
            let file = document.getElementById('file').files[0]
            let formdata = new FormData()// 创建form对象
            formdata.append('file', file, file.name)
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: progressEvent => {
                    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                    this.progress = complete
                }
            } // 添加请求头
            this.isLoading = true
            let res = await this.$blogApi.uploadImage(formdata)
            this.isLoading = false
            console.log(res)
            this.quill.insertEmbed(length, 'image', process.env.BASE_URL + "/api/admin/image" + res.data)
        },
        async update() {
            let params = {
                title: this.form.title,
                publish_time: this.form.publish_time,
                content: this.content,
                event_id: this.event_id
            }
            console.log(params)
            let res = await axios.post('/api/createEvent', params)
            if (res.data.ret) {
                this.$notify.error({
                    message: res.data.errorMsg,
                    title: '错误'
                })
            } else {
                this.$notify({
                    message: res.data.errorMsg,
                    title: '成功',
                    type: 'success'
                })
            }
        }
    },
    async mounted() {

    }
}
</script>


<style>
.blog-module {
    @apply flex justify-start items-start mb-10;
}

.module-title {
    @apply w-2/12 font-bold;
}

.suffix-counter {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 4px;
    height: 80px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
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