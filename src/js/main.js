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
            const response = await fetch('../db/productos.json');
            const data = await response.json();
            this.products = data.map(item => ({
                id: item.id,
                title: item.titulo,
                image: item.imagen,
                category: item.categoria.id,
                price: item.precio
            }));
            this.requestUpdate();
        }
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
    font-weight:700;
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

  .principal__Titulo {
    margin-bottom: 1.5rem;
    color: var(--color-primario)
  }
  
  .contenedor__productos{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-flow: row;
    height: calc(100vh - 140px);
    overflow-y: scroll;
    gap: 1.5rem;
  }
  .producto {
    background-color: var(--color-cuarto) ;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
  }
  .producto:hover {
    transform: scale(1.03);
        transition: transform 0.3s ease-in-out;
  }
  .producto__Imagen {
    max-width: 100%;
    border-radius: 1rem;
  }
  .producto__Detalles {
    margin-top: 1rem;
  }

  .producto__Titulo {
    color:var(--color-quinto);
    font-size: 1.2rem;
    margin-bottom: .4rem;
  }

  .producto__Precio {
    color: var(--color-quinto);
    font-weight: bold;
    margin-bottom: 1rem;

  }

  .agregar__producto {

    background-color: var(--color-sexto);
    color: var(--color-quinto);
    font-weight:600;
    padding: .5rem 1rem;
    border-radius: .7rem;
    cursor: pointer;
    transition: background-color .3s;
    border: 2px solid var(--color-quinto);

  }

  .agregar__producto:hover {
    background-color: var(--color-quinto);
    color:var(--color-primario);
  }

  /*Carrito*/

  .contenedor__carrito {
    display:flex;
    flex-direction:column;
    gap:1.5rem;
  }

  .producto__Carrito {
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:black;
    color:white;
    padding:.5rem;
    padding-right:1.5rem;
    border-radius:1rem;
  }
  .carrito__Imagen {
    width: 7rem;
    border-radius: 1rem;
  }

  .producto__Carrito small {
    font-size: .8rem;
  }
  .carrito__Eliminar {
  border:0;
  background-color:transparent;
  cursor:pointer;
  }

  .acciones__carrito {
    display:flex;
    justify-content:space-between;
    margin-top:1rem;
  }

  .acciones__carrito_vaciar {
    border-radius:1rem;
    color:var(--color-quinto);
    text-transform:upperCase;
    cursor:pointer;
    border:0;
    background-color:var(--color-ternario);
    padding:0.7rem;

  }
  .acciones__carrito_vaciar:hover{
    color:gray;
    border:2px solid gray;
    background-color:var(--color-quinto);

  }

  .acciones__carrito_derecha{
    display:flex;
  }

  .acciones__carrito_total {
    display:flex;
    background-color:var(--color-sexto);
    border-top-left-radius:0.7rem;
    border-bottom-left-radius:0.7rem;
    color:var(--color-quinto);
    text-transform:upperCase;
    padding:0.2rem;
    gap:1rem; 
  }

  .acciones__carrito_comprar {

    border:0;
    background-color:var(--color-sexto);
    padding:1rem;
    color:var(--color-quinto);
    text-transform:upperCase;
    cursor:pointer;
    border-top-right-radius:0.7rem;
    border-bottom-right-radius:0.7rem;

  }
  .acciones__carrito_comprar:hover {
    background-color:var(--color-primario);
    color:var(--color-ternario);
    border:2px solid gray;   
  }

  .alerta__carrito image {
    display:flex;
    align-items:center;
  }

  .alerta__carrito p {
    margin-right:.3rem;
    font-size:1.1rem;
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
  
    }
    .aside-visible {
      transform:translateX(0%);
      opacity:1;
      visibility:visible;
    }




    

  }


























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
            ${this.view === 'products' ? this.renderizarProductos() : this.renderCarrito()}
        </main>
    </div>
    `;
    }


    verCarrito() {
        this.activeCategory = null;
        this.view = 'carrito';
        this.menuOpen = false; // 
        this.requestUpdate();
    }


    cambiarCategoria(categoria) {
        this.activeCategory = categoria;
        this.view = 'productos';
        this.menuOpen = false;
        this.requestUpdate();
    }


    renderizarProductos() {
        // console.log(this.products);
        const productosFiltrados = this.productos.filter(producto => this.activeCategory === 'todos' || producto.category === this.activeCategory);
        return html`
    <h2 class="principal__Titulo">${this.activeCategory === 'todos' ? 'Todos los productos' : this.activeCategory.charAt(0).toUpperCase() + this.activeCategory.slice(1)}</h2>
    <div class="contenedor__productos">
      ${productosFiltrados.map(producto => html`
        <div class="producto">
          <img class="producto__Imagen" src=${producto.imagen} alt="">
          <div class="producto__Detalles">
            <h3 class="producto__Titulo">${producto.titulo}</h3>
            <p class="producto__Precio">$${producto.precio}</p>
            <button class="agregar__producto" @click=${() => this.agregarAlCarrito(producto)}>Agregar</button>
          </div>
        </div>
      `)}
    </div>
  `;
    }


    renderCarrito() {
        const total = this.itemsCarrito.reduce((acumulador, item) => acumulador + item.subtotal, 0);

        return html`
    <h2 class="principal__Titulo">Carrito de Compras</h2>
    ${this.cartItems.length > 0 ? html`
      <div class="contenedor__carrito"> 
        ${this.cartItems.map(item => html`
          <div class="producto__Carrito"> 
            <img class="carrito__Imagen" src="${item.imagen}" alt="">
            <div class="contenido__Producto">
              <small>Producto</small>    
              <h3>${item.titulo}</h3>
            </div>
            <div class="carrito__Cantidad">
              <small>Cantidad</small>
              <p>${item.cantidad}</p>
            </div>
            <div class="carrito__Precio">
              <small>Precio</small>
              <p>$${item.precio}</p>
            </div>
            <div class="carrito__Subtotal">
              <small>Subtotal</small>
              <p>$${item.subtotal}</p>
            </div>
            <button class="carrito__Eliminar" @click=${() => this.eliminarDelCarrito(item.id)}>
              <img src="./public/icono.svg" alt="">
            </button>
          </div>
        `)}
      </div>
      <div class="acciones__carrito">
        <div class="acciones__carrito_izquierda">
          <button class="acciones__carrito_vaciar" @click=${this.vaciarCarrito}>Vaciar Carrito</button>
        </div>
        <div class="acciones__carrito_derecha">
          <div class="acciones__carrito_total">
            <p>Total:</p>
            <p>$${total}</p>
          </div>
          <button class="acciones__carrito_comprar" @click=${() => this.alerta(Swal)}>¡Comprar ahora!</button>
        </div>
      </div>
    ` : html`<div class="alerta__carrito"><p>Tu carrito está vacío...</p><img class="" src="" alt=""></div>`}
  `;
    }


    eliminarDelCarrito(productId) {
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



    vaciarCarrito() {
        this.cartItems = [];
        this.requestUpdate();
    }


    agregarAlCarrito(product) {
        agregar()
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


const agregar = async () => {
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
