//Ejercicio 1


//Exercici 1.1 Taula amb informació dels usuaris
//Crea una web que mostri, a partir de l'API de Jsonplaceholder:
//  Un llistat amb els 5 primers usuaris mostrant l'identificador, nom i correu electrònic.
let selectedId = 0;

function obtenerUsuarios() 
{
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      const tableBody = document.getElementById('users-table-body');

      users.slice(0, 5).forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td onclick="actualizaCard(${user.id})">${user.id}</td>
          <td>${user.name.split(' ')[0]}</td>
          <td>${user.name.split(' ')[1]}</td>
          <td>${user.email}</td>`;
        tableBody.appendChild(row);
      });
      
  })
  .catch(error => console.error('Error al obtener usuarios:', error));
}

//Exercici 1.2 Ficha usuaris
//Crea la lògica necessària perquè en fer clic en un usuari apareguin totes les dades en una fitxa.
function actualizaCard(userId) 
{
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      const cardBody = document.getElementById('user-card-body');
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
      UpdateUserComments()
    })
  .catch(error => console.error('Error al obtener detalles del usuario:', error));
}

//Ejercicio 1.3 -> https://jsonplaceholder.typicode.com/comments
//Mostra els darrers 5 post publicats per l'usuari i el nombre de comentaris que té cada post.s
function UpdateUserComments()
{
  fetch("https://jsonplaceholder.typicode.com/comments")
  .then(response => response.json())
  .then(userPost => {
    const cardTitlePost = document.getElementById('accordionExample');

    
    const resultado = userPost.filter(user => user.postId === selectedId).slice(-5);
    cardTitlePost.innerHTML = '';
    resultado.forEach(user=> {
      cardTitlePost.innerHTML+= 
      `<div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          PostId: ${user.id}
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          ${user.body}
        </div>
      </div>
    </div>`
    });
    
    console.log(resultado);
  })
  .catch(error => console.error('Error al obtener usuarios:', error));
}

// Llamar a la función para obtener y mostrar los primeros 5 usuarios
obtenerUsuarios();