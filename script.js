const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let isInitialLoad = true;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let initialCount = 5;
const apiKey = 'I4gCsuwxfpfx1AFDH_ppJWJLtklbFSMkl_CKugpRWsE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

updateAPIWithNewCount = picCount => {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// check if all images were loaded
imageLoaded = () => {
    imagesLoaded++;
    //console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        //console.log('ready =', ready);
    }
}

// Helper function to set attributes on DOM elements
setAttributes = (element, attributes) => {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to DOM
displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from Unsplash API
getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        //console.log(photosArray);

        displayPhotos();
        if (isInitialLoad) {
            updateAPIWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        // console.log('window.innerHeight', window.innerHeight);
        // console.log('window.scrollY', window.scrollY);
        // console.log('window.innerHeight + window.scrollY', window.innerHeight + window.scrollY);
        // console.log('document.body.offsetHeight - 1000', document.body.offsetHeight - 1000);
        ready = false;
        getPhotos();
        //console.log('load more!');
    }
});

// On Load
getPhotos();