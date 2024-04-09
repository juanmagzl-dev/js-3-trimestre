// Función para obtener y mostrar los comentarios de un post
function fetchAndDisplayComments(postId, container) {
    var xhrComments = new XMLHttpRequest();
    xhrComments.open('GET', 'https://jsonplaceholder.typicode.com/comments?postId=' + postId, true);
  
    xhrComments.onload = function() {
      if (xhrComments.status >= 200 && xhrComments.status < 300) {
        var comments = JSON.parse(xhrComments.responseText);
  
        comments.forEach(function(comment) {
          var commentItem = document.createElement('li');
          var commentText = document.createElement('span');
          commentText.textContent = comment.body;
          
          var editCommentButton = document.createElement('button');
          editCommentButton.textContent = 'Editar comentario';
          editCommentButton.addEventListener('click', function() {
            var newCommentText = prompt('Introduce el nuevo texto para el comentario:', comment.body);
            if (newCommentText !== null) {
              commentText.textContent = newCommentText;
            }
          });
  
          commentItem.appendChild(commentText);
          commentItem.appendChild(editCommentButton);
          container.appendChild(commentItem);
        });
      } else {
        console.error('Error al recuperar comentarios:', xhrComments.statusText);
      }
    };
  
    xhrComments.send();
  }
  
  // Paso 1: Recuperar todos los usuarios de la API y mostrarlos en un select
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
  
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      var users = JSON.parse(xhr.responseText);
      var select = document.getElementById('userSelect');
  
      users.forEach(function(user) {
        var option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        select.appendChild(option);
      });
    } else {
      console.error('Error al recuperar usuarios:', xhr.statusText);
    }
  };
  
  xhr.send();
  
  // Paso 2: Cuando se seleccione un usuario, recuperar sus posts y mostrarlos
  document.getElementById('userSelect').addEventListener('change', function() {
    var userId = this.value;
  
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', 'https://jsonplaceholder.typicode.com/posts?userId=' + userId, true);
  
    xhrPosts.onload = function() {
      if (xhrPosts.status >= 200 && xhrPosts.status < 300) {
        var posts = JSON.parse(xhrPosts.responseText);
        var postList = document.getElementById('postList');
        postList.innerHTML = '';
  
        posts.forEach(function(post) {
          var listItem = document.createElement('li');
          var postTitle = document.createElement('h3');
          postTitle.textContent = post.title;
          
          var postBody = document.createElement('p');
          postBody.textContent = post.body;
  
          var editPostButton = document.createElement('button');
          editPostButton.textContent = 'Editar post';
          editPostButton.addEventListener('click', function() {
            var newTitle = prompt('Introduce el nuevo título para el post:', post.title);
            var newBody = prompt('Introduce el nuevo cuerpo para el post:', post.body);
            if (newTitle !== null && newBody !== null) {
              postTitle.textContent = newTitle;
              postBody.textContent = newBody;
            }
          });
  
          var commentsContainer = document.createElement('ul');
  
          listItem.appendChild(postTitle);
          listItem.appendChild(postBody);
          listItem.appendChild(editPostButton);
          listItem.appendChild(commentsContainer);
          postList.appendChild(listItem);
  
          fetchAndDisplayComments(post.id, commentsContainer);
        });
      } else {
        console.error('Error al recuperar posts:', xhrPosts.statusText);
      }
    };
  
    xhrPosts.send();
  });
  