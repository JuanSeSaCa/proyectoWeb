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
      const response = await fetch('../src/productos.json');
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
      <!-- Contenido HTML aquí -->
    `;
  }
}

customElements.define('my-element', MyElement);





//
    
    const showNotification = (options) => {
      const Toast = Swal.mixin({
        toast: true,
        position: options.position || "top-end",
        showConfirmButton: options.showConfirmButton || false,
        timer: options.timer || 2000,
        timerProgressBar: options.timerProgressBar || true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: options.icon || "success",
        title: options.title || "Producto Agregado con exito ;)"
      });
    };
    
    const added = async () => {
      try {
        // Código adicional aquí...
    
        // Mostrar la notificación
        showNotification({
          icon: "success",
          title: "Producto Agregado con exito ;)"
        });
      } catch (error) {
        console.error("Error:", error);
        // Manejar el error de alguna manera adecuada
      }
    };