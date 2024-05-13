<template>
    <div class="altasView">
      <!-- <h1>This is the demo page for Atlas❤️</h1> -->
      <AtlasSidebar class="left"/>
      <AtlasViz class="right-top"/>
      <AtlasLegend class="right-bottom"/>        
    </div>
    <br>
    <!-- <div class="container">
      <header>HEADER</header>
      <nav>NAV</nav>
      <main>MAIN</main>
      <aside>ASIDE</aside>
      <footer>FOOTER</footer>
    </div> -->
</template>
  

<script>
import AtlasSidebar from '@/components/AtlasSidebar.vue'
import AtlasViz from '@/components/AtlasViz.vue'
import AtlasLegend from '@/components/AtlasLegend.vue'

export default {
  name: 'AtlasView',
  components: {
    AtlasSidebar,
    AtlasViz,
    AtlasLegend,
  }
}
</script>

<style>
.altasView{
  display: grid;
  @media{
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}
.left{
  grid-area: 1 / 1 / 6 / 2;
}
.right-top{
  grid-area: 1 / 2 / 5 / 6;
}
.right-bottom{
  grid-area: 5 / 2 / 6 / 6;
}

.container{
  display: grid;
  grid-template-rows: 1fr 5fr 1fr;
  grid-template-columns: 2fr 5fr 3fr;
  grid-template-areas: 
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-gap: .75em;        
  height: 100vh;
  @media(max-width: 768px){
    grid-template-rows: 1fr 1fr 5fr 1fr;
    grid-template-columns: 2fr 5fr 3fr;
    grid-template-areas: 
    "header header header"
    "nav nav nav"
    "main main aside"    
    "footer footer footer";    
  }
  @media(max-width: 480px){
    display: block;
  }
  header{
    grid-area: header;
    background-color: teal; 
  }
  nav{
    grid-area: nav;
    background-color: tomato;
  }
  main{
    grid-area: main;
    background-color: lightblue;
  }
  aside{
    grid-area: aside;
    background-color: orange;
  }
  footer{
    grid-area: footer;
    background-color: lightgreen;
  }
}
</style>