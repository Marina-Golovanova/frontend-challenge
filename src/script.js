function createCatCard(src, liked = false) {
    const $card = document.createElement('div');
    $card.classList.add('gallery__item');

    const $img = document.createElement('img');
    $img.classList.add('gallery__img');
    $img.src = src;

    const $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    $svg.classList.add('gallery__img-heart');
    $svg.setAttribute('viewBox', '0 0 48 48');
    if (liked) {
        $svg.classList.add('gallery__img-heart--liked');
    }

    const $path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    $path.setAttribute('d', 'M24 42.7L21.1 40.06C10.8 30.72 4 24.56 4 17C4 10.84 8.84 6 15 6C18.48 6 21.82 7.62 24 10.18C26.18 7.62 29.52 6 33 6C39.16 6 44 10.84 44 17C44 24.56 37.2 30.72 26.9 40.08L24 42.7Z')

    $svg.appendChild($path);

    $svg.onclick = function () {
        const savedArray = localStorage.getItem('favorite');
        let favoriteList = savedArray ? JSON.parse(savedArray) : [];

        if ($svg.classList.contains('gallery__img-heart--liked')) {
            $svg.classList.remove('gallery__img-heart--liked');
            favoriteList = favoriteList.filter((el) => el !== src);
            localStorage.setItem('favorite', JSON.stringify(favoriteList));
        } else {
            $svg.classList.add('gallery__img-heart--liked');
            favoriteList.push(src);
            localStorage.setItem('favorite', JSON.stringify(favoriteList));
        }
    }

    $card.appendChild($img);
    $card.appendChild($svg);

    return $card;
}

function createGallery(data, liked = false) {
    const $gallery = document.querySelector('.gallery');
    for (const src of data) {
        const $card = createCatCard(src, liked);
        $gallery.appendChild($card);
    }
}

function deleteLike() {
    document.querySelectorAll('.gallery__img-heart--liked').forEach((el) =>
        el.onclick = function (event) {
            console.log(el);
            el.classList.remove('gallery__img-heart--liked');
            const $cardDelete = event.target.closest('.gallery__item');
            const src = $cardDelete.querySelector('img').src
            const savedArray = localStorage.getItem('favorite');
            let favoriteList = savedArray ? JSON.parse(savedArray) : [];
            favoriteList = favoriteList.filter((el) => el != src);
            localStorage.setItem('favorite', JSON.stringify(favoriteList));
            $cardDelete.remove();
        }
    )
}
