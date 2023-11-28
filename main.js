import { getData, getMovieData } from "./modules/helpers";
import {
  btns_switch,
  genre_types,
  header_create,
  reload_movies,
  topMovies,
  trailers,
} from "./modules/ui";

let header = document.querySelector("header");
let moviePlace = document.querySelector(".movies");
let genresPlace = document.querySelector(".genres");
let mainBg = document.querySelector(".mainBg");
let btnShowAll = document.querySelector(".btn-show-all");
let like_dislike = document.querySelectorAll(".sec1 .bottom .right div");
let popularMovies = document.querySelector(".swiper-wrapper");
let upcomingPlace = document.querySelector("#upcoming");

header_create(header);
let pages = document.querySelectorAll("header .center nav ul li");
btns_switch(pages);

Promise.all([
  getMovieData("/movie/now_playing?language=ru"),
  getMovieData("/genre/movie/list?language=ru"),
  getMovieData("/movie/popular?language=ru"),
  getMovieData("/movie/upcoming?language=ru"),
]).then(([movies, genres, popular, upcoming]) => {
  genre_types(genres.data.genres, genresPlace);
  reload_movies(
    movies.data.results.slice(0, 10),
    moviePlace,
    genres.data.genres,
    mainBg,
    true
  );
  reload_movies(
    popular.data.results,
    popularMovies,
    genres.data.genres,
    mainBg,
    false
  );
  reload_movies(
    upcoming.data.results,
    upcomingPlace,
    genres.data.genres,
    mainBg,
    false
  );
  const genres_types = document.querySelectorAll(".genres a");
  btns_switch(genres_types);

  // for (let item of movies.data.results) {
  //   for (let id of item.genre_ids) {
  //     for (let genre of genres.data.genres) {
  //       let allGenres = document.querySelectorAll(".genres a p");
  //       allGenres.forEach((name) => {
  //         name.onclick = () => {
  //           if ((genre.name = name.innerHTML)) {
  //             if ((id = genre.id)) {

  //             }
  //           }
  //         };
  //       });
  //       // reload_movies(filtered, moviePlace, genres.data.genres, mainBg, true);
  //     }
  //   }
  // }
});

btnShowAll.onclick = () => {
  location.assign("./pages/showAllMovies/");
};

let years = document.querySelectorAll(".years a");
btns_switch(years);

like_dislike.forEach((btn) => {
  btn.onclick = () => {
    like_dislike.forEach((button) => (button.style.background = "#1b2133"));
    btn.style.background = "black";
  };
});

new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
let moments = document.querySelectorAll(".moments a");
btns_switch(moments);

new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
let topMoviesPlace = document.querySelector(".top-movies");

getMovieData("/movie/top_rated?language=ru").then((res) => {
  if (res.status !== 200 && res.status !== 201) return;
  for (let item of res.data.results.slice(0, 5)) {
    let id = item.id;
    getMovieData("/movie/" + id).then((res) => {
      if (res.status !== 200 && res.status !== 201) return;
      topMovies(res.data, topMoviesPlace);
    });
  }
});

let form = document.forms.subs;

form.onsubmit = (e) => {
  e.preventDefault();
  let data = {};
  let fm = new FormData(form);
  fm.forEach((value, key) => {
    data[key] = value;
  });
  console.log(data);
};

let otherTrailers = document.querySelector(".otherMovies");

getMovieData("/movie/now_playing?language=ru").then((res) => {
  trailers(res.data.results, otherTrailers);
});
