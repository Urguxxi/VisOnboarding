<template>
    <div class="viz">
        <br>
        <input id="checkbox_toggle" type="checkbox" class="check" :checked="isChecked" @change="handleToggle">
        <div class="checkbox">
          <label class="slide" for="checkbox_toggle">
            <div class="toggle"></div>
            <span class="text">Atlas</span>
            <span class="text">Single Hexagon</span>
          </label>
        </div>
    </div>
</template>

<script>
    export default{
        // data(){
        //     return{
        //         isChecked:false
        //     }
        // },
        props:['isChecked'],
        name:'IntroTitle',
        methods:{
        handleClick(){
            this.$emit('hexClicked');
        },
        handleBackClick(){
            this.$emit('backToAtlas');
        },
        handleToggle(){
            // if(this.isChecked){
            //     this.$emit('hexClicked');
            // }
            // else {
            //     this.$emit('backToAtlas');
            // }
            this.$emit('toggleChanged');
        }

        }
    }
</script>

<style>
.viz{
    background-color:lightsteelblue;
    margin-left:10px;
}

.checkbox {
    width: 220px;
    height: 40px;
    background-color: #d0d0d0;
    border-radius: 30px;
    position: relative;
    color: black;
    overflow: hidden;
    margin-left: 10px;
  }
  
  #checkbox_toggle {
    display: none;
  }
  
  .checkbox .toggle {
    width: 70px;
    height: 30px;
    position: absolute;
    border-radius: 30px;
    left: 5px;
    cursor: pointer;
    background: linear-gradient(40deg, #FF0080,#FF8C00 70%);
    transition: 0.4s;
    box-shadow: 0px 0px 3px rgb(255, 255, 20), 0px 0px 5px rgb(255, 255, 20);
  }
  
  .checkbox .slide {
    width: 227px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
  }
  
  .checkbox .slide .text {
    font-size: 16px;
    font-weight: 700;
    z-index: 100;
    cursor: pointer;
  }
  
  .check:checked + .checkbox .slide .toggle {
    transform: translateX(80px);
    background: linear-gradient(40deg, #8983F7, #A3DAFB 70%);
    box-shadow: -0px -0px 10px #8983F7, -0px -0px 3px #8983F7;
    width: 130px;
  }
  
  .check:checked + .checkbox .slide {
    background-color: #33659b;
    color: #fff;
  }
</style>
