<template>
    <div class="hexViz">
        Hey it's the onboarding for a single hexagon now!
        <button @click="handleBackClick">Back to Atlas</button>
    </div>
</template>

<script>
    export default{
        name:'HexViz',
        methods:{
            handleBackClick(){
                this.$emit('backToAtlas');
            }
        }
    }
</script>

<style>
    .hexViz{
        background-color: lightsteelblue;
        margin-left:10px;
    }
</style>