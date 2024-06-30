<template>
    <div class="lengend">
        <!-- <button v-for="mode in ['futureProjection', 'confidence', 'observedTrend', 'attribution']" class="var" :key="mode" @click="emitMode(mode)">
            {{formatMode(mode)}}
        </button> -->

        <div v-for="mode in Object.keys(modes)" :key="mode" class="var-container">
            <button v-if="!displayImage[mode]" @click="toggleMode(mode)" class="var">
                {{ formatMode(mode) }}
            </button>
            <img  v-else @click="toggleMode(mode)" :src="getImage(mode)" class="var-image">
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            modes: {
                futureProjection: false,
                confidence: false,
                observedTrend: false,
                attribution: false
            }
        }
    },
    computed:{
        displayImage(){
            return{
                futureProjection: this.modes.futureProjection,
                confidence: this.modes.futureProjection && this.modes.confidence,
                observedTrend: this.modes.observedTrend,
                attribution: this.modes.observedTrend && this.modes.attribution
            }
        }
    },
    methods:{
        emitMode(mode){
            this.$emit('visualization-mode-changed', mode);
        },
        formatMode(mode) {
            // Split the mode on each uppercase letter
            const words = mode.replace(/([A-Z])/g, ' $1').trim();
            // Capitalize the first letter of each word
            return words.charAt(0).toUpperCase() + words.slice(1);
        },
        toggleMode(mode) {
            if (mode === 'confidence' && !this.modes.futureProjection) {
                alert("Confidence requires Future Projection to be active.");
                return;
            }
            if (mode === 'attribution' && !this.modes.observedTrend) {
                alert("Attribution requires Observed Trend to be active.");
                return;
            }

            // Toggle the mode if no dependency issues
            this.modes[mode] = !this.modes[mode];

            // Automatically deactivate dependent modes
            if (!this.modes[mode]) {
                if (mode === 'futureProjection') {
                    this.modes.confidence = false;
                }
                if (mode === 'observedTrend') {
                    this.modes.attribution = false;
                }
            }
            this.$emit('visualization-mode-changed', mode, this.modes[mode]);
        },
        getImage(mode) {
            // Dynamically import image based on the mode
            return require(`@/assets/${mode}.png`)
        },
    }
}
</script>

<style>
.lengend{
    background-color:rgb(241, 212, 216);
    margin-left:10px;
    text-align:center;
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    max-height: 100%;
    margin-top: 10px;
}

.var-container{
    display: flex;
    justify-content: center;
    width: 100%;
}

.var {
  background-color: #FFFFFF;
  border: 0;
  border-radius: .5rem;
  box-sizing: border-box;
  color: #111827; 
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: .75rem 1rem;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 2%;
  margin-right: 2%;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 80%;
  height: 100%;

}

.var:hover {
  background-color: rgb(249,250,251);
}

.var:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.var:focus-visible {
  box-shadow: none;
}

.var-image{
    width: fit-content;
    height: 120px;
    object-fit: contain;
}
        
</style>