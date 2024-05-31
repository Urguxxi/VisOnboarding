<template>
    <div class="viz">
        Interactive Viz
    </div>
</template>

<style>
.viz{
    background-color:lightsteelblue;
    margin-left:10px;
}
</style>

<script>
import * as d3 from 'd3';
export default {
  name: 'AtlasViz',
  template: '<div></div>',
  methods:{
    handleClick(){
        this.$emit('hexClicked');
    }
  },
  mounted() {
    const svg = d3.select(this.$el) // the error appears on the very first line of the d3-module
      .append('svg')
      .attr('width', 500)
      .attr('height', 270)
      .append('g')
      .attr('transform', 'translate(0, 10)');

    //Draw the hexagons
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

    svg.append('polygon')
    .attr('points', hexagonPoints(20))
    .attr('transform', 'translate(50,70)')
    .style('stroke', 'red')
    .style('fill', 'none');

    svg.append('polygon')
    .attr('points', hexagonPoints(30))
    .attr('transform', 'translate(80,110)')
    .style('stroke', 'green')
    .style('fill', 'none');

    svg.append('polygon')
    .attr('points', hexagonPoints(40))
    .attr('transform', 'translate(110,50)')
    .style('stroke', 'blue')
    .style('fill', 'none');

    svg.append('polygon')
    .attr('points',hexagonPoints(50))
    .attr('transform','translate(210,50)')
    .attr('id','ice')
    .style('stroke','pink')
    .style('fill','yellow');

    svg.select('#ice').on('click',()=>{this.handleClick()});
    },

};

</script>