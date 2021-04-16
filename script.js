const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API 
const unsplashAPIKey = 'seDEbpGKhA1NI73Ww3tYG40uQ82CrHVDFkl3Yx-pYyM';
const apiCount = 30;
const unsplashAPIUrl = `https://api.unsplash.com/photos/random?client_id=${unsplashAPIKey}&count=${apiCount}`;

// helf function to set attributes
function setAttributes(elem, attributes) {
    for (const key in attributes) {
        elem.setAttribute(key, attributes[key]);
    }
}

let photosLoaded = 0;
let totalPhotos = apiCount;
let loadMorePhoto = false;

function photoLoaded(){
    photosLoaded++;
    if(photosLoaded === totalPhotos){
        loadMorePhoto = true;
        loader.hidden = true;
    }
}


// Display Photo Array
function displayPhotos() {
    // loop through photosArray
    photosArray.forEach((photo) => {
        // create <a> link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // create <img>
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // appendChild
        item.appendChild(img);
        imageContainer.appendChild(item);

        photoLoaded();
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    photosLoaded = 0;
    try {
        const reponse = await fetch(unsplashAPIUrl);
        photosArray = await reponse.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

// Event Listener
// infinity Load img
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 800 && loadMorePhoto) {
        loadMorePhoto = false;
        getPhotos();
    }
});

// On load
getPhotos();
