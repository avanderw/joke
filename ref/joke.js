let jokesCache;
let selectedJoke;
fetch('jokes.txt')
.then(response => response.text())
.then(text => {
    const jokes = text.split('\n');
    jokesCache = jokes;
    getRandomJoke();
})
.catch(err => console.log(err));

function getRandomJoke() {
    selectedJoke = jokesCache[Math.floor(Math.random() * jokesCache.length)];
    document.getElementById('joke').innerHTML = selectedJoke;
}

function shareJoke() {
    if (navigator.share) {
        navigator.share({
            title: 'Joke',
            text: selectedJoke,
            url: window.location.href
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        console.log('Web Share API not supported');
    }
}

document.getElementById('jokeBtn').addEventListener('click', getRandomJoke);
document.getElementById('shareBtn').addEventListener('click', shareJoke);