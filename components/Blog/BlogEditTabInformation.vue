<template>
    <div class="container custom-container">
        <div class="flex">
            <div>封面图片</div>
            <div>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <div class="editor-box mt-10">
            <div class="quill-editor" :content="content" v-quill:myQuillEditor="options" :style="cusStyle"
                :width="toolBarwidth" @change="handleEditorChange">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 内容
        content: {
            type: String,
            default: ''
        },
        // 配置项
        options: {
            type: Object,
            default() {
                return {}
            }
        },
        // 自定义样式
        cusStyle: {
            type: String,
            default: ''
        },
        // 宽度
        toolBarwidth: {
            type: String,
            default: '500px'
        },
        maxLength: {
            type: Number,
            default: 100
        }
    },
    data() {
        return {
            imageUrl: '',
            editorOption: {
                /* quill options */
                modules: {

                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                        ['blockquote', 'code-block'], //引用，代码块
                        [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                        [{ list: 'ordered' }, { list: 'bullet' }], //列表
                        [{ script: 'sub' }, { script: 'super' }], // 上下标
                        [{ indent: '-1' }, { indent: '+1' }], // 缩进
                        [{ direction: 'rtl' }], // 文本方向
                        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
                        [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                        [{ font: [] }], //字体
                        [{ align: [] }], //对齐方式
                        ['link', 'image', 'video']
                        ['clean'], //清除字体样式
                    ],
                }
            }
        }
    },
    mounted() {
        // let quillEditor = document.querySelectorAll('.ql-container')

        // let newArr = Array.from(quillEditor)
        // if (newArr.length < 3) return
        // newArr.forEach(item => {
        //   item.appendChild(this.createSpan())
        // })

        this.$nextTick(() => {
            let quill = document.querySelectorAll('.ql-toolbar')
            Array.from(quill).forEach(item => {
                // item.style.width = this.toolBarwidth
            })
        })

    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        createSpan() {
            let spana = document.createElement('span')
            spana.className = 'suffix-counter'
            let ema = document.createElement('em')
            ema.innerHTML = `${this.textLength}`
            let txt = document.createTextNode(`/${this.maxLength}`)
            spana.appendChild(ema)
            spana.appendChild(txt)
            return spana
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


<style>
.suffix-counter {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 4px;
    height: 40px;
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
}</style>