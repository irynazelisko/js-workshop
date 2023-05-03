const API_URL = 'https://gorest.co.in/public/v2';
const blogContainer = document.getElementById('users-lists');

function createUser(user) {
    const li = document.createElement('li');
    const nameId = user.id;
    li.addEventListener('click', () => {
        window.location.href = `posts.html?id=${nameId}`;
        getUserPosts(nameId);
    });
    li.classList.add('list-group', 'border', 'border-primary', 'rounded', 'p-3', 'mb-3', 'shadow-sm', 'bg-light');
    li.innerText = `${user.name}`;
    console.log(li);
    return li;
}

function getUserPosts(nameId) {
    return fetch(`${API_URL}/users/${nameId}/posts`)
        .then(response => response.json())
        .then((data) => {
            data.forEach(post => {
                renderPostDetails(post.id);
                console.log(post.id, post.body)
            });
        })
}

function getPostDetails(postId) {
    fetch(`${API_URL}/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postElement = document.createElement('div');
            const postTitle = document.createElement('a');
            postTitle.textContent = post.title;
            postTitle.href = `post-card.html?id=${postId}`;
            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            postElement.appendChild(postTitle);
            postElement.appendChild(postBody);
            document.body.appendChild(postElement);
            console.log(post)
        })
}

function createErrorMessageBox(message) {
    const errorMessageBox = document.createElement('div');
    errorMessageBox.classList.add('alert', 'alert-danger');
    errorMessageBox.innerText = message;

    return errorMessageBox;
}

function getUsers() {
    return fetch(`${API_URL}/users`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Користувачі незнайдені');
            }

            return response.json()
        })
        .then((data) => {
            data.forEach(user => {
                const div = createUser(user);
                blogContainer.appendChild(div);
            })
        })
        .catch(error => {
            const errorMessageBox = createErrorMessageBox(error.message);
            blogContainer.appendChild(errorMessageBox);
        })
}



