<template>
  <q-page class="column items-center justify-center">
    <q-btn color="purple" @click="addValue">新增数据</q-btn>

  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'IndexPage'
});
function addValue() {
  window.db.saveValue({
    type: 'goods',
    data: {
      ordername: '测试',
      specification: '测试',
      category: 1
    }
  }).then(res =>{
    console.log(res);
  })
  console.log('添加数据!!!');
}
</script>
