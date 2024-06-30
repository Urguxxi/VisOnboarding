<template>
    <div class="altasView">
      <AtlasSidebar class="left" @cid-selection-changed="updateSelectedCIDs" ref="sidebarComponent"/>
      <AtlasLegend class="right-bottom" :visualization-mode="visualizationMode" @visualization-mode-changed="updateActiveVisualizationMode"/>
      <IntroTitle class="right-top" :isChecked="isHexVizActive" @toggleChanged="handleToggle" @hexClicked="handleHexClick" @backToAtlas="handleBackToAtlas"/>
      <component class="right-top" :is="currentComponent" :selected-cids="selectedCIDs" :visualization-mode="visualizationMode" :display-config="currentDisplayConfig" @toggleChanged="handleToggle" />        
    </div>
    <br>
</template>
  

<script>
import AtlasSidebar from '@/components/AtlasSidebar.vue'
import AtlasViz from '@/components/AtlasViz.vue'
import AtlasLegend from '@/components/AtlasLegend.vue'
import HexViz from '@/components/HexViz.vue'
import IntroTitle from '@/components/IntroTitle.vue'

export default {
  name: 'AtlasView',
  components: {
    AtlasSidebar,
    AtlasViz,
    AtlasLegend,
    HexViz,
    IntroTitle,
  },
  data(){
    return{
      currentComponent:'AtlasViz',
      isHexVizActive: false,
      selectedCIDs:[],
      visualizationMode:{
        futureProjection: false,
        confidence: false,
        observedTrend: false,
        attribution: false,
      }
    }
  },
  watch: {
    visualizationMode: {
      handler(newValue) {
        console.log('Updated visualizationMode:', newValue);
      },
      deep: true  // This ensures the watcher triggers even for nested property changes
    },
    selectedCIDs:{
      handler(newValue) {
        console.log('Updated selectedCIDs:', newValue);
      },
      deep: true  // This ensures the watcher triggers even for nested property changes
    }
  },
  computed:{
    currentDisplayConfig(){
      // generate a configuration based on the selected CIDs and visualization mode
      // return this.generateDisplayConfig(this.selectedCIDs, this.visualizationMode);
      return this.generateDisplayConfig();
    }
  },
  methods:{
    handleHexClick(){
      this.currentComponent = 'HexViz';
    },
    handleBackToAtlas(){
      this.currentComponent = 'AtlasViz';
    },
    handleToggle(){
      this.isHexVizActive = !this.isHexVizActive;
      this.currentComponent = this.currentComponent === 'AtlasViz' ? 'HexViz':'AtlasViz';
      this.resetAllStates();
    },
    // To reset the buttons and checkboxes into default
    resetAllStates(){
      this.visualizationMode = {
        futureProjection: false,
        confidence: false,
        observedTrend: false,
        attribution: false,
      };
      // When reset the checkbox, the selected CIDs will be reset as well
      this.$refs.sidebarComponent.resetCheckboxes();
    },
    // To update the CIDs selected in the sidebar
    updateSelectedCIDs(selectedItems){
      this.selectedCIDs = selectedItems;
    },
    // To update which properties of CIDs to be shown
    updateActiveVisualizationMode(mode){
      // Toggle mode activation
      if (this.visualizationMode[mode]){
        this.visualizationMode[mode] = false;
        // confidence depends on the existence of futureProjection
        if(mode === "futureProjection"){
          this.visualizationMode["confidence"] = false;
        }
        else if(mode === "observedTrend"){
          this.visualizationMode["attribution"] = false;
        }
      }
      else{
        // The update should take the dependencied into consideration
        if (mode === 'confidence' && !this.visualizationMode.futureProjection){
          alert("Confidence requires Future Proejection to be active...");
          return;
        }
        if (mode === 'attribution' && !this.visualizationMode.observedTrend){
          alert("Attribution requires Observed Trend to be active...");
          return;
        }        
        this.visualizationMode[mode] = true;
      }
    },
    // cids,mode
    generateDisplayConfig(){
      // const config = {
      //   triangles:[], // arrays to hold the triangle configurations
      //   messages:[], // msg or description to be displayed
      // };

      // // To define how many triangles each CID will occuoy
      // const trianglesPerCID = {
      //   1: 6, // 1 CID selected, occupy 6 triangles
      //   2: 3,
      //   3: 2,
      //   4: 1, // the other 2 stay blank
      //   5: 1,
      //   6: 1,
      // };

      // const numCIDs = cids.length;
      // const numTriangles = trianglesPerCID[numCIDs] || 0;

      // // Generate triangles for each CID
      // cids.forEach((cid, index) => {
      //   for (let i = 0, i < numTriangles; i++){
      //     config.triangles.push({
      //       cid: cid,
      //       mode: this.determineMode(modes, cid)
      //     });
      //   }
      // });

    },
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