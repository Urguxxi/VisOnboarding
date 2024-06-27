<template>
    <div class="viz" ref="vizContainer">
        <h4 class="atlasTitle">The IPCC AR6 WGI inhabited regions are displayed as hexagons with identical size in their approximate geographical location (see legend for regional acronyms). </h4>
    </div>
</template>

<style>
.viz{
    background-color:lightsteelblue;
    margin-left:10px;
    max-height: 100%;
}
.atlasTitle{
    margin-left:380px;
}
</style>

<script>
import * as d3 from 'd3';
export default {
  name: 'AtlasViz',
  template: '<div></div>',
  props: ['selectedCIDs', 'visualizationMode','displayConfig'],
  mounted() {
    this.renderViz();
    },
    watch:{
        selectedCIDs:{
            handler(){
                this.renderViz();
            },
            deep: true
        },
        visualizationMode:{
            handler(){
                this.renderViz();
            },
            deep: true
        }
    },

  methods:{
    handleClick(){
        this.$emit('toggleChanged');
    },
    handleBackClick(){
        this.$emit('backToAtlas');
    },
    renderViz(){
        const container = d3.select(this.$refs.vizContainer);
        container.selectAll('svg').remove(); // To clear up the canva to redraw

        const svg = d3.select(this.$el)
        .append('svg')
        .attr('width', 1500)
        .attr('height', 586)
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

        // the function to draw the hexagons dynamically
        const drawAtlas = (hexRadius,x,y) =>{
            // the deviation of hex on x-axis/y-axis
            const dx = hexRadius * Math.sqrt(3)/2;
            const dy = hexRadius * 3 / 4;

            // American continent
            // #1 add the North-Western North America
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x},${y})`)
            .attr('id', 'nwn')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #2 add the north-eastern north america
            const x2 = x+dx*2;
            const y2 = y;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x2},${y2})`)
            .attr('id','nen')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #3 add the western north america
            const x3 = x-dx;
            const y3 = y+dy*2;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x3},${y3})`)
            .attr('id','wna')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #4 add the central north america
            const x4 = x+dx;
            const y4 = y+dy*2;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x4},${y4})`)
            .attr('id','cna')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #5 add the eastern north america
            const x5 = x+dx*3;
            const y5 = y+dy*2;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x5},${y5})`)
            .attr('id','ena')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #6 add the greenland/iceland
            const x6 = x+dx*4+15;
            const y6 = y-15;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x6},${y6})`)
            .attr('id','gic')
            .style('stroke', 'red')
            .style('fill', 'lightblue')
            .attr('stroke-width', 2);

            // #7 add the northern central america
            const x7 = x;
            const y7 = y+dy*4;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x7},${y7})`)
            .attr('id','nca')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #8 add the southern central america
            const x8 = x+dx;
            const y8 = y+dy*6;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x8},${y8})`)
            .attr('id','sca')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #9 add the caribbean
            const x9 = x+dx*3;
            const y9 = y+dy*6;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x9},${y9})`)
            .attr('id','car')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #10 add the north-western south america
            const x10 = x+dx*4;
            const y10 = y+dy*8;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x10},${y10})`)
            .attr('id','nws')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #11 add the northern south america
            const x11 = x+dx*6;
            const y11 = y+dy*8;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x11},${y11})`)
            .attr('id','nsa')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #12 add the south america monsoon
            const x12 = x+dx*5;
            const y12 = y+dy*10;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x12},${y12})`)
            .attr('id','sam')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #13 add the north-eastern south america
            const x13 = x+dx*7;
            const y13 = y+dy*10;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x13},${y13})`)
            .attr('id','nes')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #14 add the south-western south america
            const x14 = x+dx*4;
            const y14 = y+dy*12;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x14},${y14})`)
            .attr('id','sws')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #15 add the south-eastern south america
            const x15 = x+dx*6;
            const y15 = y+dy*12;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x15},${y15})`)
            .attr('id','ses')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #16 add the southern south america
            const x16 = x+dx*5;
            const y16 = y+dy*14;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x16},${y16})`)
            .attr('id','ssa')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // European continent
            // #17 add the northern europe
            const x17 = x+dx*12;
            const y17 = y;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x17},${y17})`)
            .attr('id','neu')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #18 add the western and central europe
            const x18 = x+dx*11;
            const y18 = y+dy*2;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x18},${y18})`)
            .attr('id','wce')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #19 add the eastern europe
            const x19 = x+dx*13;
            const y19 = y+dy*2;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x19},${y19})`)
            .attr('id','eeu')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);
            
            // #20 add the mediterranean
            const x20 = x+dx*12;
            const y20 = y+dy*4;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x20},${y20})`)
            .attr('id','med')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // African continent
            // #21 add the sahara
            const x21 = x+dx*11;
            const y21 = y+dy*6;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x21},${y21})`)
            .attr('id','sah')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);
            
            // #22 add the arabian peninsula
            const x22 = x+dx*13;
            const y22 = y+dy*6;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x22},${y22})`)
            .attr('id','arp')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #23 add the western africa
            const x23 = x+dx*10;
            const y23 = y+dy*8;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x23},${y23})`)
            .attr('id','waf')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);
            
            // #24 add the central africa
            const x24 = x+dx*12;
            const y24 = y+dy*8;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x24},${y24})`)
            .attr('id','caf')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #25 add the north eastern africa
            const x25 = x+dx*14;
            const y25 = y+dy*8;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x25},${y25})`)
            .attr('id','neaf')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #26 add the west southern africa
            const x26 = x+dx*11;
            const y26 = y+dy*10;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x26},${y26})`)
            .attr('id','wsaf')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #27 add the south eastern africa
            const x27 = x+dx*13;
            const y27 = y+dy*10;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x27},${y27})`)
            .attr('id','seaf')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #28 add the east southern africa
            const x28 = x+dx*12;
            const y28 = y+dy*12;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x28},${y28})`)
            .attr('id','esaf')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #29 add the south madagascar
            const x29 = x+dx*15+10;
            const y29 = y+dy*10+10;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x29},${y29})`)
            .attr('id','mdg')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // Asian continent
            // #30 add the west siberia
            const x30 = x+dx*15;
            const y30 = y+dy*2;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x30},${y30})`)
            .attr('id','wsb')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #31 add the east siberia
            const x31 = x+dx*17;
            const y31 = y+dy*2;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x31},${y31})`)
            .attr('id','esb')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #32 add the russian far east
            const x32 = x+dx*19;
            const y32 = y+dy*2;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x32},${y32})`)
            .attr('id','esb')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #33 add the russian arctic
            const x33 = x+dx*18;
            const y33 = y;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x33},${y33})`)
            .attr('id','rar')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #34 add the west central asia
            const x34 = x+dx*14;
            const y34 = y+dy*4;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x34},${y34})`)
            .attr('id','wca')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #35 add the east central asia
            const x35 = x+dx*16;
            const y35 = y+dy*4;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x35},${y35})`)
            .attr('id','eca')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #36 add the tibetant plateau
            const x36 = x+dx*18;
            const y36 = y+dy*4;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x36},${y36})`)
            .attr('id','tib')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #37 add the east asia
            const x37 = x+dx*20;
            const y37 = y+dy*4;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x37},${y37})`)
            .attr('id','eas')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #38 add the south asia
            const x38 = x+dx*17;
            const y38 = y+dy*6;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x38},${y38})`)
            .attr('id','sas')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #39 add the south east asia
            const x39 = x+dx*21;
            const y39 = y+dy*6;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x39},${y39})`)
            .attr('id','sea')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // Oceania
            // #40 add the pacific small islands
            const x40 = x+dx*25+10;
            const y40 = y+dy*7;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x40},${y40})`)
            .attr('id','pac')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #41 add the northern australia
            const x41 = x+dx*22;
            const y41 = y+dy*9;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x41},${y41})`)
            .attr('id','nau')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #42 add the central australia
            const x42 = x+dx*21;
            const y42 = y+dy*11;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x42},${y42})`)
            .attr('id','cau')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #43 add the eastern australia
            const x43 = x+dx*23;
            const y43 = y+dy*11;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x43},${y43})`)
            .attr('id','eau')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #44 add the southern australia
            const x44 = x+dx*22;
            const y44 = y+dy*13;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x44},${y44})`)
            .attr('id','cau')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #45 add the new zealand
            const x45 = x+dx*24+15;
            const y45 = y+dy*13+10;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x45},${y45})`)
            .attr('id','nz')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // Antarctic
            // #46 add the west antarctic
            const x46 = x+dx*12;
            const y46 = y+dy*16;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x46},${y46})`)
            .attr('id','wan')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

            // #47 add the east antarctic
            const x47 = x+dx*14;
            const y47 = y+dy*16;
            svg.append('polygon')
            .attr('points', hexagonPoints(hexRadius))
            .attr('transform', `translate(${x47},${y47})`)
            .attr('id','ean')
            .style('stroke', 'darkgrey')
            .style('fill', 'none')
            .attr('stroke-width', 1.5);

        }

        // set a deault radius
        const hexRadius = 35;
        const x = 150;
        const y = 60;
        drawAtlas(hexRadius,x,y);

        // The small legend
        svg.append('polygon')
        .attr('points',hexagonPoints(50))
        .attr('transform','translate(100,400)')
        .attr('id','ice')
        .style('stroke','pink')
        .style('fill','lightgrey')
        .style('stroke-width',3);

        svg.select('#gic').on('click',()=>{this.handleClick()});

        // To test if the mode is updated
        if(this.visualizationMode['futureProjection']){
            svg.append('polygon')
            .attr('points',hexagonPoints(50))
            .attr('transform','translate(200,400)')
            .attr('id','ice')
            .style('stroke','pink')
            .style('fill','black')
            .style('stroke-width',3);
        }
    },
  },

};

</script>