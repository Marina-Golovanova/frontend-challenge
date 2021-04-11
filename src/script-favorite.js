const $empty = document.querySelector('.empty-gallery');
const data = JSON.parse(localStorage.getItem('favorite'));
if (data.length) {
    $empty.classList.add('empty-gallery--hidden');
}
createGallery(data, true);
deleteLike();
