<template>
    <div class="lengend">
        <button class="var">Future Projection</button>
        <button class="var">Condfidence</button>
        <button class="var">Observed Trend</button>
        <button class="var">Attribution</button>
    </div>
</template>

<style>
.lengend{
    background-color:rgb(241, 212, 216);
    margin-left:10px;
    text-align:center;
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    max-height: 100%;
}


.var {
  background-color: #FFFFFF;
  border: 0;
  border-radius: .5rem;
  box-sizing: border-box;
  color: #111827; 
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: .75rem 1rem;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 2%;
  margin-right: 2%;
  width: 20%;
  height: 50%;

}

.var:hover {
  background-color: rgb(249,250,251);
}

.var:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.var:focus-visible {
  box-shadow: none;
}
        
</style>