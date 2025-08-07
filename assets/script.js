const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const POSTS_CONTAINER = document.getElementById('posts-container');

// Проверка наличия контейнера
if (!POSTS_CONTAINER) {
    console.error('Контейнер для постов не найден!');
} else {
    document.addEventListener('DOMContentLoaded', fetchPosts);
}

function createPostElement(post) {
    return `
        <article class="post-card" data-id="${post.id}">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </article>
    `;
}

function displayPosts(posts) {
    if (!posts || posts.length === 0) {
        showStatusMessage('Нет постов для отображения');
        return;
    }
    
    POSTS_CONTAINER.innerHTML = '';
    posts.forEach(post => {
        const postElement = createPostElement(post);
        POSTS_CONTAINER.insertAdjacentHTML('beforeend', postElement);
    });
}

function showStatusMessage(message, isError = false) {
    POSTS_CONTAINER.innerHTML = `
        <p class="${isError ? 'error-message' : 'loading-message'}">
            ${message}
        </p>
    `;
}

async function fetchPosts() {
    try {
        showStatusMessage('Загрузка постов...');
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        const posts = await response.json();
        displayPosts(posts);
        
    } catch (error) {
        showStatusMessage(`Ошибка: ${error.message}`, true);
        console.error('Ошибка при загрузке постов:', error);
    }
}