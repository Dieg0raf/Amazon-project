class Cart {

    cartItems;
    timeout;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage()

    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if (!this.cartItems) {
            this.cartItems = [{
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
    }


    #saveToStore() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }

    addToCart(productId) {
        // const quantityElement = document.querySelector(`.js-select-selector-${productId}`)
        // const quantityValue = Number(quantityElement.value)
        let matchingItem;

        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item
            }
        })

        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: 1
                })
        }
        this.#saveToStore()
    }

    removeFromCart(productId) {
        const newCart = []
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart
        this.#saveToStore()
    }

    countCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((item) => {
            cartQuantity += item.quantity
        })

        return Number(cartQuantity)
    }

    loadCartQuantity() {
        document.querySelector('.js-cart-quantity').innerHTML = this.countCartQuantity()
    }

    updateCartQuantity(productId) {
        this.loadCartQuantity()
        const message = document.querySelector(`.js-added-to-cart-${productId}`)
        clearTimeout(timeout)
        message.classList.add('added-message')
        
        this.timeout = setTimeout(() => {
            message.classList.remove('added-message')
        }, 2000)
    }

    updateProductQuantity(productId, newQuantity) {
        document.querySelector(`.js-product-quantity-${productId}`).innerHTML = newQuantity
        
        this.cartItems.forEach((item) => {
            if (item.productId === productId) {
                item.quantity = Number(newQuantity)
            }
        })
        this.#saveToStore()
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item
            }
        })  
        matchingItem.deliveryOptionId = Number(deliveryOptionId)
        this.#saveToStore()
    }
}

const cart = new Cart('cart-oop')
const businessCart = new Cart('cart-business')

businessCart.removeFromCart("bc2847e9-5323-403f-b7cf-57fde044a955")
console.log(cart)
console.log(businessCart)