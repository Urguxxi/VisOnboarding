<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For more information about the author,<br>
      please check out the
      <a href="shannonma.fr" target="_blank" rel="noopener">Shannon's Portfolio</a>.
    </p>
    <h3>Contacts</h3>
    <ul>
      <li><a href="https://www.linkedin.com/in/shannon-ma-34347b221/" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="shannonma84@gmail.com" target="_blank" rel="noopener">Email</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
