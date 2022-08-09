window.onload =( )=>{
const slider = document.querySelector(`.slider`)
const sliderInner = document.querySelector(`.sliderInner`)
const sliderWrap = document.querySelector(`.sliderWrap`)
const progress = document.querySelector(`.progress`)
const progressInner = document.querySelector(`.progressInner`)
const card = document.querySelectorAll(`.card`)
const btnFoward = document.querySelector(`.fowardBtn`)
const btnBack = document.querySelector(`.BackBtn`)

let sliderGrabbed = false


let cardWidthIndex = 0

slider.parentElement.addEventListener(`scroll`, (e) =>{
    progressInner.style.width= `${getScrollPercantage()}%`

})

const getScrollPercantage = ()=>  ((slider.parentElement.scrollLeft / (slider.parentElement.scrollWidth- slider.parentElement.clientWidth)) * 100)
sliderWrap.addEventListener("mousedown",(e)=>sliderGrabbed=true)
slider.addEventListener("mouseup",(e)=> sliderGrabbed=false)    
slider.addEventListener("mouseleave",(e)=> sliderGrabbed=false)    
slider.addEventListener("mousemove",(e)=>{
if(!sliderGrabbed) return
slider.parentElement.scrollLeft -=e.movementX


 }) 
slider.addEventListener("wheel",(e)=>{
    e.preventDefault()
  slider.parentElement.scrollLeft-=e.deltaY
  })
 

const readCardsWidth  =(cardArray) => Array.from(cardArray).reduce((total,item,index) => 
[...total,index !=0
?(parseInt(item.clientWidth)+ parseInt(getComputedStyle(item).marginRight.split(`px`)))
:(parseInt(item.clientWidth)+parseInt( getComputedStyle(item).marginLeft.split(`px`)[0]) 
+ parseInt(getComputedStyle(item).marginRight.split(`px`)))],[])
let cardWidthIndexList = readCardsWidth(card)

btnFoward.addEventListener("click",()=>{
    let lastIndex =calculateSliderWrapWidht()
    
if(cardWidthIndex> lastIndex) return


 let piece = (cardWidthIndexList[cardWidthIndex] / 10)
 let intervalIndex = 1
 const slideInterval =  setInterval(() => {
 if (intervalIndex>10) {
    // console.log(cardWidthIndexList[cardWidthIndex])
    clearInterval(slideInterval)
 }
 slider.parentElement.scrollLeft +=  piece
 intervalIndex++
 }, 100);
 cardWidthIndex++
 // slider.parentElement.scrollLeft += cardWidthIndexList[cardWidthIndex] 
})

btnBack.addEventListener("click",()=>{
if(cardWidthIndex<=0) return
let piece = (cardWidthIndexList[cardWidthIndex] / 10)
let intervalIndex = 1
const slideInterval =  setInterval(() => {
 if (intervalIndex>10) {
    console.log(cardWidthIndexList[cardWidthIndex])
    clearInterval(slideInterval)
 }
 slider.parentElement.scrollLeft -=  piece
 intervalIndex++
 }, 100);
 cardWidthIndex--
 // slider.parentElement.scrollLeft += cardWidthIndexList[cardWidthIndex] 
})


const calculateSliderWrapWidht =()=>{
    const totalWidth = (cardWidthIndexList).reverse().reduce((total,item,index) =>
    parseInt(sliderWrap.clientWidth)>=total?total = item+total:total+0,0)
   const lastIndex = Math.floor(totalWidth/ cardWidthIndexList[cardWidthIndexList.length-1]+1) //last push button index
    return cardWidthIndexList.length - lastIndex
}  
 }


