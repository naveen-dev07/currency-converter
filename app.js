const display = document.querySelector("#display")
const btn = document.querySelectorAll("button")
const swap = document.getElementById("swapBtn")
const rate = document.getElementById("rateFrom")
const rateV = document.getElementById("rateValue")
const rateT = document.getElementById("rateTo")
const outcome = document.getElementById("result")
const dropdown = document.getElementById("toCurrency")
const dropdown1 = document.getElementById("fromCurrency")
const fromamount = document.getElementById("from-amount")
const cross = document.getElementById("cross")
const fromFlag = document.getElementById("fromFlag")
const toFlag = document.getElementById("toFlag")

Object.keys(countryList).forEach(currency => {
    const option1 = document.createElement("option")
    option1.value = currency
    option1.textContent = currency
    dropdown1.appendChild(option1)

    const option2 = document.createElement("option")
    option2.value = currency
    option2.textContent = currency
    dropdown.appendChild(option2)
})


async function getCurrency() {
    try {
    const API_URL = `https://open.er-api.com/v6/latest/${dropdown1.value}`;
    const respone = await fetch(API_URL)
    const data = await respone.json()
    const convertedRate = data.rates[dropdown.value]
    outcome.textContent = convertedRate  
    const multiple = convertedRate * display.value
    outcome.textContent = multiple
    fromamount.textContent = display.value
    rateV.textContent = convertedRate
    rateT.textContent = dropdown.value
    rate.textContent = dropdown1.value
    if (dropdown1.value===dropdown.value) {
        outcome.textContent = display.value
         updateFlag()  
        return
    }
    updateFlag() 
 }
    catch (error){
    console.log("somthing went wrong" , error)  
    }

}
dropdown1.addEventListener("change",getCurrency)
dropdown.addEventListener("change", getCurrency)

btn.forEach(function(button) {
         if (button.closest(".first-part")) return 
     if (button.id === "swapBtn") return 
    button.addEventListener("click", function() {
        handelInput(button.textContent)
    })
})

function handelInput(value) {
    if (value === "✕") {
        display.value = ""
        getCurrency()
        return
    }
    if (value === "CLR") {
        display.value = ""
        getCurrency()
        return
    }
    if (value === "⌫") {
        display.value = display.value.slice(0,-1)
        getCurrency()
        return
    }
    if (value === "500") {
        display.value =Number(value) + Number(display.value)
        getCurrency()
        return
    }
     if (value === "1000") {
        display.value =Number(value) + Number(display.value)
        getCurrency()
        return
    }
     if (value === "100") {
        display.value =Number(value) + Number(display.value)
        getCurrency()
        return
    }
    
   
    
display.value += value;
getCurrency()
}
function updateFlag() {
    const fromCode = countryList[dropdown1.value]
    const toCode = countryList[dropdown.value]
    
    fromFlag.src = `https://flagsapi.com/${fromCode}/flat/64.png`
    toFlag.src = `https://flagsapi.com/${toCode}/flat/64.png`
   
}
swap.addEventListener("click", function() {
    const temp = dropdown1.value
    dropdown1.value = dropdown.value
    dropdown.value = temp
    getCurrency()
})
swap.addEventListener("click", function() {
    swap.classList.add("spin")
    setTimeout(() => swap.classList.remove("spin"), 400)
    // baaki swap code
})
getCurrency()



