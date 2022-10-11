fetch('jokes.txt')
.then(response => response.text())
.then(text => {
    const jokes = text.split('\n');
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    document.getElementById('joke').innerHTML = joke;
    console.log(text);
})
.catch(err => console.log(err));