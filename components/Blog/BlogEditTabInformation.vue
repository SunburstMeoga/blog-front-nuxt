<template>
    <div class="container custom-container">
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
</style>