let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        brand: 'Vue Mastery',
        image: "./assets/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        description: "A pair of warm, fuzzy socks",
        inStock: true,
        inventory: 100,
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        onSale: true, // новое свойство
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
    },
    computed: {
        sale() {
            if (this.onSale) {
                return `${this.product} by ${this.brand} is on sale!`;
            } else {
                return `${this.product} by ${this.brand} is not on sale.`;
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

