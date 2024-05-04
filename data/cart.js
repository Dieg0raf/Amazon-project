export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: 1
    }, 
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: 2
    }];
}

function saveToStore() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
    const quantityElement = document.querySelector(`.js-select-selector-${productId}`)
    const quantityValue = Number(quantityElement.value)
    console.log(quantityElement.value)
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item
        }
    })

    if (matchingItem) {
        matchingItem.quantity += quantityValue;
    } else {
        cart.push({
            productId: productId,
            quantity: quantityValue
            })
    }
    saveToStore()
}

export function removeFromCart(productId) {
    const newCart = []
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart
    saveToStore()
}

export function countCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity
    })

    return Number(cartQuantity)
}

export function loadCartQuantity() {
    document.querySelector('.js-cart-quantity').innerHTML = countCartQuantity()
}

let timeout;
export function updateCartQuantity(productId) {
    loadCartQuantity()
    const message = document.querySelector(`.js-added-to-cart-${productId}`)
    clearTimeout(timeout)
    message.classList.add('added-message')
    
    timeout = setTimeout(() => {
        message.classList.remove('added-message')
    }, 2000)
}

export function updateProductQuantity(productId, newQuantity) {
    document.querySelector(`.js-product-quantity-${productId}`).innerHTML = newQuantity
    
    cart.forEach((item) => {
        if (item.productId === productId) {
            item.quantity = Number(newQuantity)
        }
    })

    saveToStore()
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item
        }
    })  

    matchingItem.deliveryOptionId = Number(deliveryOptionId)

    saveToStore()
}