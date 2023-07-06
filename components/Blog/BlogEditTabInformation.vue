<template>
    <div>
        <el-upload class="avatar-uploader uploader" :action="uploadUrl" :headers="headerObj" name="image"
            :show-file-list="false" :on-success="uploadSuccess">
        </el-upload>
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
            headerObj: {},
            uploadUrl: '',
            quill: null,
            editorOption: {
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
    creat() {
        this.headerObj = {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
        this.uploadUrl = process.env.BASE_URL + "/api/image";
    },
    methods: {
        handleRemove(file, fileList) {
            // console.log(file, fileList)
        },
        handlePreview(file) {
            // console.log(file)
        },
        onEditorBlur(editor) {
            // console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            // console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            // console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            console.log(html)
            this.content = html
        },
        imgHandler(handle) {
            this.quill = handle.quill
            document.querySelector(".uploader input").click();
        },
        async uploadSuccess(res, file) {
            console.log(file)
            let formdata = new FormData()
            formdata.append('image', file.raw)
            const { data } = await this.$blogApi.uploadImage(formdata)
            if (data) {
                this.doUpload(data.image_path)
            } else {
                this.$message.error("图片插入失败！");
            }
        },
        doUpload: async function (imagePath) {
            let length = this.quill.getSelection().index;
            this.quill.setSelection(length + 1);
            this.quill.insertEmbed(length, 'image', imagePath)
        },
    },
}
</script>


<style>
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
    display: none;
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