document.addEventListener('DOMContentLoaded', () => {
    const repoContent = document.getElementById('repo-content');

    // Buscar repositórios do GitHub
    fetch('https://api.github.com/users/Miguerito/repos')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'col';

                // Adicionar número de estrelas e forks
                const stars = repo.stargazers_count || 0;
                const forks = repo.forks_count || 0;

                card.innerHTML = `
            <div class="card h-100">
              <img src="../assets/img/default-repo-img.png" class="card-img-top" alt="${repo.name}">
              <div class="card-body">
                <h5 class="card-title"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h5>
                <p class="card-text">${repo.description || 'Sem descrição disponível.'}</p>
                <div class="repo-stats">
                  <span class="badge bg-primary">Estrelas: ${stars}</span>
                  <span class="badge bg-secondary">Forks: ${forks}</span>
                </div>
              </div>
            </div>
          `;

                repoContent.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os repositórios do GitHub:', error);
        });

    // Buscar dados do perfil do GitHub
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

    const socialLinksUrl = 'http://localhost:3000/socialLinks'; // Acesso ao objeto socialLinks

    fetch(socialLinksUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos de socialLinks:', data); // Adicione esta linha para depuração

            // Acessar diretamente as propriedades do objeto
            if (data) {
                document.getElementById('linkedin-link').href = data.linkedin || '#';
                document.getElementById('twitter-link').href = data.twitter || '#';
                document.getElementById('instagram-link').href = data.instagram || '#';
            } else {
                console.error('Dados de links sociais não encontrados ou no formato errado');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os links sociais:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('#carouselExampleCaptions .carousel-inner');
    const carouselIndicators = document.querySelector('#carouselExampleCaptions .carousel-indicators');

    // URL do JSON Server
    const slidesUrl = 'http://localhost:3000/slide';

    // Buscar dados do carrossel
    fetch(slidesUrl)
        .then(response => response.json())
        .then(slides => {
            slides.forEach((slide, index) => {
                // Adicionar slide ao carousel-inner
                const slideElement = document.createElement('div');
                slideElement.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                slideElement.innerHTML = `
            <img src="${slide.coverImageUrl}" class="d-block w-100" alt="${slide.title}">
            <div class="carousel-caption d-none d-md-block">
              <h5><a href="${slide.contentUrl}" target="_blank">${slide.title}</a></h5>
              <p>${slide.description}</p>
            </div>
          `;
                carouselInner.appendChild(slideElement);

                // Adicionar indicador ao carousel-indicators
                const indicatorElement = document.createElement('button');
                indicatorElement.type = 'button';
                indicatorElement.setAttribute('data-bs-target', '#carouselExampleCaptions');
                indicatorElement.setAttribute('data-bs-slide-to', index);
                if (index === 0) {
                    indicatorElement.classList.add('active');
                    indicatorElement.setAttribute('aria-current', 'true');
                }
                indicatorElement.setAttribute('aria-label', `Slide ${index + 1}`);
                carouselIndicators.appendChild(indicatorElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados do carrossel:', error);
        });
});
const colegasUrl = 'http://localhost:3000/pessoas';

fetch(colegasUrl)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('colleagues-container');

        data.forEach(colleague => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
              <div class="card" style="width: 18rem;">
                <img src="${colleague.photoUrl}" class="card-img-top" alt="${colleague.name}">
                <div class="card-body">
                  <h5 class="card-title">${colleague.name}</h5>
                  <a href="${colleague.githubProfileUrl}" class="btn btn-primary" target="_blank">Perfil no GitHub</a>
                </div>
              </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os dados dos colegas:', error);
    });