let cart = [];
let total = 0;

// --- CONFIGURAÇÃO: Coloque o número do seu Atelier aqui (DDI + DDD + Número) ---
const SEU_WHATSAPP = "5511999999999"; 

// 1. Função para Abrir/Fechar Carrinho
function toggleCart() {
    document.getElementById('side-cart').classList.toggle('active');
}

// 2. Função para Adicionar ao Carrinho
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCartUI();
    
    // Abre o carrinho para mostrar que o item foi adicionado
    if(!document.getElementById('side-cart').classList.contains('active')) {
        toggleCart();
    }
}

// 3. Atualiza a Interface do Carrinho
function updateCartUI() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
        `;
        list.appendChild(li);
    });

    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// 4. ENVIO DO CARRINHO VIA WHATSAPP
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let itensTexto = "";
    cart.forEach((item, index) => {
        itensTexto += `- ${item.name} (R$ ${item.price.toFixed(2)})%0A`;
    });

    const mensagem = `*Lista de Interesse - Bella Noiva*%0A%0A` +
        `Olá! Gostei desses modelos do catálogo e gostaria de verificar disponibilidade:%0A%0A` +
        `${itensTexto}%0A` +
        `*Total Estimado:* R$ ${total.toFixed(2)}%0A%0A` +
        `Como posso proceder para a prova?`;

    const linkZap = `https://api.whatsapp.com/send?phone=${SEU_WHATSAPP}&text=${mensagem}`;
    window.open(linkZap, '_blank');
}

// 5. ENVIO DO FORMULÁRIO DE AGENDAMENTO VIA WHATSAPP
function enviarWhatsApp(event, form) {
    event.preventDefault();

    const nome = form.querySelector('#nome').value;
    const tel = form.querySelector('#tel').value;
    const dataProva = form.querySelector('#data_prova').value.split('-').reverse().join('/');
    const dataEvento = form.querySelector('#data_evento').value.split('-').reverse().join('/');
    const categoria = form.querySelector('#categoria').value;
    const obs = form.querySelector('#obs').value || "Nenhuma.";

    const mensagem = `*Solicitação de Agendamento*%0A%0A` +
        `*Nome:* ${nome}%0A` +
        `*WhatsApp:* ${tel}%0A` +
        `*Interesse:* ${categoria}%0A` +
        `*Data da Prova:* ${dataProva}%0A` +
        `*Data do Evento:* ${dataEvento}%0A` +
        `*Obs:* ${obs}`;

    const linkZap = `https://api.whatsapp.com/send?phone=${SEU_WHATSAPP}&text=${mensagem}`;
    window.open(linkZap, '_blank');
    form.reset();
}

// 6. Filtro de Categorias
function filterCategory(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Adiciona classe active ao botão clicado
    if (event) event.target.classList.add('active');

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (category === 'todos' || card.classList.contains(category)) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
}

window.addEventListener('scroll', function() {
    const btnTop = document.getElementById('backToTop');
    // Aparece após descer 400px
    if (window.scrollY > 400) {
        btnTop.classList.add('show');
    } else {
        btnTop.classList.remove('show');
    }
});