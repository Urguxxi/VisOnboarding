<template>
    <div class="hexViz" ref="hexContainer">
        Hey it's the onboarding for a single hexagon now!
        <button @click="handleBackClick">Back to Atlas</button>
        <!-- <p>{{displayConfig.message}}</p> -->
    </div>
</template>

<script>
    import * as d3 from 'd3';

    export default{
        name:'HexViz',
        props: ['selectedCids', 'visualizationMode','displayConfig'],
        mounted() {
            this.renderViz();
        },
        watch:{
            selectedCids:{
                handler(){
                    this.renderViz();
                },
                deep: true,
                immediate: true
            },
            visualizationMode:{
                handler(){
                    this.renderViz();
                },
                deep: true,
                immediate: true
            }
        },
        methods:{
            handleBackClick(){
                this.$emit('backToAtlas');
            },
            computeTrianglePoints(index, radius, centerX, centerY) {
                // This is a placeholder function for computing triangle vertices
                radius = radius -10;
                const angle = Math.PI / 3 * index + Math.PI / 6;
                const nextAngle = angle + Math.PI / 3;
                return [
                    [centerX, centerY], // center of the hexagon
                    [centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)],
                    [centerX + radius * Math.cos(nextAngle), centerY + radius * Math.sin(nextAngle)]
                ].map(point => point.join(',')).join(' ');
            },
            hexagonPoints(radius, centerX, centerY) {
                return Array.from({ length: 6 }, (_, i) => {
                    const angle = Math.PI / 3 * i - Math.PI / 2;
                    return [
                        centerX + radius * Math.cos(angle),
                        centerY + radius * Math.sin(angle)
                    ].join(',');
                }).join(' ');
            },
            renderViz(){
                const container = d3.select(this.$refs.hexContainer);
                container.selectAll('svg').remove(); // To clear up the canva to redraw

                // draw the d3 canvas
                const svg = d3.select(this.$el) 
                .append('svg')
                .attr('width', 1500)
                .attr('height', 550)
                .append('g')
                .attr('transform', 'translate(20, 0)');

                //Set the points of hexagons
                const hexagonPoints1 = (radius) => {
                const halfWidth = radius * Math.sqrt(3) / 2;
                return `
                    0,${-radius}
                    ${halfWidth},${-radius / 2}
                    ${halfWidth},${radius / 2}
                    0,${radius}
                    ${-halfWidth},${radius / 2}
                    ${-halfWidth},${-radius / 2}`;
                };

                // draw the legend hex using the old function
                svg.append('polygon')
                .attr('points',hexagonPoints1(80))
                .attr('transform','translate(150,400)')
                .attr('id','ice')
                .style('stroke','pink')
                .style('fill','lightgrey')
                .style('stroke-width',3);

                // basic settings for the main HEX
                const hexRadius = 220;
                const hexCenterX = 700;
                const hexCenterY = 280;

                // Draw the main viz hexagon
                svg.append('polygon')
                .attr('points',this.hexagonPoints(hexRadius, hexCenterX, hexCenterY))
                // .attr('transform',`translate(${hexCenterX}, ${hexCenterY})`)
                .attr('id','bighex')
                .style('stroke','darkgrey')
                .style('fill','none')
                .style('stroke-width',5);

                // Dynamically draw the triangles based on the selected CIDs and the main HEX
                this.selectedCids.forEach((cid, index) => {
                    // To compute the triangles vertices based on the index?
                    const trianglePoints = this.computeTrianglePoints(index, hexRadius, hexCenterX, hexCenterY);
                    svg.append('polygon')
                    .attr('points', trianglePoints)
                    .style('fill',this.determineColor(cid))
                    .style('stroke', 'orange')
                    .style('stroke-width', 3);
                })


                // *To test if the mode is updated
                if(this.visualizationMode['futureProjection']){
                    svg.append('polygon')
                    .attr('points',hexagonPoints1(50))
                    .attr('transform','translate(200,400)')
                    .attr('id','ice')
                    .style('stroke','pink')
                    .style('fill','black')
                    .style('stroke-width',3);
                }
            },

            determineColor(cid) {
                const colors = {
                    'Cold spell': '#ffcccc',
                    'River flood': '#cceeff',
                    'Severe wind storm':'lightyellow',
                    'Permafrost':'#eeffcc',
                    'Coastal flood':'blue',
                    'Radiation at surface':'eeffee',
                    // More CIDs can be added here
                };
                return colors[cid] || '#eeeeee'; // Default color if CID is not found
            },
        },

    }
</script>

<style>
    .hexViz{
        background-color: lightsteelblue;
        margin-left:10px;
    }
</style>