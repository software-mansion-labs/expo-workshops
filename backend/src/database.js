function User(id, name) {
  this.id = id.toString();
  this.name = name;
};

function Movie(id, title, rating) {
  this.id = id.toString();
  this.title = title;
  this.rating = rating;
};

const users = [new User(1, 'Anonymous')];

const movies = [
  new Movie(1, 'Przebudzenie mocy', 7),
  new Movie(2, 'Sekretne życie słoni', 10),
  new Movie(3, 'Rogue One', 9),
];

export default {
  User: User,
  Movie: Movie,
  getUser: id => users.filter(u => u.id == id)[0],
  getAnonymousUser: () => users[0],
  getMovie: id => movies.filter(m => m.id == id)[0],
  getMovies: () => movies,
  getFavoriteMovie: () => movies.sort((a, b) => b.rating - a.rating)[0]
};
