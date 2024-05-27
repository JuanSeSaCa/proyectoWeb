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
  static get properties()  {
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
      const response = await fetch('../src/productos.jsonn');
      const data = await response.json();
      this.products = data.map(item => ({
        id: item.id,
        title: item.titulo,
        image: item.imagen,
        category: item.categoria.id,
        price: item.precio
      }));
      this.requestUpdate();
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }
///////////// css //////////////////
  static styles = css`
    /* Estilos CSS aquí */
  `;

  render() {
    return html`
    <div class="contain">
    <header class="header">
        <h1 class="logo">CampusShop</h1>
        <button class="open__menu" @click="${this.openMenu}">
            <img class="menu__svg" src="./public/menu.svg" alt="">
        </button>
    </header>
    <aside class="${this.menuOpen ? 'aside-visible' : ''}">
        <header class="header__menu">
            <h1 class="logo">CampusShop</h1>
            <button class="close__menu" @click="${this.closeMenu}">
                <img class="closeMenu__svg" src="./public/closeMenu__svg.svg" alt="">
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

  vie






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
customElements.define('my-element', MyElement);





  //
      
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
   