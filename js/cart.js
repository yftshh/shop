const main = document.querySelector(".main")
const cart = document.querySelector(".cart")
const full_price = document.querySelector(".full_price")

const item_storage = JSON.parse(localStorage.getItem('item')) || [];

main.innerHTML = `
    <div class="home">
            <a href="image_api.html">Home</a>
            
    </div>
    <div class="categories"></div>
       
`


const total_price = item_storage.reduce((priced, all) => {
    return priced + all.priceSumm
}, 0)

console.log(item_storage.length);
if (item_storage.length == 0) {
    cart.innerHTML = `
    <img src="images/empty_cart.png" alt='empty' class="empty_img">
    `
} 

full_price.innerHTML = `

    <div class="price">
        <button type="button" class="clear">Clear</button>
        <p>Total Price: ${total_price} $</p>
    </div>
`

item_storage.forEach(item => {
    const item_id = item.id
    const item_img = item.image
    const item_price = item.price
    const item_rating = item.rating
    const item_title = item.title
    const item_quentity = item.quentity

    let item_count = 1


    cart.innerHTML += `
    <div class="cart_items">
        <img src="${item_img}" alt="" class="item_img">
        <div class="cart_elements">
            <p>${item_title}</p>
            <p>${item_price} $</p>
            <p class="quentity">${item_quentity}</p>
            <div class="cart_btns">
                <i onclick="increase(${item_id})"><button type="button" class="plus btn">+</button></i>
                <i onclick="decrease(${item_id})"><button type="button" class="minus btn">-</button></i>
            </div>
            <i onclick="delete_from_storage(${item_id})"<button type="button" class="btn delete" item-id="${item_id}">delete</button></i>
        </div>
    </div>
    
    `
});



const plus_btn = document.querySelector(".plus")
const minus_btn = document.querySelector(".minus")
const delete_btn = document.querySelector(".delete")
const clear_btn = document.querySelector(".clear")
const amount_text = document.querySelector(".quentity")



const item = JSON.parse(localStorage.getItem("item"));

const cart_list = item


function increase(id) {
    const data = item.find((item) => item.id == id)
    const cart_index = cart_list.findIndex(item => {
        console.log(item.id);
        return item.id == id
    })

    cart_list[cart_index].quentity++;
    cart_list[cart_index].priceSumm = data.price * data.quentity;


    console.log(cart_list);

    const new_price = cart_list.reduce((priced, all) => {
        return priced + all.priceSumm
    }, 0)
    console.log(new_price);

    localStorage.setItem("item", JSON.stringify(cart_list));

    full_price.innerHTML = `
    <div class="price">
        <button type="button" class="clear">Clear</button>
        <p>Total Price: ${new_price} $</p>
    </div>
`

    amount_text.innerHTML = `
    ${cart_list[cart_index].quentity}
    `

    console.log(123);
}



function decrease(id) {
    const data = item.find((item) => item.id == id)
    const cart_index = cart_list.findIndex(item => {
        return item.id == id
    })
    if (cart_list[cart_index].quentity > 1) {
        cart_list[cart_index].quentity = cart_list[cart_index].quentity - 1;
        cart_list[cart_index].priceSumm = data.price * data.quentity;
    } else {
        cart_list[cart_index].quentity = 1;
        cart_list[cart_index].priceSumm = data.price * data.quentity;
    }




    const new_price = cart_list.reduce((priced, all) => {
        return priced + all.priceSumm
    }, 0)


    localStorage.setItem("item", JSON.stringify(cart_list));

    full_price.innerHTML = `
    <div class="price">
        <button type="button" class="clear">Clear</button>
        <p>Total Price: ${new_price} $</p>
    </div>
`
    amount_text.innerHTML = `
    ${cart_list[cart_index].quentity}
    `

}


clear_btn.addEventListener("click", clear_storage)



function delete_from_storage(id) {
    const data = item.find((item) => item.id == id)
    const cart_index = cart_list.findIndex(item => {

        return item.id == id
    })
    const index = cart_list.indexOf(data);
    if (index > -1) {
        cart_list.splice(index, 1);
    }

    localStorage.setItem("item", JSON.stringify(cart_list));
    window.location.reload()
}

function clear_storage() {
    localStorage.clear()
    window.location.reload()
}