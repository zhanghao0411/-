<template>
  
    
    <router-view/>
 
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.el-message-box__message p{
    font-size: 20px!important;

  }
  .el-table,.el-menu-item,.el-submenu__title{
    font-size: 12px!important;
  }
 .wrapper{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #324157!important;
    }  
.el-table th{
  text-align: center!important;
}    
</style>
