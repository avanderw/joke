let jokeCache;
fetch('jokes.txt')
.then(response => response.text())
.then(text => {
    const jokes = text.split('\n');
    jokeCache = jokes;
    getRandomJoke();
})
.catch(err => console.log(err));

function getRandomJoke() {
    const randomJoke = jokeCache[Math.floor(Math.random() * jokeCache.length)];
    document.getElementById('joke').innerHTML = randomJoke;
}

document.getElementById('jokeBtn').addEventListener('click', getRandomJoke);