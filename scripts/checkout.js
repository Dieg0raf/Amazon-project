import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateProductQuantity, countCartQuantity } from '../data/cart.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });


    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${productId}">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label js-product-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${matchingProduct.id} " data-product-id="${matchingProduct.id}">
                Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link js-save-quantity-link-${matchingProduct.id} link-primary" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            <div class="delivery-option">
            <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Monday, June 13
                </div>
                <div class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;
});

function updateNumOfItems() {
    const numOfItems = countCartQuantity() 

    document.querySelector('.js-return-to-home-link').innerHTML = `${numOfItems} items`
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId
        removeFromCart(productId)
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove()
        updateNumOfItems()
    })
})

document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId
        const inputContainer = document.querySelector(`.js-quantity-input-${productId}`)
        const saveLink = document.querySelector(`.js-save-quantity-link-${productId}`)
        
        inputContainer.classList.add('is-editing-quantity')
        saveLink.classList.add('is-editing-quantity')
        link.classList.add('is-editing-update')
    })
})

document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId
        const updateLink = document.querySelector(`.js-update-quantity-link-${productId}`)
        const inputContainer = document.querySelector(`.js-quantity-input-${productId}`)

        inputContainer.classList.remove('is-editing-quantity')
        updateLink.classList.remove('is-editing-update')
        link.classList.remove('is-editing-quantity')

        updateProductQuantity(productId, inputContainer.value)
        updateNumOfItems()
    })
})

updateNumOfItems()