const API_URL = 'https://gorest.co.in/public/v2';
const postsContainer = document.getElementById('posts-list');
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

function createPost(post) {
  const postWrapper = document.createElement('li');
  postWrapper.classList.add('card', 'border', 'border-primary', 'rounded', 'bg-light', 'shadow-sm', 'p-3', 'm-5');

  const postTitle = document.createElement('a');
  postTitle.textContent = post.title;
  postTitle.classList.add('card-title', 'fs-5', 'fw-semibold', 'text-decoration-none')
  postTitle.href = `post-card.html?id=${post.id}`;
  const postBody = document.createElement('p');
  postBody.textContent = post.body;
  postWrapper.appendChild(postTitle);
  postWrapper.appendChild(postBody);

  return postWrapper;
}
function createErrorMessageBox(message) {
  const errorMessageBox = document.createElement('div');
  errorMessageBox.classList.add('alert', 'alert-danger');
  errorMessageBox.innerText = message;

  return errorMessageBox;
}

function getPostsByUserId(userId) {
  return fetch(`${API_URL}/users/${userId}/posts`)
    .then(response => response.json())
    .then((data) => {
      if (data.length === 0) {
        const noPostsMessage = document.createElement('p');
        noPostsMessage.textContent = 'У даного користувача відсутні пости';
        postsContainer.appendChild(noPostsMessage);
        postsContainer.classList.add('m-3')

        const div = document.createElement('div');
        const backButton = document.createElement('a');
        backButton.textContent = 'Назад';
        backButton.href = 'index.html';
        backButton.classList.add('text-dark', 'fw-semibold', 'border', 'm-2', 'p-2', 'bg-light', 'border-primary', 'rounded');
        div.appendChild(backButton);
        postsContainer.appendChild(div);
        return;
      }
      data.forEach(post => {
        const li = createPost(post);
        postsContainer.appendChild(li);
      });
    })
    .catch(error => {
      const errorMessageBox = createErrorMessageBox(error.message);
      postsContainer.appendChild(errorMessageBox);
    })
}

if (userId) {
  getPostsByUserId(userId);
} else {
  const errorMessageBox = createErrorMessageBox('Виникла помилка при завантаженні постів');
  postsContainer.appendChild(errorMessageBox);
}