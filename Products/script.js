document.addEventListener("DOMContentLoaded",async ()=>{
    let aside=document.querySelector('aside');
    let section=document.querySelector('section');
    

    async function get_products(url) {
        let res=await fetch(`${url}`);
        let data=await res.json();
        let total=data.products;
        let dabba="";
        total.forEach(index => {
            let title=index.title;
            let price=index.price;
            let img=index.thumbnail;
            dabba+=`
                <div class="box">
                    <img src="${img}" alt="kailash" width="400px" height="200px">
                    <div class="box_bottom">
                        <p class="ProductName">${title}</p>
                        <div class="bottom_row">
                            <div class="price">${price}</div>
                            <button>Buy</button>
                        </div>
                    </div>
                </div>
            `
        });
        section.innerHTML=dabba;
    }
    let prodlink={};
    async function get_category() {
        let res=await fetch(`https://dummyjson.com/products/categories`);
        let data=await res.json();
        let cat="";
        for (let obj of data){
            cat+=`<li>${obj.name}</li>`;
            prodlink[obj.name]=obj.url; 
        }
        aside.innerHTML+=cat;
    }
    await get_category();
    let category=document.querySelectorAll('li');
    console.log(category);
    category.forEach(cat=>{
        cat.addEventListener('click',async ()=>{
            let url=prodlink[cat.innerText];
            await get_products(url);
        })
    })
    console.log(prodlink);
})