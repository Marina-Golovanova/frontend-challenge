let countOffset = 0;
const $more = document.querySelector('.more');

function getData(offset) {
    const responsePromise = fetch(`https://api.thecatapi.com/v1/images/search?limit=20&offset=${offset}`);
    return responsePromise
        .then(el => el.json())
        .then(response => {
            const data = response.map(el => el.url).filter((el) => !/gif$/.test(el));
            createGallery(data.slice(0, 15));
            const $loader = document.querySelector('.loader');
            $loader.classList.add('loader--hidden');
            $more.classList.remove('more--hidden');
        });
}

getData(countOffset);

$more.onclick = () => {
    countOffset += 20;
    getData(countOffset).then(() => {
        $more.textContent = '...загрузить ещё котиков...';
        $more.style.pointerEvents = 'auto';
    });
    $more.textContent = 'мы пошли за котиками..';
    $more.style.pointerEvents = 'none';
}
