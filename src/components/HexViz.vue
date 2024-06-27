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
                // To leave some margin for each triangle
                radius = radius - 15;
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
            // To update the legend HEX for the users to refer to
            updateLegendBars(svg, selectedCids, hexRadius, hexCenterX, hexCenterY){
                const angleStep = Math.PI / 3;
                const barThickness = 10;
                const barLength = 70; // Length of the bar outside the hexagon

                selectedCids.forEach((cidName, index) => {
                    let color = this.determineColor(cidName);
                    let startAngle = angleStep * index + Math.PI / 6; // Adjust angle for flat top hexagon
                    let endAngle = startAngle + angleStep;

                    // Calculate start and end points for each bar
                    let midX = hexCenterX + (hexRadius-10) * Math.cos(startAngle + angleStep / 2);
                    let midY = hexCenterY + (hexRadius-10) * Math.sin(startAngle + angleStep / 2);

                    // Determine rotation angle in degrees and add 90 degrees for parallel alignment
                    let rotationAngle = (startAngle + angleStep / 2) * 180 / Math.PI + 90;

                    // Draw the bar
                    svg.append('rect')
                        .attr('x', midX - barLength / 2)
                        .attr('y', midY - barThickness / 2)
                        .attr('width', barLength)
                        .attr('height', barThickness)
                        .attr('transform', `rotate(${rotationAngle},${midX},${midY})`)
                        .style('fill', color);

                    // Add text labels slightly below each bar for clarity
                    // let textX = midX + (hexRadius-50) * Math.cos(startAngle + angleStep / 2);
                    // let textY = midY + (hexRadius-50) * Math.sin(startAngle + angleStep / 2) + 10; // Adjusted for better visibility
                    let lableX = hexCenterX - 10;
                    let lableY = hexCenterY + 130 + index * 20;

                    svg.append('text')
                        .attr('x', lableX)
                        .attr('y', lableY)
                        .attr('text-anchor', 'middle')
                        .style('fill', color)
                        .style('font-size', '15px')
                        .style('stroke', color)
                        .style('stroke-width', 1)
                        .text(cidName);
                });
            },
            renderViz(){
                const container = d3.select(this.$refs.hexContainer);
                container.selectAll('svg').remove(); // To clear up the canva to redraw

                // draw the d3 canvas
                const svg = d3.select(this.$el) 
                .append('svg')
                .attr('width', 1500)
                .attr('height', 650)
                .append('g')
                .attr('transform', 'translate(20, 0)');

                // basic settings for the lengend HEX
                const lengendRadius = 70;
                const lengendCenterX =150;
                const lengendCenterY = 400;

                // draw the legend HEX on the left
                svg.append('polygon')
                .attr('points',this.hexagonPoints(lengendRadius, lengendCenterX, lengendCenterY))
                .attr('id','ice')
                .style('stroke','darkgrey')
                .style('fill','#E0E0E0')
                .style('stroke-width',5);

                // update the bars outside
                this.updateLegendBars(svg, this.selectedCids, lengendRadius + 20, lengendCenterX, lengendCenterY);

                // basic settings for the main HEX
                const hexRadius = 225;
                const hexCenterX = 700;
                const hexCenterY = 280;

                // Draw the main viz hexagon
                svg.append('polygon')
                .attr('points',this.hexagonPoints(hexRadius, hexCenterX, hexCenterY))
                // .attr('transform',`translate(${hexCenterX}, ${hexCenterY})`)
                .attr('id','bighex')
                .style('stroke','darkgrey')
                .style('fill','white')
                .style('stroke-width',6);

                // Draw the default background triangels
                // Draw it manually cuz each triangle needs different offset
                    svg.append('polygon')
                    .attr('points', this.computeTrianglePoints(0, hexRadius-8, hexCenterX+3, hexCenterY+5))
                    .attr('fill','#CDCDCD')

                    svg.append('polygon')
                    .attr('points', this.computeTrianglePoints(1, hexRadius-8, hexCenterX-3, hexCenterY+5))
                    .attr('fill','#CDCDCD')

                    svg.append('polygon')
                    .attr('points', this.computeTrianglePoints(2, hexRadius-8, hexCenterX-6, hexCenterY))
                    .attr('fill','#CDCDCD')

                    svg.append('polygon')
                    .attr('points', this.computeTrianglePoints(3, hexRadius-8, hexCenterX-3, hexCenterY-5))
                    .attr('fill','#CDCDCD')

                    svg.append('polygon')
                    .attr('points', this.computeTrianglePoints(4, hexRadius-8, hexCenterX+3, hexCenterY-5))
                    .attr('fill','#CDCDCD')

                    svg.append('polygon')
                    .attr('points', this.computeTrianglePoints(5, hexRadius-8, hexCenterX+6, hexCenterY))
                    .attr('fill','#CDCDCD')

                // Dynamically draw the triangles based on the selected CIDs and the main HEX
                this.selectedCids.forEach((cidName, index) => {
                    // To fetch cid data respectively
                    const cidData = this.regionData.find(cid => cid.name === cidName);
                    if(!cidData) {
                        alert(cidName+": Nodata!");
                        return;
                    }

                    // To compute the triangles vertices based on the index?
                    const strokeTrianglePoints = this.computeTrianglePoints(index, hexRadius, hexCenterX, hexCenterY);
                    const baseTrianglePoints = this.computeTrianglePoints(index, hexRadius-5, hexCenterX, hexCenterY);
                    const futureTrianglePoints = this.computeTrianglePoints(index, hexRadius*9/10, hexCenterX, hexCenterY);

                    // Default triangle if no specific mode is activated
                    if(Object.values(this.visualizationMode).every(v => !v)) {
                        this.drawDefaultTriangle(svg, strokeTrianglePoints, baseTrianglePoints, cidName);
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
            drawDefaultTriangle(svg, strokePoints, basePoints, cidName) {
                svg.append('polygon')
                    .attr('points', basePoints)
                    .style('fill', 'none')
                    .style('stroke', this.determineColor(cidName))
                    .style('stroke-width', 5);

                // svg.append('polygon')
                // .attr('points', strokePoints)
                // .style('fill', 'none')
                // .style('stroke', 'lightsteelblue')
                // .style('stroke-width', 5);
            },
            drawFutureProjectionTriangle(svg, pointsDefault, pointFuture, cidData, cidName) {
                if(cidData.futureProjection === "decreasing"){
                    svg.append('polygon')
                    .attr('points', pointsDefault)
                    .style('fill', '#666666')
                    .style('stroke', '#666666')
                    .style('stroke-width', 5);

                    svg.append('polygon')
                    .attr('points', pointFuture)
                    .style('fill', this.determineColor(cidName))
                    .style('stroke', 'white')
                    .style('stroke-width', 5);
                }
                else{
                    svg.append('polygon')
                    .attr('points', pointsDefault)
                    .style('fill', this.determineColor(cidName))
                    .style('stroke', 'white')
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
                        .style('fill', '#666666')
                        .style('stroke', '#666666')
                        .style('stroke-width', 4);

                    svg.append('polygon')
                        .attr('points', smallConfidencePoints)
                        .style('fill', this.determineColor(cidName))
                        .style('stroke', 'white')
                        .style('stroke-width', 4);
                }
                else{
                    svg.append('polygon')
                        .attr('points', confidencePoints)
                        .style('fill', this.determineColor(cidName))
                        .style('stroke', 'white')
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
                    'Cold spell': '#49D0AD',
                    'River flood': '#FAA832',
                    'Severe wind storm':'#B67FEA',
                    'Permafrost':'#FF33B8',
                    'Coastal flood':'#9ADF51',
                    'Radiation at surface':'#ECDE2C',
                    // More CIDs can be added here
                };
                return colors[cid] || '#eeeeee'; // Default color if CID is not found
            },
        },

    }
</script>

<style>
    .hexViz{
        background-color: rgba(206, 221, 239, 0.424);
        margin-left:10px;
    }
</style>