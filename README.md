# Winner Store

Conceito de e-commerce esportivo voltado a raquetes, calçados e acessórios, com catálogo interativo e uma narrativa de scroll construída em torno do produto principal.

[Ver projeto em produção](https://winner-dun.vercel.app)

## Objetivo

Criar uma vitrine com identidade própria para produtos de tênis e transformar a raquete em parte da navegação. O elemento acompanha o scroll, simula o movimento de uma tacada e termina integrado à seção técnica.

## Funcionalidades

- Preloader animado
- Hero comercial responsiva
- Movimento contínuo da raquete com ScrollTrigger
- Animações específicas para desktop e mobile
- Catálogo com filtros por categoria
- Lista de favoritos em estado local
- Sacola demonstrativa
- Busca e menu em overlays
- Cards de produtos com tratamento de fallback de imagem

## Tecnologias

- Next.js
- React
- TypeScript
- GSAP e ScrollTrigger
- Tailwind CSS
- Vercel

## Decisões técnicas

A trajetória da raquete utiliza uma timeline única para manter continuidade entre seções. O posicionamento é recalculado de acordo com viewport e ponto de encaixe, com configurações diferentes para telas menores.

O catálogo é derivado de uma coleção tipada e filtrado com estado local, permitindo demonstrar busca visual, favoritos e sacola sem misturar essas interações com a animação principal.

## Desafios

- Manter o mesmo objeto visual atravessando diferentes seções
- Evitar saltos ao alternar entre posicionamento fixo e absoluto
- Adaptar amplitude, escala e trajetória no mobile
- Coordenar animação de impacto, bola e raquete durante o scroll

## Limites do projeto

Este repositório é um protótipo de frontend. Catálogo, favoritos e sacola não possuem persistência, autenticação, checkout ou integração com estoque.

## Executar localmente

```bash
git clone https://github.com/mateusdomingues/winner.git
cd winner
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```
