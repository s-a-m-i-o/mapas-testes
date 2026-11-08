
/* =================================
   ELEMENTOS HTML
================================= */

// Páginas
const paginaInicial = document.querySelector("#pagina-inicial");
const paginaEnderecos = document.querySelector("#pagina-enderecos");

// Listas
const listaMapas = document.querySelector("#lista-mapas");
const listaEnderecos = document.querySelector("#lista-enderecos");

// Títulos e contadores
const tituloRegiao = document.querySelector("#titulo-regiao");
const descricaoRegiao = document.querySelector("#descricao-regiao");

const totalMapas = document.querySelector("#total-mapas");
const totalEnderecos = document.querySelector("#total-enderecos");

// Botões
const btnVoltar = document.querySelector("#btn-voltar");
const btnLocalizacao = document.querySelector("#btn-localizacao");

// Link My Maps
const linkMyMaps = document.querySelector("#link-mymaps");


/* =================================
   VARIÁVEIS
================================= */

// Armazena o mapa selecionado
let mapaSelecionado = null;

// Armazena a localização do usuário
let localizacaoUsuario = null;


/* =================================
   INICIALIZAÇÃO
================================= */

document.addEventListener("DOMContentLoaded", () => {

    carregarMapas();

});


/* =================================
   CRIAR CARDS DOS MAPAS
================================= */

function carregarMapas() {

    listaMapas.innerHTML = "";

    totalMapas.textContent = `${mapas.length} mapas`;

    mapas.forEach(mapa => {

        // Conta os endereços pertencentes ao mapa
        const quantidade = enderecos.filter(endereco => {
            return endereco.mapaId === mapa.id;
        }).length;


        // Cria o card
        const card = document.createElement("article");

        card.classList.add("card-mapa");

        card.innerHTML = `
            <div class="card-topo">

                <div class="icone-mapa">⌖</div>

                <span class="numero-mapa">
                    MAPA ${String(mapa.id).padStart(2, "0")}
                </span>

            </div>

            <h3>${mapa.nome}</h3>

            <p>${mapa.descricao}</p>

            <div class="card-rodape">

                <span>⌖ ${quantidade} endereços</span>

                <strong>Visualizar →</strong>

            </div>
        `;


        // Ao clicar, abre os endereços
        card.addEventListener("click", () => {

            abrirMapa(mapa.id);

        });


        listaMapas.appendChild(card);

    });

}


/* =================================
   ABRIR MAPA SELECIONADO
================================= */

function abrirMapa(id) {

    // Procura o mapa pelo ID
    mapaSelecionado = mapas.find(mapa => {
        return mapa.id === id;
    });


    // Se não encontrar, interrompe
    if (!mapaSelecionado) return;


    // Esconde a página inicial
    paginaInicial.classList.add("oculto");


    // Mostra a página de endereços
    paginaEnderecos.classList.remove("oculto");


    // Atualiza as informações
    tituloRegiao.textContent = mapaSelecionado.nome;

    descricaoRegiao.textContent = mapaSelecionado.descricao;


    // Atualiza o link do My Maps
    linkMyMaps.href = mapaSelecionado.myMaps;


    // Carrega os endereços
    carregarEnderecos(id);


    // Volta ao início da página
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =================================
   CARREGAR ENDEREÇOS
================================= */

function carregarEnderecos(mapaId) {

    listaEnderecos.innerHTML = "";


    // Filtra os endereços pelo mapa selecionado
    const enderecosFiltrados = enderecos.filter(endereco => {

        return endereco.mapaId === mapaId;

    });


    // Atualiza o contador
    totalEnderecos.textContent =
        `${enderecosFiltrados.length} endereços`;


    // Se não houver endereços
    if (enderecosFiltrados.length === 0) {

        listaEnderecos.innerHTML = `
            <p>Nenhum endereço cadastrado nesta região.</p>
        `;

        return;

    }


    // Cria os cards
    enderecosFiltrados.forEach(endereco => {

        const card = document.createElement("article");

        card.classList.add("card-endereco");


        // Monta o endereço para o Google Maps
        const destino = montarDestino(endereco);


        // Cria o link de navegação
        const linkRota = criarLinkRota(destino);


        card.innerHTML = `
            <div class="endereco-info">

                <h4>
                    ${endereco.rua}, ${endereco.numero}
                </h4>

                <p>
                    ${endereco.complemento || "Sem complemento"}
                </p>

                <p class="bairro">
                    ${endereco.bairro}
                </p>

            </div>

            <a
                href="${linkRota}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-rota"
            >
                ↗ Como chegar
            </a>
        `;


        listaEnderecos.appendChild(card);

    });

}


/* =================================
   MONTAR DESTINO
================================= */

function montarDestino(endereco) {

    // Se tiver coordenadas, utiliza a localização exata
    if (
        Number.isFinite(endereco.latitude) &&
        Number.isFinite(endereco.longitude)
    ) {

        return `${endereco.latitude},${endereco.longitude}`;

    }


    // Caso contrário, utiliza o endereço escrito
    return `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}`;

}


/* =================================
   CRIAR LINK DO GOOGLE MAPS
================================= */

function criarLinkRota(destino) {

    const parametros = new URLSearchParams({

        api: "1",

        destination: destino

    });


    // Se o usuário já informou sua localização,
    // utiliza ela como ponto de partida
    if (localizacaoUsuario) {

        parametros.set(
            "origin",
            `${localizacaoUsuario.latitude},${localizacaoUsuario.longitude}`
        );

    }


    return `https://www.google.com/maps/dir/?${parametros.toString()}`;

}


/* =================================
   VOLTAR PARA A PÁGINA INICIAL
================================= */

btnVoltar.addEventListener("click", () => {

    paginaEnderecos.classList.add("oculto");

    paginaInicial.classList.remove("oculto");

    mapaSelecionado = null;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =================================
   LOCALIZAÇÃO DO USUÁRIO
================================= */

btnLocalizacao.addEventListener("click", () => {

    // Verifica se o navegador oferece geolocalização
    if (!navigator.geolocation) {

        alert("Seu navegador não suporta geolocalização.");

        return;

    }


    btnLocalizacao.textContent = "Localizando...";

    navigator.geolocation.getCurrentPosition(

        // SUCESSO
        (posicao) => {

            localizacaoUsuario = {

                latitude: posicao.coords.latitude,

                longitude: posicao.coords.longitude

            };


            btnLocalizacao.textContent = "✓ Localização encontrada";


            alert(
                `Sua localização foi encontrada!\n\n` +
                `Latitude: ${localizacaoUsuario.latitude}\n` +
                `Longitude: ${localizacaoUsuario.longitude}`
            );


            // Atualiza os links caso esteja
            // visualizando algum mapa
            if (mapaSelecionado) {

                carregarEnderecos(mapaSelecionado.id);

            }

        },


        // ERRO
        (erro) => {

            btnLocalizacao.textContent = "⌖ Minha localização";

            let mensagem = "Não foi possível obter sua localização.";

            if (erro.code === 1) {
                mensagem = "Você não autorizou o acesso à localização.";
            }

            if (erro.code === 2) {
                mensagem = "Sua localização está indisponível.";
            }

            if (erro.code === 3) {
                mensagem = "O tempo para localizar você terminou.";
            }

            alert(mensagem);

        },


        // CONFIGURAÇÕES
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

});
