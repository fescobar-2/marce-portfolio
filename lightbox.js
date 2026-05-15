// Lightbox Wizard: full image viewer with navigation
(function() {
  // Collect all artwork items with their data
  const artworks = document.querySelectorAll('.artwork');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const closeBtn = document.getElementById('close-lightbox');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  let currentIndex = 0;
  let galleryItems = [];
  
  // Build gallery data from DOM
  function buildGalleryData() {
    artworks.forEach((artwork, idx) => {
      const img = artwork.querySelector('.artwork-img');
      const titleElem = artwork.querySelector('.artwork-title');
      const metaElem = artwork.querySelector('.artwork-meta');
      
      if (img) {
        galleryItems.push({
          src: img.src,
          alt: img.alt || 'Linocut artwork',
          title: titleElem ? titleElem.innerText : 'Untitled',
          meta: metaElem ? metaElem.innerText : 'linocut print'
        });
      }
    });
  }
  
  // Open lightbox with specific index
  function openLightbox(index) {
    if (!galleryItems.length) return;
    if (index < 0) index = 0;
    if (index >= galleryItems.length) index = galleryItems.length - 1;
    
    currentIndex = index;
    const item = galleryItems[currentIndex];
    
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxTitle.innerText = item.title;
    lightboxMeta.innerText = item.meta;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function nextImage() {
    if (currentIndex + 1 < galleryItems.length) {
      openLightbox(currentIndex + 1);
    } else {
      openLightbox(0);
    }
  }
  
  function prevImage() {
    if (currentIndex - 1 >= 0) {
      openLightbox(currentIndex - 1);
    } else {
      openLightbox(galleryItems.length - 1);
    }
  }
  
  // Attach click event to each artwork
  function bindClickEvents() {
    artworks.forEach((artwork, idx) => {
      const clickZone = artwork.querySelector('.image-wrapper') || artwork;
      clickZone.style.cursor = 'pointer';
      clickZone.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(idx);
      });
    });
  }
  
  // Keyboard navigation
  function bindKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    });
  }
  
  // Click on background to close
  function bindOverlayClose() {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Initialize
  function init() {
    buildGalleryData();
    bindClickEvents();
    bindKeyboardEvents();
    bindOverlayClose();
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevImage();
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextImage();
    });
  }
  
  init();
})();