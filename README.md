# Vértice Racing

Implementação responsiva das seis telas do Figma em HTML, CSS e JavaScript, sem dependências de runtime.

## Rodar

Execute `python -m http.server 4173 --directory dist` nesta pasta e abra http://localhost:4173.

O site pronto está em `dist/`. Para alterar os textos compartilhados ou as páginas, edite `build.mjs` e execute `node build.mjs`. Estilos e animações estão em `dist/styles.css` e `dist/app.js`.

## Animações

- Revelação de seções com IntersectionObserver e atrasos progressivos.
- Movimento suave das imagens vinculado ao scroll, sem capturar a rolagem.
- Barras de desempenho animadas ao entrarem na tela.
- Indicador de progresso da leitura.
- Respeito a prefers-reduced-motion e controle de pausa persistido neste navegador.
- O conteúdo e a navegação continuam acessíveis com JavaScript desativado.

## Conteúdo

Equipe, biografias, calendário e resultados são fictícios. As quatro fotografias conceituais foram geradas por IA e estão na Galeria e no Figma. Os espaços dos pilotos foram preservados; substitua a função `portrait` em `build.mjs` pelas fotos quando estiverem disponíveis.

Os links sociais não tinham destinos definidos no Figma e foram substituídos no rodapé pela navegação interna. O CTA de comunidade leva à temporada, sem simular cadastro ou envio de dados.

As fontes Barlow e Barlow Condensed são armazenadas localmente. Os SVGs são os recursos originais exportados pelo Figma.

