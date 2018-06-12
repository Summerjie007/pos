<template>
<!-- //Vue 2.0版本需要一个跟组件 -->
  <div class="pos">
  <h1>{{msg}}</h1>


  </div>
</template>

<script>
export default {
  name: 'Pos',
  data () {
    return {
      msg: 'hello  vue  Pos 系统'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
