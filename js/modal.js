// ==========================
// MODAL CORE
// ==========================

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal_close');
const modalTriggers = document.querySelectorAll('#btn-get');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

// ==========================
// BUTTON OPEN
// ==========================

modalTriggers.forEach(btn => {
    btn.onclick = openModal;
});

// ==========================
// CLOSE EVENTS
// ==========================

modalClose.onclick = closeModal;

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

// ==========================
// MODAL AFTER 10 SECONDS
// ==========================

const modalTimer = setTimeout(openModal, 10000);

// ==========================
// MODAL ON SCROLL (ONCE)
// ==========================

const showModalByScroll = () => {
    if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1
    ) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
};

window.addEventListener('scroll', showModalByScroll);
