<template>
    <div class="sidebar">
        <h3 class="title">Choose from CIDs</h3>
        <div v-for="(category, index) in categories" :key="index" class="category">
            <div class="category-container">
                
                <h3>{{category.name}}</h3>    
                
                <div>
                    
                    <div class="items" :style="{ position:'relative' }">
                        <div class="color-bar" :style="{ backgroundColor: getCategoryColor(category.name), height:calculateBarHeight(category.items.length)}"></div>
                        <div v-for="item in category.items" :key="item.name" class="item">
                            <input type="checkbox" v-model="item.selected" :id="item.name" @change="emitSelectedCIDs" :disabled="item.disabled">
                            <label :for="item.name">{{item.name}}</label>
                        </div>
                    </div>
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
                            {name: "Mean surface temperature", selected: false, disabled: true},
                            {name: "Extreme heat", selected: false, disabled: true},
                            {name: "Cold spell", selected: false, disabled: false},
                            {name: "Frost", selected:false, disabled: true},
                        ]
                    },
                    {
                        name:"Wet and Dry",
                        items:[
                            {name: "Mean precipitation", selected: false, disabled: true},
                            {name: "River flood", selected: false, disabled: false},
                            {name: "Heavy preciption and pluvial flood", selected: false, disabled: true},
                            {name: "Landslide", selected: false, disabled: true},
                            {name: "Aridity", selected: false, disabled: true},
                            {name: "Hydrological drought", selected: false, disabled: true},
                            {name: "Agricultural and ecological drought", selected: false, disabled: true},
                            {name: "Fire weather", selected: false, disabled: true},
                        ]
                    },
                    {
                        name: "Wind",
                        items: [
                            {name: "Mean wind speed", selected: false, disabled: true},
                            {name: "Severe wind storm", selected: false, disabled: false},
                            {name: "Tropical cyclone", selected: false, disabled: true},
                            {name: "Sand and dust storm", seleted: false, disabled: true},
                        ]
                    },
                    {
                        name:"Snow and Ice",
                        items:[
                            {name: "Snow, glacier and ice sheet", selected: false, disabled: true},
                            {name: "Permafrost", selected: false, disabled: false},
                            {name: "Lake, river and sea ice", selected: false, disabled: true},
                            {name: "Heavy snowfall and ice storm", selected: false, disabled: true},
                            {name: "Hail", selected: false, disabled: true},
                            {name: "Snoe avalanche", selected: false, disabled: true},
                        ]
                    },
                    {
                        name: "Coastal",
                        items:[
                            {name: "Relative sae level", selected: false, disabled: true},
                            {name: "Coastal flood", selected: false, disabled: false},
                            {name: "Coastal erosion", selected: false, disabled: true},
                            {name: "Marine heatwave", selected: false, disabled: true},
                            {name: "Ocean acidity", selected: false, disabled: true},
                        ]
                    },
                    {
                        name: "Others",
                        items: [
                            {name: "Air pollution weather", selected: false, disabled: true},
                            {name: "Atmospheric CO₂ at surface", selected: false, disabled: true},
                            {name: "Radiation at surface", selected: false, disabled: false},

                        ]
                    }
                ]
            }
        },
        methods:{
            // To update the selected CIDs and emit the event in AtlasView.vue
            emitSelectedCIDs(){
                let selectedItems = [];
                this.categories.forEach(category => {
                    category.items.forEach(item =>{
                        if (item.selected){
                            selectedItems.push(item.name);
                        }
                    })
                })
                this.$emit('cid-selection-changed',selectedItems);
            },
            resetCheckboxes(){
                this.categories.forEach(category => {
                    category.items.forEach(item => {
                        item.selected = false;
                    })
                })
                this.emitSelectedCIDs();
            },
            getCategoryColor(categoryName) {
                switch (categoryName) {
                    case 'Heat and Cold': return '#4BB132';
                    case 'Wet and Dry': return '#EF8F37';
                    case 'Wind': return '#C1A0CA';
                    case 'Snow and Ice': return '#FA4F97';
                    case 'Coastal': return '#A3CF5B';
                    case 'Others': return '#EFDD3A';
                    default: return '#000'; // Default color if category not matched
                }
            },
            calculateBarHeight(itemCount) {
                const baseHeight = 21; // Base height per item
                return `${baseHeight * itemCount}px`; // Adjust this formula as needed
            },
        },
    }
</script>

<style>
.sidebar{
    background-color: rgb(198, 224, 196);
    text-align: left;
    max-height: 100%;
    overflow-y: auto;
}
.sidebar .category-container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.color-bar{
    position: absolute;
    width: 5px;
    height: 100%;
}
.items{
    padding-left: 10px;
}
.category h3{
    font-size: 16px;
    margin-top: 3px;
    margin-bottom: 1px;
}
.items .item{
    font-size: 13px;
    margin-bottom: 1px;
    padding-left: 10px;
}
.title{
    font-size: 22px;
    font-weight: 800;
    margin: 0%;
}
</style>