import './sass/index.scss';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';
import { pixabayAPI} from './js/pixabayAPI';
import { createMarkup } from './js/createMarkup';


const lightbox = new SimpleLightbox('.gallery a');



const pixabay = new pixabayAPI();
let query = '';

const handleSubmit = async event => {
    event.preventDefault();

    const {
        elements: { searchQuery },
    } = event.currentTarget;

    query = searchQuery.value.trim().toLowerCase();
    if (!query) {
        Notify.failure('Please, query what you want to see');
        return;
    }

    clearPage();

    try {
        const { hits, totalHits } = await pixabay.getPhotos(query);
       
        if (totalHits > 0) {
            const markup = createMarkup(hits);
            refs.gallery.insertAdjacentHTML('beforeend', markup);

            pixabay.calculateTotalPages(totalHits);
            Notify.success(`Hooray! We found ${totalHits} images.`);
                
            if (pixabay.isShowLoadMore) {
                refs.loadMoreBtn.classList.remove('is-hidden');
            }
            
        }
        else Notify.info('Sorry, there are no images matching your search query. Please try again');
    } catch (error) {
        Notify.failure(error.message, 'Oops ...something went wrong');
        clearPage();
     }
   
    // pixabay.getPhotos(query)
    //     .then(({ hits, totalHits }) => {
    //         if (totalHits > 0) {
    //             const markup = createMarkup(hits);
    //             refs.gallery.insertAdjacentHTML('beforeend', markup);

    //             pixabay.calculateTotalPages(totalHits);
    //             Notify.success(`Hooray! We found ${totalHits} images.`);
                
    //             if (pixabay.isShowLoadMore) {
    //                 refs.loadMoreBtn.classList.remove('is-hidden');
    //             }
    //             
    //         }
    //         else Notify.info('Sorry, there are no images matching your search query. Please try again');
    //     }).catch(error => {
    //         Notify.failure(error.message, 'Oops ...something went wrong');
    //          clearPage();
    //     });
}

const onLoadMore = () => {
    pixabay.incrementPage();
     if (!pixabay.isShowLoadMore) {
         refs.loadMoreBtn.classList.add('is-hidden');
         Notify.info('We are sorry, but you have reached the end of search results');
                     }

    pixabay.getPhotos(query)
        .then(({ hits, totalHits }) => {
            if (totalHits > 0) {
                const markup = createMarkup(hits);
                refs.gallery.insertAdjacentHTML('beforeend', markup);
            }
            else Notify.info('Sorry, there are no images matching your search query. Please try again');
        }).catch(error => {
            Notify.failure(error.message, 'Oops ...something went wrong');
            clearPage();
        });
};


refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function clearPage() {
    pixabay.resetPage();
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');

}