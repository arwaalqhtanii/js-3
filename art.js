const apiUrl = 'https://66e7e6bbb17821a9d9da704c.mockapi.io/home';

function renderArticles() {
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            const articlesContainer = document.getElementById('articlesContainer');
            articlesContainer.innerHTML = '';

            data.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
                articleElement.innerHTML = `
                    <div>
                        <h5>${article.title}</h5>
                        <p>${article.content}</p>
                        <img src="${article.image}" alt="${article.title}" class="img-fluid" style="max-width: 150px;">
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="deleteArticle(${article.id})">Delete</button>
                `;
                articlesContainer.appendChild(articleElement);
            });
        });
}

document.getElementById('newArticleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('articleTitle').value;
    const content = document.getElementById('articleContent').value;
    const image = document.getElementById('articleImage').files[0];
    const imageUrl = URL.createObjectURL(image);

    const newArticle = {
        title: title,
        content: content,
        image: imageUrl
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArticle)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        renderArticles();
        document.getElementById('newArticleForm').reset();
    });
});

function deleteArticle(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        renderArticles();
    });
}

renderArticles();