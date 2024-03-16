//Ejercicio 1

//Exercici 1.1 Taula amb informació dels usuaris
//Crea una web que mostri, a partir de l'API de Jsonplaceholder:
//  Un llistat amb els 5 primers usuaris mostrant l'identificador, nom i correu electrònic.
let selectedId = 0;

function obtenerUsuarios() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      const tableBody = document.getElementById("users-table-body");

      users.slice(0, 5).forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td onclick="actualizaCard(${user.id})">${user.id}</td>
          <td>${user.name.split(" ")[0]}</td>
          <td>${user.name.split(" ")[1]}</td>
          <td>${user.email}</td>`;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error al obtener usuarios:", error));
}

//Exercici 1.2 Ficha usuaris
//Crea la lògica necessària perquè en fer clic en un usuari apareguin totes les dades en una fitxa.
function actualizaCard(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      const cardBody = document.getElementById("user-card-body");
      selectedId = user.id;
      cardBody.innerHTML = `
          <h5 class="card-title">${user.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Datos</h6>
          <p><strong>Username:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Website:</strong> ${user.website}</p>
          <p><strong>Company:</strong> ${user.company.name}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
          <a href="https://${user.website}" class="card-link">Página web</a>
      `;
      //UpdateUserComments()
      getPostsAsync();
    })
    .catch((error) =>
      console.error("Error al obtener detalles del usuario:", error)
    );
}

//Exercici 1.3  Publicacions publicades -> https://jsonplaceholder.typicode.com/comments
//Mostra els darrers 5 post publicats per l'usuari i el nombre de comentaris que té cada post.s
function getPostsAsync() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      const divPosters = document.getElementById("UserPosts");
      divPosters.innerHTML = "";
      const resultado = posts
        .filter((post) => post.userId === selectedId)
        .slice(-5);
      resultado.forEach((post) => {
        divPosters.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">${post.title}</div>
              ${post.body}
            </div>
            <span class="badge bg-primary rounded-pill">${resultado.length}</span>
          </li>`;
        // Llama a la función para obtener y mostrar los comentarios del post
        getPostCommentsAsync(post.id);
      });
    })
    .catch((error) => console.error("Error al obtener posts:", error));
}
// Llamar a la función para obtener y mostrar los primeros 5 usuarios
obtenerUsuarios();

//Exercici 1.4 Comentaris
//Mostra, al costat, els comentaris relacionats amb el post seleccionat .

async function getPostCommentsAsync(postId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const comments = await response.json();

    // Muestra los comentarios relacionados con el post
    const commentsContainer = document.getElementById("user-comments");
    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
      commentsContainer.innerHTML += `
        <div class="card mt-2">
          <div class="card-body">
            <h5 class="card-title">${comment.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${comment.email}</h6>
            <p class="card-text">${comment.body}</p>
          </div>
        </div>`;
    });
  } catch (error) {
    console.error("Hubo un error al obtener comentarios:", error);
  }
}
