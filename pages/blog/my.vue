<template>
    <div>
        <about :blogsData="blogsData" :underReviewData="underReviewData" :toBeReleasedData="toBeReleasedData"
            @handleRelease="handleRelease" :blogsList="blogsList" :underReviewList="underReviewList"
            :toBeReleasedList="toBeReleasedList" @handleShowMore="handleShowMore" />
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
            blogsList: [],
            underReviewList: [],
            toBeReleasedList: [],
            selected: 'latest',
            isLoading: false,
            loadingFail: false
        }
    },
    async asyncData({ $userApi }) {
        let blogsData = await $userApi.getUserBlogs({ perPage: 6 })
        let underReviewData = await $userApi.getUserBlogs({ perPage: 6, is_approved: false, is_published: false })
        let toBeReleasedData = await $userApi.getUserBlogs({ perPage: 6, is_approved: true, is_published: false })
        console.log(blogsData.data, underReviewData.data, toBeReleasedData.data)
        return {
            blogsData: blogsData.data,
            underReviewData: underReviewData.data,
            toBeReleasedData: toBeReleasedData.data,
            blogsList: blogsData.data.docs,
            underReviewList: underReviewData.data.docs,
            toBeReleasedList: toBeReleasedData.data.docs
        }
    },
    methods: {
        handleRelease(item) {
            this.showConfirmBox(item.id)
        },
        handleShowMore(selected) {
            // latest publish news
            // { perPage: 6, page: this.blogsData.page + 1, is_approved: isApproved, is_published: isPublished }
            if (this.isLoading) {
                this.$message('正在加载，请稍后...');
                return
            }
            this.loadingFail = false
            console.log('handleShowMore', selected)
            this.selected = selected
            let blogsObj = {}
            if (selected === 'latest') {
                if (!this.blogsData.hasNextPage) {
                    this.$message.error('无更多数据');
                    return
                }
                blogsObj = { perPage: 6, page: this.blogsData.page + 1 }

            } else if (selected === 'publish') {
                if (!this.toBeReleasedData.hasNextPage) {
                    this.$message.error('无更多数据');
                    return
                }
                blogsObj = { perPage: 6, page: this.toBeReleasedData.page + 1, is_approved: true, is_published: false }
            } else {
                if (!this.underReviewData.hasNextPage) {
                    this.$message.error('无更多数据');
                    return
                }
                blogsObj = { perPage: 6, page: this.underReviewData.page + 1, is_approved: false, is_published: false }
            }
            this.loadMoreBlogs(blogsObj)
        },
        loadMoreBlogs(blogsObj) {
            this.isLoading = true
            this.$userApi.getUserBlogs(blogsObj)
                .then(res => {
                    if (this.selected === 'latest') {
                        this.blogsData = res.data
                        res.data.docs.map(item => {
                            this.blogsList.push(item)
                        })
                    } else if (this.latest === 'publish') {
                        this.toBeReleasedData = res.data
                        res.data.docs.map(item => {
                            this.toBeReleasedList.push(item)
                        })
                    } else {
                        this.underReviewData = res.data
                        res.data.docs.map(item => {
                            this.underReviewList.push(item)
                        })
                    }
                    this.isLoading = false
                })
                .catch(err => {
                    this.$message({
                        message: '加载失败，请重新加载',
                        type: 'warning'
                    });
                    this.isLoading = false
                    this.loadingFail = true
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
                                _self.toPublishBlog(blogId)
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
  