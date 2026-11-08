
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

let mapaSelecionado = null;
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

        // Conta os endereços deste mapa
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


        // Abre o mapa ao clicar
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

    mapaSelecionado = mapas.find(mapa => {

        return mapa.id === id;

    });


    if (!mapaSelecionado) return;


    // Alterna as páginas
    paginaInicial.classList.add("oculto");

    paginaEnderecos.classList.remove("oculto");


    // Atualiza informações
    tituloRegiao.textContent = mapaSelecionado.nome;

    descricaoRegiao.textContent = mapaSelecionado.descricao;


    // Atualiza link do My Maps
    linkMyMaps.href = mapaSelecionado.myMaps;


    // Carrega endereços
    carregarEnderecos(id);


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


    // Filtra os endereços do mapa
    const enderecosFiltrados = enderecos.filter(endereco => {

        return endereco.mapaId === mapaId;

    });


    // Atualiza contador
    totalEnderecos.textContent =
        `${enderecosFiltrados.length} endereços`;


    // Verifica se existem endereços
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


        // Monta endereço completo
        const destino = montarDestino(endereco);


        // Cria link de navegação
        const linkRota = criarLinkRota(destino);


        // Monta setor e bairro
        const informacaoRegiao = [

            endereco.setor,

            endereco.bairro

        ].filter(Boolean).join(" • ");


        card.innerHTML = `

            <div class="endereco-info">

                <h4>
                    ${endereco.rua}, ${endereco.numero}
                </h4>

                <p>
                    ${endereco.complemento || "Sem complemento"}
                </p>

                <p class="bairro">
                    ${informacaoRegiao || endereco.cidade}
                </p>

                ${endereco.observacao ? `

                    <p class="observacao">
                        ✎ ${endereco.observacao}
                    </p>

                ` : ""}

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

    // Prioriza coordenadas
    if (

        Number.isFinite(endereco.latitude) &&

        Number.isFinite(endereco.longitude)

    ) {

        return `${endereco.latitude},${endereco.longitude}`;

    }


    // Monta endereço completo
    return [

        endereco.rua,

        endereco.numero,

        endereco.bairro,

        endereco.cidade,

        endereco.estado,

        endereco.cep

    ]

    .filter(Boolean)

    .join(", ");

}


/* =================================
   CRIAR LINK DO GOOGLE MAPS
================================= */

function criarLinkRota(destino) {

    const parametros = new URLSearchParams({

        api: "1",

        destination: destino

    });


    // Utiliza localização do usuário,
    // caso esteja disponível
    if (localizacaoUsuario) {

        parametros.set(

            "origin",

            `${localizacaoUsuario.latitude},${localizacaoUsuario.longitude}`

        );

    }


    return `https://www.google.com/maps/dir/?${parametros.toString()}`;

}


/* =================================
   VOLTAR PARA PÁGINA INICIAL
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

    if (!navigator.geolocation) {

        alert("Seu navegador não suporta geolocalização.");

        return;

    }


    btnLocalizacao.textContent = "Localizando...";

    btnLocalizacao.disabled = true;


    navigator.geolocation.getCurrentPosition(

        // SUCESSO
        (posicao) => {

            localizacaoUsuario = {

                latitude: posicao.coords.latitude,

                longitude: posicao.coords.longitude

            };


            btnLocalizacao.textContent = "✓ Localização encontrada";

            btnLocalizacao.disabled = false;


            alert(

                `Sua localização foi encontrada!\n\n` +

                `Latitude: ${localizacaoUsuario.latitude}\n` +

                `Longitude: ${localizacaoUsuario.longitude}`

            );


            // Atualiza links dos endereços
            if (mapaSelecionado) {

                carregarEnderecos(mapaSelecionado.id);

            }

        },


        // ERRO
        (erro) => {

            btnLocalizacao.textContent = "⌖ Minha localização";

            btnLocalizacao.disabled = false;


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
