Vue.component('product-review', {
    template: `
       <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>
        <label for="recommend">Would you recommend this product?</label><br>
        <input type="radio" id="recommend-yes" value="yes" v-model="recommend"> <label for="recommend-yes">Yes</label><br>
        <input type="radio" id="recommend-no" value="no" v-model="recommend"> <label for="recommend-no">No</label>
    </p>

    <p>
        <input type="submit" value="Submit">
    </p>
</form>
       `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (!this.name) this.errors.push("Name required.");
            if (!this.review) this.errors.push("Review required.");
            if (!this.rating) this.errors.push("Rating required.");
            if (!this.recommend) this.errors.push("Recommendation required.");

            if (this.errors.length === 0) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            }
        }
    }
});


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
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
        <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
        <br>
        <button v-on:click="removeFromCart" class="removeFromCart">Remove from cart</button>
        <p>Shipping: {{ shipping }}</p>
        <a :href="link">More products like this</a>
        <product-review @review-submitted="addReview"></product-review>
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
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
            reviews: []
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
            this.$emit('add-to-cart', this.variants[0].variantId);
        },
        removeFromCart() {
            if (this.cart.length > 0) {
                this.$emit('remove-from-cart', this.cart[this.cart.length - 1]);
            }
        },
        updateProduct(variantImage) {
            this.image = variantImage;
        },
        addReview(productReview) {
            this.reviews.push(productReview);
        }
    }
});


let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        // Метод для удаления товара из корзины
        removeFromCart(id) {
            let index = this.cart.indexOf(id);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        }
    }
});
