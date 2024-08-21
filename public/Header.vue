<script>

</script>
<template>
<header>
    <div class="content">
    <h1 id="title">GR Smart Lighting⚡</h1>
    <small><em>it's next generation the way of lighting. <br>but just a demo now...</em></small>
    <br>
    <small>let's try it.</small>
    <nav id="nav">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">设备</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/group'}">设备组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/control'}">设备控制</el-breadcrumb-item>
    </el-breadcrumb>
    </nav>
    </div>
</header>
</template>
<style>
#title {
    font-size: 1cm;
}

#nav {
    margin-top: 20px;
    margin-bottom: 40px;
}
header {
    position: relative;
    height: 100%;
}
header> .content{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
</style>

