<template>
    <div class="sidebar">
        <h3 class="title">Choose from CIDs</h3>
        <div v-for="(category, index) in categories" :key="index" class="category">
            <h3>{{category.name}}</h3>
            <div class="items">
                <div v-for="item in category.items" :key="item.name" class="item">
                    <input type="checkbox" v-model="item.selected" :id="item.name">
                    <label :for="item.name">{{item.name}}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                categories:[
                    {
                        name:"Heat and Cold",
                        items:[
                            {name: "Mean surface temperature", selected: false},
                            {name: "Extreme heat", selected: false},
                            {name: "Cold spell", selected: false},
                            {name: "Frost", selected:false},
                        ]
                    },
                    {
                        name:"Wet and Dry",
                        items:[
                            {name: "Mean precipitation", selected: false},
                            {name: "River flood", selected: false},
                            {name: "Heavy preciption and pluvial flood", selected: false},
                            {name: "Landslide", selected: false},
                            {name: "Aridity", selected: false},
                            {name: "Hydrological drought", selected: false},
                            {name: "Agricultural and ecological drought", selected: false},
                            {name: "Fire weather", selected: false},
                        ]
                    },
                    {
                        name: "Wind",
                        items: [
                            {name: "Mean wind speed", selected: false},
                            {name: "Severe wind storm", selected: false},
                            {name: "Tropical cyclone", selected: false},
                            {name: "Sand and dust storm", seleted: false},
                        ]
                    },
                    {
                        name:"Snow and Ice",
                        items:[
                            {name: "Snow, glacier and ice sheet", selected: false},
                            {name: "Permafrost", selected: false},
                            {name: "Lake, river and sea ice", selected: false},
                            {name: "Heavy snowfall and ice storm", selected: false},
                            {name: "Hail", selected: false},
                            {name: "Snoe avalanche", selected: false},
                        ]
                    },
                    {
                        name: "Coastal",
                        items:[
                            {name: "Relative sae level", selected: false},
                            {name: "Coastal flood", selected: false},
                            {name: "Coastal erosion", selected: false},
                            {name: "Marine heatwave", selected: false},
                            {name: "Ocean acidity", selected: false},
                        ]
                    },
                    {
                        name: "Others",
                        items: [
                            {name: "Air pollution weather", selected: false},
                            {name: "Atmospheric CO₂ at surface", selected: false},
                            {name: "Radiation at surface", selected: false},

                        ]
                    }
                ]
            }
        }
    }
</script>

<style>
.sidebar{
    background-color: rgb(198, 224, 196);
    text-align: left;
    max-height: 100%;
    overflow-y: auto;
}
.category h3{
    font-size: 16px;
    margin-top: 3px;
    margin-bottom: 1px;
}
.items .item{
    font-size: 13px;
    margin-bottom: 1px;
}
.title{
    font-size: 22px;
    font-weight: 800;
    margin: 0%;
}
</style>