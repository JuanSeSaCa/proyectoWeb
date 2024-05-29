// import { LitElement, css, html } from 'lit'
// import litLogo from './assets/lit.svg'
// import viteLogo from '/vite.svg'

// /**
//  * An example element.
//  *
//  * @slot - This element has a slot
//  * @csspart button - The button
//  */
// export class MyElement extends LitElement {
//   static get properties() {
//     return {
//       /**
//        * Copy for the read the docs hint.
//        */
//       docsHint: { type: String },

//       /**
//        * The number of times the button has been clicked.
//        */
//       count: { type: Number },
//     }
//   }

//   constructor() {
//     super()
//     this.docsHint = 'Click on the Vite and Lit logos to learn more'
//     this.count = 0
//   }

//   render() {
//     return html`
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src=${viteLogo} class="logo" alt="Vite logo" />
//         </a>
//         <a href="https://lit.dev" target="_blank">
//           <img src=${litLogo} class="logo lit" alt="Lit logo" />
//         </a>
//       </div>
//       <slot></slot>
//       <div class="card">
//         <button @click=${this._onClick} part="button">
//           count is ${this.count}
//         </button>
//       </div>
//       <p class="read-the-docs">${this.docsHint}</p>
//     `
//   }

//   _onClick() {
//     this.count++
//   }

//   static get styles() {
//     return css`
//       :host {
//         max-width: 1280px;
//         margin: 0 auto;
//         padding: 2rem;
//         text-align: center;
//       }

//       .logo {
//         height: 6em;
//         padding: 1.5em;
//         will-change: filter;
//         transition: filter 300ms;
//       }
//       .logo:hover {
//         filter: drop-shadow(0 0 2em #646cffaa);
//       }
//       .logo.lit:hover {
//         filter: drop-shadow(0 0 2em #325cffaa);
//       }

//       .card {
//         padding: 2em;
//       }

//       .read-the-docs {
//         color: #888;
//       }

//       a {
//         font-weight: 500;
//         color: #646cff;
//         text-decoration: inherit;
//       }
//       a:hover {
//         color: #535bf2;
//       }

//       ::slotted(h1) {
//         font-size: 3.2em;
//         line-height: 1.1;
//       }

//       button {
//         border-radius: 8px;
//         border: 1px solid transparent;
//         padding: 0.6em 1.2em;
//         font-size: 1em;
//         font-weight: 500;
//         font-family: inherit;
//         background-color: #1a1a1a;
//         cursor: pointer;
//         transition: border-color 0.25s;
//       }
//       button:hover {
//         border-color: #646cff;
//       }
//       button:focus,
//       button:focus-visible {
//         outline: 4px auto -webkit-focus-ring-color;
//       }

//       @media (prefers-color-scheme: light) {
//         a:hover {
//           color: #747bff;
//         }
//         button {
//           background-color: #f9f9f9;
//         }
//       }
//     `
//   }
// }

// window.customElements.define('my-element', MyElement)


////////////////////////////////////////////////////////////////////


import { LitElement, html, css } from 'lit'

class MyElement extends LitElement {
    static get properties() {
        return {
            activeCategory: { type: String },
            view: { type: String },
            cartItems: { type: Array },
            products: { type: Array },
            menuOpen: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.activeCategory = 'all';
        this.view = 'products';
        this.cartItems = [];
        this.products = [];
        this.menuOpen = false;
        this.loadProducts();
    }

    connectedCallback() {
        super.connectedCallback();
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const response = await fetch('/src/js/products.json');
            const data = await response.json();
            this.products = data.map(item => ({
                id: item.id,
                title: item.titulo,
                image: item.imagen,
                category: item.categoria.id,
                price: item.precio
            }));
            // this.requestUpdate();
        } catch (error) {
            console.error('Error al cargar los productos:',error);
        }
    }
    ///////////// css //////////////////
 static styles = css`
  .contain {
    display: grid;
    grid-template-columns: 1fr 4fr;
    background-color: var(--color-ternario);
  }

  aside {
    position:sticky;
    justify-content: space-evenly;
    flex-direction: column;
    display:flex;
    height: 100vh;
    top:0;
    padding:1rem;
    padding-right: 0;
    color: var(--color-primario)

  }

  .logo {
    font-size:2rem;
    text-align: center;
    font-weight:700;
  }

  .button__Category {
    font-size:1rem;
    text-align: center;
    width:100%;
    padding:1rem;
    font-weight:800;
    color: var(--color-quinto);
    border:0;
    background-color: var(--color-ternario);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    gap:1rem;


  }

  .button__Category:hover {
    background-color: var(--color-sexto);
    color: var(--color-primario);
    width:100%;
    position:relative;
    border-top-left-radius:1rem;
    border-top-right-radius:1rem;
  }

  .button__Category.active {
    background-color: var(--color-sexto);
    color: var(--color-primario);
    width:100%;
    position:relative;
    border-top-left-radius:1rem;
    border-top-right-radius:1rem;
  }

  .button__Category.active::before {

    content: '';
    position: absolute;
    width:1rem;
    height:2rem;
    bottom:100%;
    right:0;
    background-color:transparent;
    border-bottom-right-radius:.8rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
  }

  
  .button__Category.active::after {

    content:'';
    position:absolute;
    width:1rem;
    height:2rem;
    top:100%;
    right:0;
    background-color:transparent;
    border-top-right-radius:.7rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
  }

  .cart__Button {
    font-size:1rem;
    text-align: center;
    width:100%;
    padding:1rem;
    font-weight:700;
    color: var(--color-quinto);
    border:0;
    background-color: var(--color-primario);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    gap:1rem;
    display:block;
  }

  .cart__Button.active {
    background-color: var(--color-sexto);
    color: var(--color-primario);
    width:90%;
    position:relative;
    border-top-left-radius:1rem;
    border-top-right-radius:1rem;
  }

  .cart__Button.active::before {

    content: '';
    position: absolute;
    width:1rem;
    height:2rem;
    bottom:100%;
    right:0;
    background-color:transparent;
    border-bottom-right-radius:.8rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
  }
  .cart__Button.active::after {

    content: '';
    position: absolute;
    width:1rem;
    height:2rem;
    top:100%;
    right:0;
    background-color:transparent;
    border-top-right-radius:.8rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
  }
  .cart__Button.active.number {
    background-color: var(--color-ternario);
    color:var(--color-quinto);
  }

  .cart__Button:hover {
    background-color: var(--color-quinto);
    color:var(--color-ternario);
    border-top-left-radius:1rem;
    border-bottom-left-radius:1rem;
    position: relative;
  }

  .number {
    background-color: var(--color-quinto);
    color:var(--color-ternario);
    padding: 0 .30rem;
    border-radius: .30rem;
    border: none solid;
  }

  .menu {
    list-style:none;
    display: flex; 
    flex-direction:column;
    gap: 1rem;
  }

  .footer__text {
    font-size: .9rem;
    text-align:center;
    color:var(--color-quinto);
  }

  main {
    background-color: var (var(--color-sexto));
    margin:1rem;
    margin-left:0;
    padding: 2.5rem;
    border-radius: 1.5rem;
  }

  .principal__Title {
    margin-bottom: 1.5rem;
    color: var(--color-primario)
  }
  
  .product__container{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem; 
  }
  .products {
    background-color: var(--color-sexto) ;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
  }
  .products:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease-in-out;
  }
  .product__Image {
    max-width: 100%;
    border-radius: 1rem;
  }
  .product__Details {
    margin-top: 1rem;
  }

  .product__Title {
    color:var(--color-quinto);
    font-size: 1.2rem;
    margin-bottom: .4rem;
  }

  .product__Price {
    color: var(--color-quinto);
    font-weight: bold;
    margin-bottom: 1rem;

  }

  .add__product {

    background-color: var(--color-sexto);
    color: var(--color-quinto);
    font-weight:600;
    padding: .5rem 1rem;
    border-radius: .7rem;
    cursor: pointer;
    transition: background-color .3s;
    border: 2px solid var(--color-quinto);

  }

  .add__product:hover {
    background-color: var(--color-quinto);
    color:var(--color-primario);
  }

  /*Carrito*/

  .container__ProductCart {
    display:flex;
    flex-direction:column;
    gap:1.5rem;
  }

  .product__Cart {
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:black;
    color:white;
    padding:.5rem;
    padding-right:1.5rem;
    border-radius:1rem;
  }
  .cart__Image {
    width: 7rem;
    border-radius: 1rem;
  }

  .product__Cart small {
    font-size: .8rem;
  }
  .cart__Delete {
  border:0;
  background-color:transparent;
  cursor:pointer;
  }
  .cart__Container{
    display:flex;
    flex-direction:column;
    gap:1.5rem;
}

  .cart__Actions {
    display:flex;
    justify-content:space-between;
    margin-top:1rem;
  }

  .cart__Actions_Delete {
    border-radius:1rem;
    color:var(--color-quinto);
    text-transform:upperCase;
    cursor:pointer;
    border:0;
    background-color:var(--color-ternario);
    padding:0.7rem;

  }
  .cart__Actions_Delete:hover{
    color:gray;
    border:2px solid gray;
    background-color:var(--color-quinto);

  }

  .cart__Actions_Right{
    display:flex;
  }

  .cart__Actions_Total {
    display:flex;
    background-color:var(--color-sexto);
    border-top-left-radius:0.7rem;
    border-bottom-left-radius:0.7rem;
    color:var(--color-quinto);
    text-transform:upperCase;
    padding:0.2rem;
    gap:1rem; 
  }

  .cart__Actions_Buy {

    border:0;
    background-color:var(--color-sexto);
    padding:1rem;
    color:var(--color-quinto);
    text-transform:upperCase;
    cursor:pointer;
    border-top-right-radius:0.7rem;
    border-bottom-right-radius:0.7rem;

  }
  .cart__Actions_Buy:hover {
    background-color:var(--color-primario);
    color:var(--color-ternario);
    border:2px solid gray;   
  }

  .empty__cart{
    display:flex;
    align-items:center;
  }

  .empty__cart p {
    margin-right:.3rem;
    font-size:1.1rem;
  }

    .header{
        display:none;
    }
    .close__menu{
        display:none;
    }


    @media screen and (max-width:700px) {
        .contain {
            display: flex;
            flex-direction: column;
            min-height:100vh;
        }
        .logo {
            font-size:1.4rem;
            margin-bottom:0
        }

        aside {
            position:fixed;
            z-index:9;
            background-color: var(--color-ternario);
            flex-direction: column;
            display:flex;
            left:0;
            opacity:0;
            width: 50%;
            visibility: hidden;
            transition:0.3s;
            padding:1rem;
            padding-right: 0;
            color: var(--color-primario);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            transform:translateX(-100%);
    
        }
        .aside-visible {
        transform:translateX(0%);
        opacity:1;
        visibility:visible;
        }
        main{
            margin:1rem;
            padding:1.5rem;
        }
        .product__container{
            grid-template-columns:1fr;
        }
        .button__Category.active::before,
        .button__Category.active::after,
        .cart__Button.active::before,
        .cart__Button.active::after{
            display:none
        }
        .cart__Button.active{
            width:84%; 
        }
        .cart__Button:hover{
            width:84%;
        }
        .header{
            display:flex;
            padding:1rem;
            justify-content:space-between;
            align-items:center;
        }
        .header__Mobile .logo{
            color:var(--clr-white);
        }
        .menu{
            gap:2rem;
            padding:0;
            margin:0; 
            width:100%; 
        }
        .open__menu,
        .close__menu{
            background-color:transparent;
            color:var(--color-quinto);
            border:none;
            cursor:pointer;
        }
        .menu__svg{
            width:2.5rem;
        }
        .close__menu{
            display:block;
            height:0;
        }
        .header__menu{
            display:flex;
            width:100%;
            justify-content: space-between;
            align-items: center;
        }
        ul{
            margin:0;
            padding:0; 
            width:100%; 
        }
        nav{
            width:100%; 
        }
        .menu {
            list-style:none;
            padding:0;
            margin:0; 
            width:100%; 
        }
        .button__Category{
            width:100%; 
        }
        .cart__Button{
            width:84%; 
        }

        .cart__Image{
            width: 40%; 
            margin-bottom:1rem;
        }
        .product__Cart{
            padding: 1.5rem;
            flex-wrap: wrap;
        }
        .principal__Title {
            margin-bottom: 1.5rem;
        }
        .cart__Actions_Right {
            display: flex;
            width: 64%;
            margin-left: 1rem;
        }
        .cart__Actions_Delete {
            padding:.9rem;
        }
        .content__Product{
            font-size: 0.9rem;
            margin-right: 0.5rem;
            width: 46%;
        }

        .cart__Amount,
        .cart__Price,
        .cart__Subtotal{
            font-size:.8rem;
            margin-right: .5rem;
        }

        .cart__Delete img{
            width:1.5rem;
        }
    }

  `;

render() {
return html`
    <div class="contain">
        <header class="header">
            <h1 class="logo">CampusShop</h1>
            <button class="open__menu" @click="${this.openMenu}">
                <img class="menu__svg" src="./public" alt="">
            </button>
        </header>
        <aside class="${this.menuOpen ? 'aside-visible' : ''}">
            <header class="header__menu">
                <h1 class="logo">CampusShop</h1>
                <button class="close__menu" @click="${this.closeMenu}">
                    <img class="closeMenu__svg" src="../storage/img/closeMenu__svg.svg" alt="">
                </button>
            </header>
                <nav>
                    <ul class="menu">
                        <li><button class="button__Category ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.changeCategory('all')}>Todos los Productos</button></li>
                        <li><button class="button__Category ${this.activeCategory === 'abrigos' ? 'active' : ''}" @click=${() => this.changeCategory('abrigos')}>Abrigos</button></li>
                        <li><button class="button__Category ${this.activeCategory === 'camisas' ? 'active' : ''}" @click=${() => this.changeCategory('camisas')}>Camisetas</button></li>
                        <li><button class="button__Category ${this.activeCategory === 'pantalones' ? 'active' : ''}" @click=${() => this.changeCategory('pantalones')}>Pantalones</button></li>
                        <li style="width: 100%;">
                            <a class="cart__Button ${this.view === 'cart' ? 'active' : ''}" @click=${this.viewCart}>
                                Cart
                                <span class="number">${this.cartItems.length}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <footer>
                    <p class="footer__text">© 2024 CampusShop</p>
                </footer>
        </aside>
    <main>
            ${this.view === 'products' ? this.renderProducts() : this.renderCart()}
    </main>
</div>
`;
}


viewCart() {
    this.activeCategory = null;
    this.view = 'cart';
    this.menuOpen = false; 
    // this.requestUpdate();
}

changeCategory(category) {
    this.activeCategory = category;
    this.view = 'products';
    this.menuOpen = false; 
    // this.requestUpdate();
}



renderProducts() {
    const filteredProducts = this.products.filter(product => this.activeCategory === 'all' || product.category === this.activeCategory);
    return html`
        <h2 class="principal__Title">${this.activeCategory === 'all' ? 'Todos los productos' : this.activeCategory.charAt(0).toUpperCase() + this.activeCategory.slice(1)}</h2>
        <div class="product__container">
            ${filteredProducts.map(product => html`
                <div class="products">
                    <img class="product__Image" src=${product.image} alt="">
                    ${console.log(product.image)}
                    <div class="product__Details">
                        <h3 class="product__Title">${product.title}</h3>
                        <p class="product__Price">$${product.price}</p>
                        <button class="add__product" @click=${() => this.addToCart(product)}>Agregar</button>
                    </div>
                </div>
            `)}
        </div>
    `;
}


renderCart() {
    const total = this.cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    return html`
        <h2 class="principal__Title">Carrito de Compras</h2>
        ${this.cartItems.length > 0 ? html`
            <div class="cart__Container"> 
                ${this.cartItems.map(item => html`
                <div class="product__Cart"> 
                    <img class="cart__Image" src="${item.image}" alt="">
                    <div class="content__Product">
                        <small>Productos</small>    
                        <h3>${item.title}</h3>
                    </div>
                    <div class="cart__Amount">
                        <small>Cantidad</small>
                        <p>${item.quantity}</p>
                    </div>
                    <div class="cart__Price">
                        <small>Precio</small>
                        <p>$${item.price}</p>
                    </div>
                    <div class="cart__Subtotal">
                        <small>Subtotal</small>
                        <p>$${item.subtotal}</p>
                    </div>
                    <button class="cart__Delete" @click=${() => this.removeFromCart(item.id)}>
                        <img src="../storage/img/icon.svg" alt="">
                    </button>
                </div>
                `)}
            </div>
            <div class="cart__Actions">
                <div class="cart__Actions_Left">
                    <button class="cart__Actions_Delete" @click=${this.emptyCart}>Vaciar Carrito</button>
                </div>
                <div class="cart__Actions_Right">
                    <div class="cart__Actions_Total">
                        <p>Total:</p>
                        <p>$${total}</p>
                    </div>
                    <button class="cart__Actions_Buy" @click=${() => this.alert(Swal)}>Buy now!</button>
                </div>
            </div>
        ` : html`<div class="empty__cart"><p>Tu carrito está vacío. . .</p></div>`}
    `;
}
    


removeFromCart(productId) {
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (this.cartItems[itemIndex].quantity > 1) {
            this.cartItems[itemIndex].quantity -= 1;
            this.cartItems[itemIndex].subtotal = this.cartItems[itemIndex].quantity * this.cartItems[itemIndex].price;
        } else {
            this.cartItems = this.cartItems.filter(item => item.id !== productId);
        }
    }
    this.requestUpdate();
}

emptyCart() {
    this.cartItems = [];
    this.requestUpdate();
}

addToCart(product) {
    added()
    const cartItem = this.cartItems.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity += 1;
        cartItem.subtotal = cartItem.quantity * cartItem.price;
    } else {
        this.cartItems = [
            ...this.cartItems,
            { ...product, quantity: 1, subtotal: product.price }
        ];
    }
    this.requestUpdate();
}
    
openMenu() {
    this.menuOpen = true;
    this.requestUpdate();
}
    
closeMenu() {
    this.menuOpen = false;
    this.requestUpdate();
}
    
}

customElements.define('my-element', MyElement)
    


const added = async () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
        });
        Toast.fire({
            icon: "success",
            title: "Producto agregado exitosamente :)"
        });
}