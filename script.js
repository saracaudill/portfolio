// mobile navigation

let menuIcon = document.querySelector('#menu-icon');
let menuSymbol = menuIcon.querySelector('i');

let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {

    menuSymbol.classList.toggle('bx-menu');
    menuSymbol.classList.toggle('bx-x');

    let isOpen = navbar.classList.toggle('active');

    menuIcon.setAttribute('aria-expanded', isOpen);
    menuIcon.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

};

//web3forms submission

const contactForm = document.querySelector('#form');
const result = document.querySelector('#result');

const submitButton = contactForm.querySelector('input[type="submit"]');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const hCaptcha = contactForm.querySelector('textarea[name="h-captcha-response"]')?.value;

    if (!hCaptcha) {
        result.textContent = 'Please complete the CAPTCHA before sending.';
        return;
    }

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.textContent = 'Sending...';

    submitButton.disabled = true;
    submitButton.value = 'Sending...';

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const data = await response.json();

        if (response.ok && data.success) {
            result.textContent = 'Thanks! Your message has been sent.';
            contactForm.reset();
        } else {
            result.textContent = data.body?.message || data.message || 'Sorry, something went wrong. Please try again.';
        }
    } catch (error) {
        result.textContent = 'Unable to send your message. Please check your connection and try again.';
    } finally {
        submitButton.disabled = false;
        submitButton.value = 'Send';
    }
});