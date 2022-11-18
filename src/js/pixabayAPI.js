import axios from 'axios';


export class pixabayAPI {
  #page = 1;
  #totalPages = 0;
  #perPage = 40;

  // #request = '';


  async getPhotos(request) {
    const url = `https://pixabay.com/api/?key=31296979-10b234fe16138a795adaa65f3&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.#perPage}&page=${this.#page}`;
    const { data } = await axios.get(url);
    return data;

    // if (!response.ok) {
    //     throw new Error(response.status);
    //     }
    // return response.json();
        }
  
  // getPhotos(request) {
  //    const url = `https://pixabay.com/api/?key=31296979-10b234fe16138a795adaa65f3&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.#perPage}&page=${this.#page}`;
  //       return fetch(url).then(response => {
  //       if (!response.ok) {
  //       throw new Error(response.status);
  //       }
  //   return response.json();
  //       })
  // }
   
  incrementPage() {
    this.#page += 1;
  }


  resetPage() {
    this.#page = 1;
  }
  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}




  


