
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

// Botões e links
const btnVoltar = document.querySelector("#btn-voltar");
const btnLocalizacao = document.querySelector("#btn-localizacao");
const linkMyMaps = document.querySelector("#link-mymaps");

// Status da localização
const statusLocalizacao = document.querySelector("#status-localizacao");


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

    // Solicita localização automaticamente
    obterLocalizacao();

});


/* =================================
   CRIAR CARDS DOS BAIRROS
================================= */

function carregarMapas() {

    listaMapas.innerHTML = "";

    totalMapas.textContent = `${mapas.length} bairros`;

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

    // Procura o mapa pelo ID
    mapaSelecionado = mapas.find(mapa => {

        return mapa.id === id;

    });


    if (!mapaSelecionado) return;


    // Alterna as páginas
    paginaInicial.classList.add("oculto");

    paginaEnderecos.classList.remove("oculto");


    // Atualiza informações
    tituloRegiao.textContent = mapaSelecionado.nome;

    descricaoRegiao.textContent =
        "Consulte os endereços disponíveis neste mapa.";


    // Carrega endereços
    carregarEnderecos(id);


    // Atualiza o link da rota completa
    atualizarLinkRotaCompleta();


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


    // Filtra os endereços do mapa selecionado
    const enderecosFiltrados = enderecos.filter(endereco => {

        return endereco.mapaId === mapaId;

    });


    // Atualiza contador
    totalEnderecos.textContent =
        `${enderecosFiltrados.length} endereços`;


    // Verifica se existem endereços
    if (enderecosFiltrados.length === 0) {

        listaEnderecos.innerHTML = `
            <p>Nenhum endereço cadastrado neste mapa.</p>
        `;

        return;

    }


    // Cria os cards
    enderecosFiltrados.forEach(endereco => {

        const card = document.createElement("article");

        card.classList.add("card-endereco");


        // Monta o destino
        const destino = montarDestino(endereco);


        // Cria link individual
        const linkRota = criarLinkRota(destino);


        // Junta setor e bairro
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

    // Prioriza coordenadas quando disponíveis
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
   CRIAR LINK DE ROTA INDIVIDUAL
================================= */

function criarLinkRota(destino) {

    const parametros = new URLSearchParams({

        api: "1",

        destination: destino,

        travelmode: "driving"

    });


    // Usa localização atual como origem
    if (localizacaoUsuario) {

        parametros.set(

            "origin",

            `${localizacaoUsuario.latitude},${localizacaoUsuario.longitude}`

        );

    }


    return `https://www.google.com/maps/dir/?${parametros.toString()}`;

}


/* =================================
   CRIAR LINK DA ROTA COMPLETA
================================= */

function criarLinkRotaCompleta(mapaId) {

    // Busca todos os endereços do mapa
    const enderecosDoMapa = enderecos.filter(endereco => {

        return endereco.mapaId === mapaId;

    });


    // Não cria rota sem endereços
    if (enderecosDoMapa.length === 0) {

        return null;

    }


    // O último endereço será o destino final
    const ultimoEndereco = enderecosDoMapa[
        enderecosDoMapa.length - 1
    ];


    const destinoFinal = montarDestino(ultimoEndereco);


    // Prepara os parâmetros da rota
    const parametros = new URLSearchParams({

        api: "1",

        destination: destinoFinal,

        travelmode: "driving"

    });


    // Adiciona a localização do usuário como origem
    if (localizacaoUsuario) {

        parametros.set(

            "origin",

            `${localizacaoUsuario.latitude},${localizacaoUsuario.longitude}`

        );

    }


    // Todos os endereços anteriores serão paradas intermediárias
    const pontosIntermediarios = enderecosDoMapa
        .slice(0, -1)
        .map(endereco => montarDestino(endereco));


    // Adiciona as paradas na rota
    if (pontosIntermediarios.length > 0) {

        parametros.set(

            "waypoints",

            pontosIntermediarios.join("|")

        );

    }


    return `https://www.google.com/maps/dir/?${parametros.toString()}`;

}


/* =================================
   ATUALIZAR ROTA COMPLETA
================================= */

function atualizarLinkRotaCompleta() {

    if (!mapaSelecionado) return;


    const link = criarLinkRotaCompleta(mapaSelecionado.id);


    if (!link) {

        linkMyMaps.removeAttribute("href");

        linkMyMaps.textContent = "Nenhum endereço disponível";

        return;

    }


    linkMyMaps.href = link;

    linkMyMaps.textContent = "Abrir rota completa ↗";

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
   OBTER LOCALIZAÇÃO DO USUÁRIO
================================= */

function obterLocalizacao() {

    // Verifica suporte do navegador
    if (!navigator.geolocation) {

        statusLocalizacao.textContent =
            "Geolocalização não suportada";

        return;

    }


    btnLocalizacao.disabled = true;

    btnLocalizacao.textContent = "Localizando...";

    statusLocalizacao.textContent =
        "Obtendo sua localização...";


    navigator.geolocation.getCurrentPosition(

        // SUCESSO
        (posicao) => {

            localizacaoUsuario = {

                latitude: posicao.coords.latitude,

                longitude: posicao.coords.longitude

            };


            statusLocalizacao.textContent =
                "Localização encontrada";


            btnLocalizacao.textContent =
                "✓ Localização ativa";


            btnLocalizacao.disabled = false;


            // Atualiza links individuais e rota completa
            if (mapaSelecionado) {

                carregarEnderecos(mapaSelecionado.id);

                atualizarLinkRotaCompleta();

            }

        },


        // ERRO
        (erro) => {

            btnLocalizacao.textContent =
                "⌖ Minha localização";

            btnLocalizacao.disabled = false;


            let mensagem =
                "Não foi possível obter a localização";


            if (erro.code === 1) {

                mensagem = "Permissão de localização negada";

            }


            if (erro.code === 2) {

                mensagem = "Localização indisponível";

            }


            if (erro.code === 3) {

                mensagem = "Tempo de localização esgotado";

            }


            statusLocalizacao.textContent = mensagem;

        },


        // CONFIGURAÇÕES
        {

            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0

        }

    );

}


/* =================================
   BOTÃO PARA TENTAR LOCALIZAR NOVAMENTE
================================= */

btnLocalizacao.addEventListener("click", () => {

    obterLocalizacao();

});
