
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

export function createMarkup(results) {
    return results.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return /*html*/ ` <div  class="photo-card list">
  <img class= "gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div >`
    })
    .join('');
}
