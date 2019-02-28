<template>
   <v-layout row class="user-menu">
       <img class="icon" :src="user.avatar">
       <v-layout column>
           <span class="name">{{user.name}}</span>
           <span><i>{{user.email}}</i></span>
       </v-layout>
   </v-layout> 
</template>

<style scoped>
    .user-menu {
        max-width: 300px;
        padding:5px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.5s;
        font-size: 13px;
    }
    .user-menu:hover {
        background-color: white;
    }
    .icon {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        margin-right: 15px;
    }
    .name {
        font-weight: bold;
    }
</style>

<script>
export default {
    props: ['user'],
}
</script>