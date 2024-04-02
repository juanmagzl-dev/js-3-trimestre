// Función para obtener las categorías disponibles y llenar el select
function fillCategorySelect() {
    const select = document.getElementById('categorySelect');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const categories = JSON.parse(xhr.responseText);
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    select.appendChild(option);
                });
            } else {
                console.error('Error fetching categories:', xhr.statusText);
            }
        }
    };
    xhr.open('GET', 'https://api.chucknorris.io/jokes/categories', true);
    xhr.send();
}

// Llenar el select al cargar la página
window.onload = fillCategorySelect;

function getRandomJoke() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                displayJoke(data.value);
            } else {
                console.error('Error fetching random joke:', xhr.statusText);
            }
        }
    };
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);
    xhr.send();
}

function getCategoryJoke() {
    const category = document.getElementById('categorySelect').value;
    if (category) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    displayJoke(data.value);
                } else {
                    console.error(`Error fetching ${category} joke:`, xhr.statusText);
                }
            }
        };
        xhr.open('GET', `https://api.chucknorris.io/jokes/random?category=${category}`, true);
        xhr.send();
    } else {
        alert('Please select a category');
    }
}

// function getTextJoke() {
//     const text = document.getElementById('textInput').value;
//     if (text) {
//         const xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     const data = JSON.parse(xhr.responseText);
//                     const randomIndex = Math.floor(Math.random() * data.result.length);
//                     displayJoke(data.result[randomIndex].value);
//                 } else {
//                     console.error('Error fetching joke by text:', xhr.statusText);
//                 }
//             }
//         };
//         xhr.open('GET', `https://api.chucknorris.io/jokes/search?query=${text}`, true);
//         xhr.send();
//     } else {
//         alert('Please enter some text');
//     }
// }

function displayJoke(joke) {
    const jokeContainer = document.getElementById('jokeContainer');
    jokeContainer.innerHTML = `<p>${joke}</p>`;
}


// Función para limpiar el texto mostrado
function clearJoke() {
    const jokeContainer = document.getElementById('jokeContainer');
    jokeContainer.innerHTML = ''; // Limpiar el contenido del contenedor
}