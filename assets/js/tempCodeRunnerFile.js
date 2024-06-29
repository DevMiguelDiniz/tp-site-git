document.addEventListener('DOMContentLoaded', (event) => {
    const repoContent = document.getElementById('repo-content');

    fetch('https://api.github.com/users/Miguerito/repos')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'col';

                card.innerHTML = `
            <div class="card h-100">
              <img src="../assets/img/default-repo-img.png" class="card-img-top" alt="${repo.name}">
              <div class="card-body">
                <h5 class="card-title"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h5>
                <p class="card-text">${repo.description || 'Sem descrição disponível.'}</p>
              </div>
            </div>
          `;

                repoContent.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os repositórios do GitHub:', error);
        });
});

const githubUsername = 'Miguerito';
const apiUrl = `https://api.github.com/users/${githubUsername}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('profile-image').src = data.avatar_url;
        document.getElementById('profile-name').textContent = data.name || githubUsername;
        document.getElementById('profile-bio').textContent = data.bio || 'Sem bio disponível';
        document.getElementById('profile-followers').textContent = data.followers || '0 seguidores';

    })
    .catch(error => console.error('Erro ao carregar dados do perfil:', error));


// URL do JSON Server onde seus dados estão armazenados
const apiUrl = 'http://localhost:3000/socialLinks'; // Substitua pelo URL do seu JSON Server

// Função para carregar links sociais a partir do JSON Server
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Verifica se os dados foram retornados e se contêm a propriedade esperada
        if (data) {
            document.getElementById('facebook-link').href = data.facebook;
            document.getElementById('twitter-link').href = data.twitter;
            document.getElementById('instagram-link').href = data.instagram;
        } else {
            console.error('Dados de links sociais não encontrados');
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os links sociais:', error);
    });
