const API_URL = 'https://gorest.co.in/public/v2';

const postContainer = document.getElementById('post-container');
const postTitle = document.getElementById('post-title');
const postBody = document.getElementById('post-body');
const commentsList = document.getElementById('comments-list');
const backButton = document.getElementById('back-button')

function createComment(comment) {
  const commentWrapper = document.createElement('li');
  commentWrapper.classList.add('comment', 'list-unstyled', 'border', 'border-secondary', 'rounded', 'bg-light','shadow-sm','p-3', 'm-3');

  const commentName = document.createElement('p');
  commentName.textContent = comment.name;
  commentName.classList.add('fs-6', 'fw-bold', 'text-primary');

  const commentBody = document.createElement('p');
  commentBody.textContent = comment.body;

  commentWrapper.appendChild(commentName);
  commentWrapper.appendChild(commentBody);

  return commentWrapper;
}

function getPostById(postId) {
  return fetch(`${API_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
      postTitle.textContent = post.title;
      postBody.textContent = post.body;
      backButton.href = 'posts.html?id=' + post.user_id;
      return post.userId;
    })
}

function getCommentsByPostId(postId) {
  return fetch(`${API_URL}/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {
      if (comments.length === 0) {
        const noCommentsMessage = document.createElement('p');
        noCommentsMessage.textContent = 'Коментарі відсутні';
        commentsList.appendChild(noCommentsMessage);  
        return;
      }
      comments.forEach(comment => {
        const li = createComment(comment);
        commentsList.appendChild(li);
      });
    })
}
const query = window.location.search
const urlParams = new URLSearchParams(query);
const postId = urlParams.get('id');

if (postId) {
  getPostById(postId)
    .then(userId => getCommentsByPostId(postId))
}