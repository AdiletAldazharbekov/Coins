// Функция запроса данных по API
// fetch('https://api.coinstats.app/public/v1/coins?skip=0&limit=10')
// .then(resp=> resp.json())
// .then(data=>console.log(data))

document.addEventListener('DOMContentLoaded', ()=>{
    const list = document.querySelector('.listCoins')
    const btnPrev=document.querySelector('#btnPrev')
    const btnNext=document.querySelector('#btnNext')
   
    let count = 0
    let limit=10

    const renderData = coins =>{
        console.log(coins)
        coins.forEach(coinItem => {
            let listItem=document.createElement('div')
            listItem.className+='coins'
            listItem.innerHTML+=`
            <img class="coins__img" src="${coinItem.icon}" alt="coin" />
            <div class="coins__name">
                <p>${coinItem.name}</p>
			    <span>${Math.round(coinItem.priceBtc*1000)/1000} ${coinItem.symbol} - $${Math.round(coinItem.price*100)/100}</span>
			</div>
			<div class="coins__price">$${Math.round(coinItem.priceBtc * coinItem.price*100)/100}</div>
            `
            list.append(listItem)
        });
    }

    const getData = async () => {  
try {
    const resp = await fetch(`https://api.coinstats.app/public/v1/coins?skip=${count}&limit=${limit}`)
    // skip=0 это индекс с какого элемента показываеть limit=10 кол-во элементов
    const data = await resp.json()
    const {coins} = data
    renderData(coins)
    }
catch (e) {
    console.log(`Ошибка - ${e}`)
    }
}

btnPrev.addEventListener('click',()=> {
    if(count!==0){
        list.innerHTML=''
        count-=limit
        getData()
    }
})

btnNext.addEventListener('click',()=> {
    list.innerHTML=''
    count+=limit
    getData()
})

getData()
})


