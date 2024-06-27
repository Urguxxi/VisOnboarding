<template>
    <div class="hexViz" ref="hexContainer">
        Hey it's the onboarding for a single hexagon now!
        <button @click="handleBackClick">Back to Atlas</button>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    import {regionsData} from '@/data/cidsData';

    export default{
        name:'HexViz',
        props: ['selectedCids', 'visualizationMode','displayConfig'],
        data(){
            return{
                regionData: null,
            };
        },
        mounted() {
            this.renderViz();
            this.fetchRegionData('GIC');
        },
        watch:{
            selectedCids:{
                handler(){
                    this.maybeClearCanvas();
                    this.renderViz();
                },
                deep: true,
                immediate: true
            },
            visualizationMode:{
                handler(){
                    this.maybeClearCanvas();
                    this.renderViz();
                },
                deep: true,
                immediate: true
            }
        },
        methods:{
            // To fetch the particular data matched the regionCode, we use GIC region for the onboarding system as the example
            fetchRegionData(regionCode){
                const region = regionsData.find(r => r.region === regionCode);
                if(region){
                    this.regionData = region.cids;
                }
            },
            handleBackClick(){
                this.$emit('backToAtlas');
            },
            maybeClearCanvas(){
                // Clear the svg canvas only if a mode that requires exclusive drawing is actived
                if(this.visualizationMode.confidence || this.visualizationMode.attribution){
                    const container = d3.select(this.$refs.hexContainer);
                    container.selectAll('svg').remove();
                }
            },
            computeTrianglePoints(index, radius, centerX, centerY) {
                // This is a placeholder function for computing triangle vertices
                radius = radius - 10;
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
                this.selectedCids.forEach((cidName, index) => {
                    // To fetch cid data respectively
                    const cidData = this.regionData.find(cid => cid.name === cidName);
                    if(!cidData) {
                        alert(cidName+": Nodata!");
                        return;
                    }

                    // To compute the triangles vertices based on the index?
                    const baseTrianglePoints = this.computeTrianglePoints(index, hexRadius, hexCenterX, hexCenterY);
                    const futureTrianglePoints = this.computeTrianglePoints(index, hexRadius*9/10, hexCenterX, hexCenterY);

                    // Default triangle if no specific mode is activated
                    if(Object.values(this.visualizationMode).every(v => !v)) {
                        this.drawDefaultTriangle(svg, baseTrianglePoints, cidName);
                    }

                    // Handle Future Projection
                    if(this.visualizationMode.futureProjection && (!this.visualizationMode.confidence)) {
                        this.drawFutureProjectionTriangle(svg, baseTrianglePoints, futureTrianglePoints, cidData, cidName);
                    }

                    // Handle Confidence
                    if(this.visualizationMode.confidence) {
                        this.drawConfidenceTriangle(svg, index, cidData, cidName, hexRadius, hexCenterX, hexCenterY);
                    }

                    
                })

            },
            drawDefaultTriangle(svg, points, cidName) {
                svg.append('polygon')
                    .attr('points', points)
                    .style('fill', this.determineColor(cidName))
                    .style('stroke', 'orange')
                    .style('stroke-width', 3);
            },
            drawFutureProjectionTriangle(svg, pointsDefault, pointFuture, cidData, cidName) {
                if(cidData.futureProjection === "decreasing"){
                    svg.append('polygon')
                    .attr('points', pointsDefault)
                    .style('fill', 'black')
                    .style('stroke', 'black')
                    .style('stroke-width', 5);

                    svg.append('polygon')
                    .attr('points', pointFuture)
                    .style('fill', this.determineColor(cidName))
                    .style('stroke', 'black')
                    .style('stroke-width', 5);
                }
                else{
                    svg.append('polygon')
                    .attr('points', pointsDefault)
                    .style('fill', this.determineColor(cidName))
                    .style('stroke', 'black')
                    .style('stroke-width', 5);
                }
                
            },
            drawConfidenceTriangle(svg, index, cidData, cidName, hexRadius, hexCenterX, hexCenterY) {
                let confidenceRadius = this.getConfidenceRadius(cidData.confidence, hexRadius);
                let confidencePoints = this.computeTrianglePoints(index, confidenceRadius, hexCenterX, hexCenterY);
                let smallConfidencePoints = this.computeTrianglePoints(index, confidenceRadius*9/10, hexCenterX, hexCenterY);
                if(cidData.futureProjection === "decreasing"){
                    svg.append('polygon')
                        .attr('points', confidencePoints)
                        .style('fill', 'black')
                        .style('stroke', 'black')
                        .style('stroke-width', 4);

                    svg.append('polygon')
                        .attr('points', smallConfidencePoints)
                        .style('fill', this.determineColor(cidName))
                        .style('stroke', 'black')
                        .style('stroke-width', 4);
                }
                else{
                    svg.append('polygon')
                        .attr('points', confidencePoints)
                        .style('fill', this.determineColor(cidName))
                        .style('stroke', 'black')
                        .style('stroke-width', 4);
                }

            },
            getConfidenceRadius(confidence, hexRadius) {
                switch (confidence) {
                    case 'high': return hexRadius;
                    case 'medium': return hexRadius * 2 / 3;
                    case 'low': return hexRadius / 3;
                    default: return 0;
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