Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" :alt="altText">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ sale }}</p>
        <p v-if="inventory > 10">In stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
        <p v-else>Out of stock</p>
        <p v-bind:class="{ outOfStock: !inStock }">{{ description }}</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="variant in variants" :key="variant.variantId">
          <div @mouseover="updateProduct(variant.variantImage)" class="color-square" :style="{ 'background-color': variant.variantColor }"></div>
        </div>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>
        <div class="cart">
          <p>Cart({{ cart }})</p>
        </div>
        <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
        <br>
        <button v-on:click="decrementCart" class="decrementCart">Remove from cart</button><br>
        <p>Shipping: {{ shipping }}</p>
        <a :href="link">More products like this</a>
     
      </div>
    </div>
  `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            image: "./assets/vmSocks-green-onWhite.jpg",
            altText: "A pair of socks",
            description: "A pair of warm, fuzzy socks",
            inStock: true,
            inventory: 100,
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
        };
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        sale() {
            if (this.onSale) {
                return `${this.product} by ${this.brand} is on sale!`;
            } else {
                return `${this.product} by ${this.brand} is not on sale.`;
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99;
            }
        }
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        decrementCart() {
            if (this.cart > 0) {
                this.cart -= 1;
            }
        },
        updateProduct(variantImage) {
            this.image = variantImage;
        }
    }
});
Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
});

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
});
