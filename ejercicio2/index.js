// funcion para obtener comentario y post




// recuperar todos los usuarios y mostrarlos en el select

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true)

xhr.onload = function(){
    if (xhr.status === 200) {
        let users = JSON.parse(xhr.responseText);
        let select = document.getElementById('userSelect')

        users.forEach(function(user) {
            var option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            select.appendChild(option);
          });
        } else {
          console.error('Error al recuperar usuarios:', xhr.statusText);
    }
}

xhr.send()


// mostrar todos los posts y cometarios al seleccionar al ausuario
document.getElementById('userSelect').addEventListener('change', function(){
    let userId = this.value;

    let xhrPosts = XMLHttpRequest();
    xhrPosts.open('GET', 'https://jsonplaceholder.typicode.com/posts?userId=' + userId, true);

    xhrPosts.onload = function(){
        if( xhrPosts.status === 200){
            let posts = JSON.parse(xhrPosts.responseText);
            let postList = document.getElementById('postList');
            postList.innerHTML = '';

            posts.forEach(function(post){
                let listItem = document.createElement('li');
                let postTitle = document.createElement('h4');
                postTitle.textContent = post.title;

                let postBody = document.createElement('p')
                postBody.textContent = post.body;

                let editPostButton = document.createElement('button')
                editPostButton.textContent = 'Editar este post';
                editPostButton.addEventListener('click', function(){
                    let newTitle = prompt('Introduce el nuevo título para el post:', post.title);
                    let newBody = prompt('Introduce el nuevo cuerpo para el post:', post.body);
                    if (newTitle !== null && newBody !== null) {
                        postTitle.textContent = newTitle;
                        postBody.textContent = newBody;
                    }
                })
                let commentsContainer = document.createElement('ul')

                listItem.appendChild(postTitle);
                listItem.appendChild(postBody);
                listItem.appendChild(editPostButton);
                listItem.appendChild(commentsContainer);
                postList.appendChild(listItem);

                postComment(postid, commentsContainer);
            })
        }else {
        console.error('Error al recuperar posts:', xhrPosts.statusText);
      }
    }
    xhrPosts.send();
})