# Ignews blog

## Oque é Ignews 

Um blog de noticias Tech fechado, ou seja, ele tem o proposito de levar ao publico noticias exclusivas diárias. 
É ideal para aqueles que amam tecnologia e esperam informações sérias e de qualidade do mundo Tech. Se você quer receber noticias de especialistas altamente qualificado, você está no lugar certo!

## Como foi feito

Realizado com o <a href="https://nextjs.org/">Framework Next.js</a> o blog trouxe varias tecnologias e inteligências para a aplicação que, fizeram com que viabilizasse a sua disposição a produção.

O Next.js garantiu a separação das regras de back-end a de front-end, protegendo dados frageis do sistema, como conexão com banco de dados, com sistema de pagamento, e outras API's.

Como facilitador do front-end também traz uma maneira simples de criar rotas as nossas páginas, o que foi bem util tanto para páginas estaticas quanto dinamicas.
Mas não poderia deixar de lado o grande diferencial do Next.js, que é a possibilidade de trabalhar com Server-side rendering (SSR) e Static-side generation (SSG), que nada mais são que formas de renderizar a página de formas diferentes, mesmo ocorrendo no lado do servidor.

Veja mais sobre SSG e SSR em: <a href="https://blog.logrocket.com/ssg-vs-ssr-in-next-js/">SSG vs. SSR in Next.js</a>

Foi usado a <a href="https://stripe.com/">API da Stripe</a> como meio de transações, o grande ponto da utilização desta tecnologia foi compreender WebHooks, que cria uma conexão entre dois sistemas, e um desses receba evento da outra, resumidamente.

Todo o gerenciamento de usuário e estado de inscrição foi controlado pelo banco de dados <a href="https://fauna.com/">faunaDB</a>, com ele você consegue de forma simples, inserir e coletar dados de forma denamica conforme necesidades que a aplicação pedia, sem precisar de um back-end fazendo todo o trabalho de query, conexões entre outras 

E por fim o <a href="">Prismic</a> que é que Headless CMS, gerenciador de conteúdo, que é o responsável por armazenar e servir os conteúdos dos artigos.

Todas essas tecnologias e implementações são claramente algo que trouxe meu conhecimento em relação a aplicações, comunicações e arquitetura a um nível que não esperava antes.

## Como testar a aplicação

Se quiser testar a aplicação em produção primeiramente você pode acessar-lo aqui:  https://ignews-bruno.netlify.app/

Ao acessar o site você irá fazer seu login com github. Para isso é muito importante que você deixe o e-mail do seu github publico. É muito simples, e você pode ver este pequeno tutorial - <a href="https://help.umbler.com/hc/pt-br/articles/360007180671-Tornando-seu-e-mail-p%C3%BAblico-no-GitHub#:~:text=O%20primeiro%20passo%20%C3%A9%20acessar,Keep%20my%20email%20address%20private">Tornando seu e-mail público no GitHub</a> - da Umbler, que te auxiliará em caso de dúvida.

Conforme a documentação do Stripe indica, utilize o seguinte numero de cartão para teste: *4242 4242 4242 4242*

Veja mais sobre em <a href="https://stripe.com/docs/testing">teste de intregração</a> com stripe.

Agora, aproveite!

Tabela de conteúdos
=================
<p align="center">
 • <a href="#começando">Começando</a>
 • <a href="#prerequisitos">Pré-requisitos</a>
 • <a href="#instalação">Instalação</a>
 • <a href="#autor">Autor</a>
</p>

## Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **Instalação** para saber como implantar o projeto.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/). 
Além disto é bom ter um bom editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)


### Instalação

```bash
# Clone este repositório
$ git clone <https://github.com/bruno3du/ig.news.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd ignews

# Instale as dependências
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

<div align="left">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> 
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" />
<img src="https://img.shields.io/badge/Prismic -%23484A7A.svg?&style=for-the-badge&logo=Prismic&logoColor=white" />
 
</div>

---
## 📌 Versão

Foi usado o [Github](https://github.com/) para controle de versão. Para as versões disponíveis, observe as [tags neste repositório](https://github.com/suas/tags/do/projeto). 

---
## 🎁 Expressões de gratidão

* Agradeço a RocketSeat por apresentar essas tecnlogias e conceitos que me levaram ao proximo nível de conhecimento 📢
* Agradeço imensamente o apoio de cada envolvidos nesta trajetória 🤓.

---
### Autor

<a href="https://github.com/bruno3du">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/83365446?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Bruno Eduardo</b></sub></a> <a href="https://github.com/bruno3du" title="My Photo Profile">🚀</a>


Feito com ❤️ por Bruno Eduardo 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/bruno-eduardo-alves/)](https://www.linkedin.com/in/bruno-eduardo-alves/)
[![Hotmail Badge](https://img.shields.io/badge/-bruno.3duardo@hotmail.com-0078D4?style=flat-square&logo=microsoft-outlook&logoColor=white&link=mailto:bruno.3duardo@hotmail.com)](mailto:bruno.3duardo@hotmail.com)
