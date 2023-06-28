<template>
    <div>
        <about :blogsData="blogsData" :underReviewData="underReviewData" :toBeReleasedData="toBeReleasedData"
            @handleRelease="handleRelease" />
    </div>
</template>
  
<script>
import About from "../../components/About/index";
export default {
    components: { About },
    data() {
        return {
            blogsData: {},
            underReviewData: {},
            toBeReleasedData: {},
        }
    },
    async asyncData({ $userApi }) {
        let blogsData = await $userApi.getUserBlogs({ perPage: 6 })
        let underReviewData = await $userApi.getUserBlogs({ perPage: 6, is_approved: false, is_published: false })
        let toBeReleasedData = await $userApi.getUserBlogs({ perPage: 6, is_approved: true, is_published: false })
        console.log(blogsData.data, underReviewData.data, toBeReleasedData.data)
        return { blogsData: blogsData.data, underReviewData: underReviewData.data, toBeReleasedData: toBeReleasedData.data }
    },
    methods: {
        handleRelease(item) {
            this.showConfirmBox(item.id)
        },
        addBlogIdToContract(blogId) {
            let web3Contract = new this.Web3.eth.Contract(this.Config.con_abi, this.Config.con_addr)
            web3Contract.methods.addBlogId(blogId)
                .send({ from: window.ethereum.selectedAddress || this.$store.state.auth.walletAddress })
                .on('transationHash', (hash) => {
                    console.log('hash', hash)
                })
                .on('receipt', (receipt) => {
                    console.log('receipt', receipt)
                })
                .then((res) => {
                    console.log('addBlogId成功', res)
                    // this.toPublishBlog(blogId)
                    return res
                })
                .catch(err => {
                    console.log('addBlogId失败', err)
                    return err
                })
        },
        toPublishBlog(blogId) {
            this.$blogApi.publisBlog({ blog_id: blogId })
                .then(res => {
                    console.log('publish blog success', res)
                    this.$message({
                        message: '已发布',
                        type: 'success'
                    });
                })
                .catch(err => {
                    console.log('publish blog fail', err)
                    this.$message.error('发布失败，请重新发布');

                    return err
                })
        },
        showConfirmBox(blogId) {
            let _self = this
            this.$confirm('该操作将会上传您的文章到hah主链，并会在本网站进行展示以供其他用户查阅并评论。', '是否确认发布你的Blog', {
                closeOnClickModal: false,
                closeOnPressEscape: false,
                beforeClose: async function (action, instance, done) {
                    if (action === 'cancel' || action === 'close') {
                        done()
                    } else {
                        console.log('instance', instance)
                        instance.confirmButtonLoading = true
                        instance.confirmButtonText = '正在发布'
                        let web3Contract = new _self.Web3.eth.Contract(_self.Config.con_abi, _self.Config.con_addr)
                        web3Contract.methods.addBlogId(blogId)
                            .send({ from: window.ethereum.selectedAddress || _self.$store.state.auth.walletAddress })
                            .on('transationHash', (hash) => {
                                console.log('hash', hash)
                            })
                            .on('receipt', (receipt) => {
                                console.log('receipt', receipt)
                            })
                            .then((res) => {
                                _self.toPublishBlog({ blog_id: blogId })
                                done()
                            })
                            .catch(err => {
                                this.$message.error('发布失败，请重新发布');
                                done()
                            })
                    }
                },
                confirmButtonText: '发布',
                cancelButtonText: '取消',
                // type: 'info',
                center: true
            }).then(() => {
                // this.getLoginToken()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
    }
};
</script>
  
<style></style>
  