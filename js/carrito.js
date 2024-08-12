// Seleccionar los elementos clave
const cartIcon = document.querySelector('.container-cart-icon');
const cartContainer = document.querySelector('.container-cart-products');
const cartCount = document.getElementById('contador-productos');
const cartTotal = document.querySelector('.total-pagar');
const cartEmpty = document.querySelector('.cart-empty');
const cartProducts = document.querySelector('.container-cart-products');
const itemsContainer = document.querySelector('.container-items');
const cartProductsList = document.querySelector('.container-cart-products');

// Cargar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en la UI
const updateCartUI = () => {
    cartProductsList.innerHTML = ''; // Limpiar el carrito
    let total = 0;
    cart.forEach((product, index) => {
        total += parseFloat(product.price) * product.quantity;
        const productElement = document.createElement('div');
        productElement.classList.add('cart-product');
        productElement.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">$${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close" data-index="${index}">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        cartProductsList.appendChild(productElement);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
    cartEmpty.classList.toggle('hidden', cart.length > 0);
    cartTotal.parentElement.classList.toggle('hidden', cart.length === 0);

    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
};

// Función para agregar un producto al carrito
const addProductToCart = (product) => {
    const existingProduct = cart.find(item => item.title === product.title);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
};

// Función para eliminar un producto del carrito
cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCartUI();
    }
});

// Evento para abrir/cerrar el carrito
cartIcon.addEventListener('click', () => {
    cartContainer.classList.toggle('hidden-cart');
});

// Evento para añadir productos al carrito
itemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const productElement = e.target.closest('.item');
        const title = productElement.querySelector('h2').textContent;
        const price = productElement.querySelector('.price').textContent.replace('$', '');
        addProductToCart({ title, price });
    }
});

// Inicializar el carrito en la UI
updateCartUI();
