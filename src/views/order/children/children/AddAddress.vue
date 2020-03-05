<template>
    <div id="addAddress">
        <van-nav-bar
                title="添加地址"
                left-arrow
                @click-left="onClickLeft"
                class="nav-bar"
                :fixed=true
                :border=true
        ></van-nav-bar>
        <van-address-edit
                 class="edit"
                :area-list="areaList"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        ></van-address-edit>
    </div>
</template>

<script>
    export default {
        name: "AddAddress",
        data() {
            return {
                areaList:{},
                searchResult: []
            }
        },

        methods: {
            onSave() {
                Toast('save');
            },
            onDelete() {
                Toast('delete');
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                        name: '黄龙万科中心',
                        address: '杭州市西湖区'
                    }];
                } else {
                    this.searchResult = [];
                }
            },
            onClickLeft()
            {
                this.$router.go(-1);
            }

        }
    }
</script>

<style scoped>
#addAddress{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 9999;

}
.edit{
   margin-top: 3.15rem;

}
</style>