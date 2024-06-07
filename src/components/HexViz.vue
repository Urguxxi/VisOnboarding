<template>
    <div class="hexViz">
        Hey it's the onboarding for a single hexagon now!
        <button @click="handleBackClick">Back to Atlas</button>
    </div>
</template>

<script>
    import * as d3 from 'd3';

    export default{
        name:'HexViz',
        methods:{
            handleBackClick(){
                this.$emit('backToAtlas');
            }
        },
        mounted() {
            // draw the d3 canvas
            const svg = d3.select(this.$el) 
            .append('svg')
            .attr('width', 1500)
            .attr('height', 550)
            .append('g')
            .attr('transform', 'translate(20, 0)');

            //Set the points of hexagons
            const hexagonPoints = (radius) => {
            const halfWidth = radius * Math.sqrt(3) / 2;
            return `
                0,${-radius}
                ${halfWidth},${-radius / 2}
                ${halfWidth},${radius / 2}
                0,${radius}
                ${-halfWidth},${radius / 2}
                ${-halfWidth},${-radius / 2}`;
            };

            // the legend hex
            svg.append('polygon')
            .attr('points',hexagonPoints(80))
            .attr('transform','translate(150,400)')
            .attr('id','ice')
            .style('stroke','pink')
            .style('fill','lightgrey')
            .style('stroke-width',3);

            // the main viz
            svg.append('polygon')
            .attr('points',hexagonPoints(220))
            .attr('transform','translate(600,280)')
            .attr('id','bighex')
            .style('stroke','darkgrey')
            .style('fill','none')
            .style('stroke-width',5);

        },
    }
</script>

<style>
    .hexViz{
        background-color: lightsteelblue;
        margin-left:10px;
    }
</style>