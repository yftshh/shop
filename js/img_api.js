fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(json => categories_fn(json))

const category_div = document.querySelector(".categories")
const categories_div = document.querySelectorAll("#category")


console.log(location.href);

const query_string = window.location.search
const urlParams = new URLSearchParams(query_string)
const getParams = urlParams.get("category")
console.log(getParams);

function categories_fn(categories) {
    for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        
        const underline = (getParams == category)? "under": ""
        

        category_div.innerHTML += `<a href="products.html?category=${category}" class="${category} ${underline}" id="category">${category}</a>`

    }
}

const api_url = "https://fakestoreapi.com/products"


try {
    const async_f = async () => {
        await fetch(api_url, { 
            method: "GET"
        })
        .then(res => res.json())
        .then(json => items(json));
       
    }
    async_f()
} catch (error) {
    console.log("connection failed");
}




function isInCart(object) {
    return cart_array.some(cartItem => cartItem.id == object.id);

}

const cart_array = JSON.parse(localStorage.getItem("item")) || []


function items(items) {
    const items_div = document.querySelector(".items")
    items.forEach((item) => {
        if (item.category == getParams) {
            
            const item_desc = item.description
            const item_id = item.id
            const item_img = item.image
            const item_price = item.price
            const item_rating = item.rating
            const item_title = item.title
            const item_category = item.category
            const item_count = item_rating.count
            const item_rate = item_rating.rate
            const maximum = 5
            const result = (item_rate * 100) / maximum



            items_div.innerHTML += `
                    <div class="item">
                        <p>${item_title}</p>
                        <img src="${item_img}" alt="" class="item_img">
                        <p>${item_price} $</p>
                        <div class="flex_stars">
                            <div class="rating-mini">
	                            <div class="rating_stars"></div>
                                <div class="full_stars" style="width:${result}%"></div>
                            </div>
                            <span>${item_rate}</span>
                        
                    </div>
                    <button type="button" class="btn" item-id="${item_id}">add</button>
                    `

            const btns = document.querySelectorAll(".btn")


            btns.forEach(btn => {
                const btn_id = btn.getAttribute("item-id");


                btn.addEventListener("click", () => {
                    const add_cart = items.find(full_item => full_item.id == btn_id);
                    console.log(typeof(add_cart));
                    const isItemInCart = isInCart(add_cart);
                    console.log(add_cart);
                    if (!isItemInCart) {
                        const quent = {
                            quentity: 1,
                            priceSumm: add_cart.price
                        }
                        const add_to_cart = {...add_cart,...quent}
                        cart_array.push(add_to_cart)
                            
                        console.log(cart_array);
                        localStorage.setItem(`item`, JSON.stringify(cart_array));
                    } else {
                        console.log("уже в корзине");
                    }
                });
            });


        
            
        }
        
    });

}

