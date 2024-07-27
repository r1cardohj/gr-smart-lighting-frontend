<script setup>
const handleClick = () => {
console.log('click')
}

</script>
<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="50" />
      <el-table-column prop="name" label="组名" width="120" />
      <el-table-column prop="description" label="描述" width="120" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            编辑
          </el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<style>
</style>