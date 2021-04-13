receiveMovies();

function receiveMovies() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes')
    
    promise.then(populateMovies);
    promise.catch(reload);
}

function populateMovies(movies) {
    let movieList = document.querySelector(".movies");

    for(i = 0; i < movies.data.length; i++) {
        let img = movies.data[i].imagem;
        let title = movies.data[i].titulo;
        let movieId = movies.data[i].id;

        movieList.innerHTML += `
            <div id="${movieId}" class="movie">
                <img src="${img}">
                <div class="title">${title}</div>
                <button onclick="purchase(this)">
                    Comprar
                    <ion-icon name="cart-outline"></ion-icon>
                </button>
            </div>`;
    }
}

function purchase(movie) {
    let name = prompt("Qual seu nome?");
    let many = prompt("Quantos ingressos deseja?");
    let request = {nome: name, quantidade: many};
    var dataID = movie.getAttribute('data-id');


    let promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${dataID}/ingresso`, request);
    promise.then(confirmation);
    promise.catch(wrong);
}

function confirmation(answer) {
    alert(answer.data.mensagem);
}

function wrong() {
    alert("Os ingressos para este filme já esgotaram!");
}

function reload() {
    document.location.reload(true);
}