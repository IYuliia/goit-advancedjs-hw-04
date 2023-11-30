import axios from 'axios';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const elements = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let currentPage = 1;
elements.loadMoreBtn.style.display = 'none';

// Notiflix.Notify.init({ position: 'right-bottom' });

const lightbox = new SimpleLightbox('.gallery a', {
  captionData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

elements.searchForm.addEventListener('submit', handlerFormSubmit);
elements.loadMoreBtn.addEventListener('click', loadMoreImages);

async function loadMoreImages() {
  try {
    const searchQuery = elements.searchForm.elements.searchQuery.value;
    const data = await serviceImage(searchQuery, currentPage);

    if (data.hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    elements.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

    if (currentPage * 40 >= data.totalHits) {
      elements.loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      elements.loadMoreBtn.style.display = 'block';
      lightbox.refresh();
    }

    currentPage += 1;
  } catch (error) {
    console.error('Error loading more images:', error);
    Notiflix.Notify.failure('Error fetching more images. Please try again.');
  }
}

async function handlerFormSubmit(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value;

  try {
    const data = await serviceImage(searchQuery);
    currentPage = 1;
    elements.gallery.innerHTML = '';
    elements.gallery.insertAdjacentHTML('afterbegin', createMarkup(data.hits));
    elements.loadMoreBtn.style.display = 'block';
    lightbox.refresh();
    await loadMoreImages();
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('Error fetching images. Please try again.');
  }
}

async function serviceImage(q, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35840272-25b71e9b06347bf3cb03a4874';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    });

    if (response.data.hits.length === 0) {
      Notiflix.Notify.warning('Sorry, no images found. Please try again.');
      return { hits: [], totalHits: 0 };
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error fetching images');
  }
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card"><a class="img-link" href="${largeImageURL}">
    <img class="photo-card-img"src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes ${likes}</b>
        </p>
            <p class="info-item">
        <b>Views ${views}</b>
        </p>
        <p class="info-item">
            <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads ${downloads}</b>
        </p>
    </div>
</div>
    `
    )
    .join('');
}
