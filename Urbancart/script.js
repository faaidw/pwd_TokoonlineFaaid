/* ===========================================
        UrbanCart V3
=========================================== */

// =======================
// LOCAL STORAGE
// =======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// SIMPAN CART
// =======================

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();

}

// =======================
// BADGE
// =======================

function updateCartBadge() {

    const badge = document.getElementById("cart-count");

    if (!badge) return;

    let total = 0;

    cart.forEach(item => {

        total += item.qty;

    });

    badge.innerHTML = total;

}

updateCartBadge();


// =======================
// TAMBAH KE KERANJANG
// =======================

function addToCart(product) {

    const item = cart.find(i =>
        i.name === product.name &&
        i.size === product.size
    );

    if (item) {

        item.qty += product.qty;

    } else {

        cart.push(product);

    }

    saveCart();

    alert(product.name + " berhasil ditambahkan ke keranjang.");

}


// =======================
// DETAIL PRODUK
// =======================

const btnCart = document.querySelector(".btn-cart");

if (btnCart) {

    btnCart.addEventListener("click", function (e) {

        e.preventDefault();

        const qty = parseInt(document.getElementById("jumlah").value);

        addToCart({

            name: "Urban Sneakers Black",

            price: 5650000,

            image: "images/Sepatu.png",

            size: "42",

            qty: qty

        });

    });

}


// =======================
// TOMBOL + - DETAIL
// =======================

function tambah() {

    const qty = document.getElementById("jumlah");

    qty.value = parseInt(qty.value) + 1;

}

function kurang() {

    const qty = document.getElementById("jumlah");

    if (parseInt(qty.value) > 1) {

        qty.value = parseInt(qty.value) - 1;

    }

}

// =======================
// HALAMAN KERANJANG
// =======================

const cartList = document.getElementById("cart-list");

if (cartList) {

    renderCart();

}

function renderCart() {

    if (!cartList) return;

    cartList.innerHTML = "";

    let subtotal = 0;

    // =======================
    // KERANJANG KOSONG
    // =======================

    if (cart.length === 0) {

        cartList.innerHTML = `

        <div class="empty-cart">

            <i class="fa-solid fa-cart-shopping"></i>

            <h2>Keranjang Masih Kosong</h2>

            <p>Yuk tambahkan produk favoritmu.</p>

            <a href="index.html">Belanja Sekarang</a>

        </div>

        `;

        document.getElementById("subtotal").innerHTML = "Rp0";
        document.getElementById("diskon").innerHTML = "Rp0";
        document.getElementById("total").innerHTML = "Rp0";

        return;

    }

    // =======================
    // TAMPILKAN PRODUK
    // =======================

    cart.forEach((item, index) => {

        subtotal += item.price * item.qty;

        cartList.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="item-info">

                <h2>${item.name}</h2>

                <p>Ukuran : ${item.size}</p>

                <h3>Rp ${item.price.toLocaleString("id-ID")}</h3>

            </div>

            <div class="qty-box">

                <button onclick="kurangQty(${index})">-</button>

                <input type="text" value="${item.qty}" readonly>

                <button onclick="tambahQty(${index})">+</button>

            </div>

            <div class="subtotal">

                <h3>

                    Rp ${(item.price * item.qty).toLocaleString("id-ID")}

                </h3>

                <button class="delete" onclick="hapusItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    // =======================
    // HITUNG TOTAL
    // =======================

    let diskon = 0;

    if (subtotal >= 10000000) {

        diskon = 250000;

    }

    const total = subtotal - diskon;

    document.getElementById("subtotal").innerHTML =
        "Rp " + subtotal.toLocaleString("id-ID");

    document.getElementById("diskon").innerHTML =
        "Rp " + diskon.toLocaleString("id-ID");

    document.getElementById("total").innerHTML =
        "Rp " + total.toLocaleString("id-ID");

}

// =======================
// TAMBAH QTY
// =======================

function tambahQty(index) {

    cart[index].qty++;

    saveCart();

    renderCart();

}

// =======================
// KURANG QTY
// =======================

function kurangQty(index) {

    if (cart[index].qty > 1) {

        cart[index].qty--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    renderCart();

}

// =======================
// HAPUS ITEM
// =======================

function hapusItem(index) {

    if (confirm("Hapus produk dari keranjang?")) {

        cart.splice(index, 1);

        saveCart();

        renderCart();

    }

}

// =======================
// CHECKOUT
// =======================

function checkout() {

    if(cart.length == 0){

        alert("Keranjang masih kosong.");

        return;

    }

    let subtotal = 0;

    cart.forEach(item=>{

        subtotal += item.price * item.qty;

    });

    let diskon = subtotal >= 10000000 ? 250000 : 0;

    let total = subtotal - diskon;

    localStorage.setItem("checkoutTotal", total);

    window.location.href="bayar.html";

}
// =======================
// BAYAR
// =======================

function bayarSekarang(){

    window.location.href="berhasil.html";

    if (cart.length === 0) {

        alert("Tidak ada produk untuk dibayar.");

        return;

    }

    // Kosongkan keranjang
    cart = [];

    saveCart();

    localStorage.removeItem("checkoutCart");

    // Pindah ke halaman berhasil
    window.location.href = "berhasil.html";

}

// =======================
// SEARCH PRODUCT
// =======================

function searchProduct() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const keyword = input.value.toLowerCase();

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        const nama = (card.dataset.name || "").toLowerCase();

        if (nama.includes(keyword)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}

// =======================
// GANTI GAMBAR DETAIL
// =======================

const thumbnails = document.querySelectorAll(".thumbnail img");

thumbnails.forEach(img => {

    img.addEventListener("click", function () {

        const main = document.getElementById("mainImage");

        if (main) {

            main.src = this.src;

        }

    });

});

// =======================
// UPDATE BADGE SAAT HALAMAN DIBUKA
// =======================

document.addEventListener("DOMContentLoaded", function () {

    updateCartBadge();

});

// =======================
// HAMBURGER MENU TOGGLE
// =======================

function toggleMenu() {

    const nav = document.getElementById("navMenu");

    const hamburger = document.querySelector(".hamburger");

    if (nav) nav.classList.toggle("active");

    if (hamburger) hamburger.classList.toggle("active");

}