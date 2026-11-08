# 🦇 Mapas de Endereços — Protótipo 1.0

> Um sistema de localização e organização de endereços, desenvolvido para facilitar visitas, deslocamentos e o acesso às informações de cada região.

**Versão:** 1.0  
**Status:** Em desenvolvimento  
**Tipo:** Protótipo  
**Tecnologias:** HTML5 · CSS3 · JavaScript puro

---

## 🎯 1. Objetivo do projeto

Desenvolver uma plataforma simples, intuitiva e funcional para facilitar a localização de endereços e o deslocamento dos usuários.

O sistema permitirá visualizar regiões, consultar endereços cadastrados, identificar a própria localização e acessar rotas por meio do Google Maps e Google My Maps.

A prioridade inicial será oferecer uma experiência prática, com navegação simples e informações organizadas.

## 🗺️ 2. Funcionalidades principais

### 2.1. Página inicial — Regiões e mapas

Ao acessar o sistema, o usuário encontrará cards representando as regiões ou mapas disponíveis.

Cada card deverá apresentar:
- Nome da região ou mapa.
- Bairro ou conjunto de bairros atendidos.
- Quantidade de endereços cadastrados.
- Identificação visual para facilitar a escolha.

### 2.2. Visualização dos endereços

Após selecionar um card, o usuário será direcionado para uma página com todos os endereços daquela região.

Cada endereço deverá apresentar:
- Identificação do endereço.
- Nome da rua e número.
- Bairro.
- Informações complementares, quando necessário.
- Prévia da localização no mapa.

### 2.3. Localização do usuário

O sistema poderá solicitar permissão para acessar a localização atual do dispositivo.

Com isso, será possível:
- Identificar a posição atual do usuário.
- Comparar a localização com os endereços disponíveis.
- Facilitar a orientação e o deslocamento.

**Observação:** a localização dependerá da autorização do usuário e da disponibilidade do serviço de geolocalização do dispositivo.

### 2.4. Integração com mapas

O projeto utilizará serviços externos para visualização e navegação.

**Google Maps**
- Visualização de endereços.
- Consulta de rotas.
- Navegação até o destino escolhido.

**Google My Maps**
- Visualização de mapas personalizados.
- Organização de endereços por regiões.
- Consulta do conjunto completo de localizações.

### 2.5. Prévia do mapa e navegação

Na página de cada região, o usuário terá acesso a uma prévia do mapa completo.

Ao clicar na prévia, poderá abrir o mapa externo correspondente.

Também será possível selecionar um endereço específico e solicitar a navegação até ele pelo Google Maps.

---

## ⚙️ 3. Tecnologias utilizadas

O protótipo será desenvolvido inicialmente sem frameworks ou bibliotecas externas.

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Layout, identidade visual e responsividade |
| JavaScript | Interações, lógica e manipulação dos dados |
| Geolocation API | Identificação da localização do usuário |
| Google Maps | Visualização e navegação |
| Google My Maps | Mapas personalizados e organização dos endereços |
| Git / GitHub | Versionamento e armazenamento do projeto |

**Filosofia inicial:** manter o código simples, organizado e independente de frameworks, priorizando o aprendizado e o controle sobre cada funcionalidade.

---

## 🚀 4. Funcionalidades futuras

O projeto será desenvolvido em etapas. Novos recursos serão incorporados conforme a evolução do sistema.

### 4.1. Registro de visitas

Após visitar um endereço, o usuário poderá registrar informações sobre a visita.

Possíveis informações:
- Data da visita.
- Resultado da visita.
- Observações.
- Informações importantes para uma próxima visita.
- Histórico de visitas anteriores.

### 4.2. Status dos endereços

Adicionar indicadores visuais para identificar a situação de cada endereço.

Exemplos:
- Pendente.
- Visitado.
- Necessita retornar.
- Não localizado.
- Endereço atualizado.

### 4.3. Histórico e armazenamento

Possibilidade de armazenar os registros realizados pelos usuários, permitindo consultar informações mesmo após fechar o navegador.

### 4.4. Melhorias de navegação

- Identificação dos endereços mais próximos.
- Organização por distância.
- Sugestão de sequência de visitas.
- Otimização do deslocamento entre vários endereços.

### 4.5. Outras possibilidades

- Pesquisa de endereços.
- Filtros por bairro.
- Cadastro e edição de endereços.
- Painel administrativo.
- Diferentes níveis de acesso.
- Integração com banco de dados.

---

## 📌 5. Etapas de desenvolvimento

| Etapa | Descrição | Status |
|---|---|---|
| 01 | Planejamento e estrutura do projeto | 🟡 Em andamento |
| 02 | Criação da página inicial e cards | ⚪ Pendente |
| 03 | Página de visualização dos endereços | ⚪ Pendente |
| 04 | Integração com Google Maps e My Maps | ⚪ Pendente |
| 05 | Geolocalização do usuário | ⚪ Pendente |
| 06 | Responsividade para dispositivos móveis | ⚪ Pendente |
| 07 | Testes e correções | ⚪ Pendente |
| 08 | Finalização do protótipo 1.0 | ⚪ Pendente |

---

## 🗂️ 6. Organização inicial dos arquivos

Sugestão de estrutura para manter o projeto organizado e facilitar futuras atualizações.

```text
prototipo-1.0/
│
├── index.html
│
├── pages/
│   └── enderecos.html
│
├── css/
│   ├── style.css
│   └── enderecos.css
│
├── js/
│   ├── main.js
│   ├── mapas.js
│   └── localizacao.js
│
├── data/
│   └── enderecos.js
│
├── assets/
│   ├── images/
│   └── icons/
│
└── README.md
```

A estrutura poderá ser modificada conforme o projeto crescer.

---

## 🧭 7. Diretrizes do projeto

Alguns princípios deverão orientar o desenvolvimento:

- **Simplicidade:** o usuário deve encontrar o que procura sem precisar navegar por várias páginas.
- **Clareza:** informações e endereços devem ser apresentados de maneira organizada.
- **Praticidade:** reduzir etapas entre encontrar um endereço e iniciar o deslocamento.
- **Responsividade:** funcionar bem em computadores, tablets e celulares.
- **Evolução:** permitir adicionar novas funcionalidades sem precisar reconstruir todo o sistema.
- **Organização:** manter códigos, dados e arquivos separados.

---

## 🌑 8. Visão do projeto

O Protótipo 1.0 será a primeira versão de um sistema que poderá evoluir para muito além da simples visualização de endereços.

A proposta é transformar um conjunto de mapas e localizações em uma ferramenta de organização, acompanhamento e gerenciamento de visitas.

**Primeiro, encontrar o caminho. Depois, registrar cada passo.**

---

*Projeto em desenvolvimento — Protótipo 1.0.*