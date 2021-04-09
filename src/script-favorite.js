const data = JSON.parse(localStorage.getItem('favorite'));
createGallery(data, true);
deleteLike();
