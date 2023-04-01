function fetchBooks() {
  fetch("http://localhost:3000/books")
    .then((resp) => resp.json())
    .then((books) => books.forEach((book) => showList(book)));
}

function showList(book) {
  let li = document.createElement("li");
  li.id = book.id;
  li.innerHTML = `${book.title}`;
  document.getElementById("list").appendChild(li);

  document.getElementById(`${book.id}`).addEventListener("click", (e) => {
    document.getElementById("show-panel").innerHTML = `<div>
<img src="${book.img_url}" alt="">
<h4>${book.title}</h4>
<h5>${book.subtitle}</h5>
<p>${book.description}</p>
<p>${book.author}</p>
<ul id='btn${book.id}'>
</ul>
<form id = 'myform'>
<input name='user' id='user' type = 'hidden' value = 'mats'>
<input name='myid' id='myid' type = 'hidden' value = '10'>
<button type='submit' id= 'button'>LIKE<button>
</form>
</div>
`;

    let smalldata = book.users;
    smalldata.forEach((user) => {
      console.log(user.username);
      let li = document.createElement("li");
      li.textContent = user.username;
      let ul = document.getElementById(`btn${book.id}`);
      console.log(ul);
      ul.appendChild(li);
    });

    document.getElementById("myform").addEventListener("submit", (e) => {
      event.preventDefault();
      let name = event.target.user.value;
      let id = event.target.myid.value;

      const newUser = {
        id: id,
        username: name
      };
      

      fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            users: [...book.users, newUser]
        })
      })
      .then(response => {
        if (response.ok) {
          console.log(`success`);
        } else {
          console.error(`Failed`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchBooks();
});
