<template>

        <van-grid square :column-num="5" id="nav">
            <van-grid-item
                    v-for="(value,index) in nav_list"
                    :key="index"
                    :icon="value.icon_url"
                    :text="value.name"
                    :to="{ path: '/dashboard/category', query: { index: index }}"
            />
        </van-grid>

</template>

<script>
    export default {
        name: "Nav",
        props:{
            nav_list:Array
        }
    }
</script>

<style scoped>
#nav >>>.van-grid-item__content{
    padding:0;
}
</style>