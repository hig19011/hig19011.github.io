//Get all images on page that will be lazy loaded
let imagesList = document.querySelectorAll('img[data-src]');

//for the given image set the src to the data-src value, delete data-src
const loadImages = (img) => {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = () => {
    img.removeAttribute('data-src');
  };
};

// require at least 1/3 of the image be on the screen before loading
// used to help demo the feature
const imageOptions = {
  threshold: .333
};

//If we can use the IntersectionObserver
if('IntersectionObserver' in window) {
  // setup the action to occur when the observer fires a change
  const imageObserver = new IntersectionObserver((items, observer) => {
    // go through all observed items
    items.forEach((item) => {
      // if the item is showing on the screen (modified by imageOptions)
      if(item.isIntersecting) {
        //load image
        loadImages(item.target);
        //stop checking for changes on this image because it has already loaded.
        observer.unobserve(item.target);
      }
    });
  }, imageOptions);
  // register each image for observation
  imagesList.forEach((img) => {
    imageObserver.observe(img);
  });
} 
// otherwise load all images now.
else {
  imagesList.forEach((img) => {
    loadImages(img);
  });
}