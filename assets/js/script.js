const repositorios = document.querySelector('.card-body');

function getApiGitHub() {
    fetch('https://api.github.com/users/Miguerito/repos')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            let data = await res.json();
            // Faça algo com os dados aqui
        })
        .catch(error => {
            console.error('Erro ao buscar repositórios:', error);
        });
}

getApiGitHub();