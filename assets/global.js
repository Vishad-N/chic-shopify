document.addEventListener('DOMContentLoaded', () => {
  // Utility: Debounce
  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Sticky Header
  const header = document.querySelector('header-component');
  if (header) {
    const handleScroll = debounce(() => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, 10);
    window.addEventListener('scroll', handleScroll);
  }

  // Announcement Bar Rotation (if multiple)
  const announcements = document.querySelectorAll('.announcement-bar__message');
  if (announcements.length > 1) {
    let currentIndex = 0;
    setInterval(() => {
      announcements[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % announcements.length;
      announcements[currentIndex].classList.add('is-active');
    }, 5000);
  }
});

// Custom Elements
class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.header = this.querySelector('header');
  }
}
customElements.define('header-component', HeaderComponent);

class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.querySelector('.drawer__close').addEventListener('click', this.close.bind(this));
  }
  open() {
    this.classList.add('is-active');
    document.body.classList.add('overflow-hidden');
  }
  close() {
    this.classList.remove('is-active');
    document.body.classList.remove('overflow-hidden');
  }
}
customElements.define('cart-drawer', CartDrawer);
