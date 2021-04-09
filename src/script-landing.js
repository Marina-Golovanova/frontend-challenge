const responsePromise = fetch('https://api.thecatapi.com/v1/images/search?limit=20');

responsePromise
    .then(el => el.json())
    .then(response => {
        const data = response.map(el => el.url).filter((el) => !/gif$/.test(el));
        createGallery(data.slice(0, 15));
        const $loader = document.querySelector('.loader');
        $loader.classList.add('loader--hidden');
    });

