# git-class-pages

Catálogo de livros (título, autor, estado, nota) — ciclo 1 da etapa 6 da aula prática de Git (Path26, bloco `GIT`).

- **Modelo de branching:** GitHub Flow — `main` sempre publicável, branches curtas, PR, merge = deploy.
- **PRD:** GitHub Pages, publicado a partir da `main` (raiz).
- **Dados:** `localStorage` do browser. Cada browser tem os seus dados; nada é partilhado nem enviado para um servidor.

## Como correr (DEV)

Abrir o `index.html` no browser (duplo clique). Não há build nem dependências.

## O que observar

- Os livros sobrevivem a um refresh (ficam no `localStorage`).
- Noutro browser, ou numa janela anónima, a lista começa vazia.
- A versão aparece no rodapé.
