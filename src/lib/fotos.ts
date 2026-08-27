import type { StaticImageData } from "next/image";

import carreSuino from "@/assets/fotos/carre-suino.jpg";
import equipe from "@/assets/fotos/equipe.jpg";
import fachada from "@/assets/fotos/fachada.jpg";
import feijoada from "@/assets/fotos/feijoada.jpg";
import paesDoces from "@/assets/fotos/paes-doces.jpg";
import paesDocesBalcao from "@/assets/fotos/paes-doces-balcao.jpg";
import paesFranceses from "@/assets/fotos/paes-franceses.jpg";
import paoGratinado from "@/assets/fotos/pao-gratinado-cafe.jpg";
import paoRecheado from "@/assets/fotos/pao-recheado.jpg";
import pratoDoDia from "@/assets/fotos/prato-do-dia.jpg";
import rocambole from "@/assets/fotos/rocambole.jpg";
import salao from "@/assets/fotos/salao.jpg";
import varanda from "@/assets/fotos/varanda.jpg";
import videoPoster from "@/assets/fotos/video-poster.jpg";
import tortaBolo from "@/assets/fotos/torta-salgada-bolo.jpg";

export type Foto = {
  src: StaticImageData;
  /** descrição para leitor de tela */
  alt: string;
  /** legenda curta, aparece no hover e na visualização ampliada */
  legenda: string;
};

/**
 * Fotos enviadas pela padaria em 26/08/2026.
 * As legendas foram escritas a partir do que aparece na imagem — precisam
 * de uma passada do cliente antes de virarem definitivas.
 */
export const fotos: Foto[] = [
  {
    src: paoRecheado,
    alt: "Atendente com o avental do brasão da padaria segurando um pão recheado do tamanho do antebraço",
    legenda: "Pão recheado, feito para dividir",
  },
  {
    src: paoGratinado,
    alt: "Pão gratinado com queijo e batata palha em prato branco, com uma xícara de café ao fundo",
    legenda: "Lanche gratinado com café",
  },
  {
    src: paesDoces,
    alt: "Bandeja de pães doces polvilhados de açúcar, com recheio de goiabada",
    legenda: "Pães doces saindo do forno",
  },
  {
    src: pratoDoDia,
    alt: "Prato do dia servido no salão: frango ensopado, polenta, arroz e couve refogada",
    legenda: "O prato do dia no salão",
  },
  {
    src: paesFranceses,
    alt: "Funcionário com o brasão bordado na camiseta segurando uma cesta cheia de pães franceses",
    legenda: "A fornada de pão francês",
  },
  {
    src: feijoada,
    alt: "Prato de feijoada com arroz, couve refogada e farofa",
    legenda: "Feijoada da casa",
  },
  {
    src: carreSuino,
    alt: "Carré suíno grelhado servido com arroz, couve refogada e feijão",
    legenda: "Carré suíno do almoço",
  },
  {
    src: tortaBolo,
    alt: "Torta salgada e bolo de chocolate com granulado servidos lado a lado em pratos de louça",
    legenda: "Doce e salgado no mesmo balcão",
  },
  {
    src: rocambole,
    alt: "Fatia de rocambole de goiabada com coco ralado, segurada em um prato à frente da fachada da padaria",
    legenda: "Rocambole na porta da padaria",
  },
  {
    src: varanda,
    alt: "Entrada da padaria vista de dentro, com o freezer de sorvete, as mesas altas e a rua de Petrópolis ao fundo",
    legenda: "A varanda, de frente para a rua",
  },
  {
    src: equipe,
    alt: "Seis funcionárias da padaria posando juntas dentro da loja, de uniforme e avental com o brasão",
    legenda: "Quem atende no balcão",
  },
  {
    src: salao,
    alt: "Salão da padaria, com mesas, balcão e o painel de produtos com o brasão na parede",
    legenda: "O salão, para comer sentado",
  },
  {
    src: fachada,
    alt: "Fachada da padaria, com toldo verde e a bandeira roxa com o brasão da Rainha da Massa",
    legenda: "A fachada da padaria",
  },
];

/**
 * As fotos de prato da galeria, reaproveitadas na seção de almoço.
 * Mesmos arquivos — a legenda muda para o contexto do almoço.
 */
export const pratosDoAlmoco: Foto[] = [
  {
    src: pratoDoDia,
    alt: "Prato do dia servido no salão: frango ensopado, polenta, arroz e couve refogada",
    legenda: "O prato do dia no salão",
  },
  {
    src: carreSuino,
    alt: "Carré suíno grelhado servido com arroz, couve refogada e feijão",
    legenda: "O carré de terça",
  },
  {
    src: feijoada,
    alt: "Prato de feijoada com arroz, couve refogada e farofa",
    legenda: "A feijoada de sexta",
  },
];

/** Um slide do hero: uma foto, ou o vídeo com a foto de cartaz. */
export type Slide = Foto & { video?: string; duracao?: number };

/**
 * Carrossel do hero. A foto da equipe e a da fachada recortada continuam
 * só na galeria — decisão do cliente.
 */
export const heroSlides: Slide[] = [
  {
    src: videoPoster,
    video: "/video/padaria.mp4",
    duracao: 7000,
    alt: "Vídeo curto da padaria: uma fatia de rocambole, um pastel saindo da fritura e um copo de suco de laranja",
    legenda: "Um dia na padaria",
  },
  {
    src: varanda,
    alt: "Entrada da padaria vista de dentro, com o freezer de sorvete, as mesas altas e a rua de Petrópolis ao fundo",
    legenda: "A varanda, de frente para a rua",
  },
  {
    src: paesFranceses,
    alt: "Funcionário com o brasão bordado na camiseta segurando uma cesta cheia de pães franceses",
    legenda: "A fornada de pão francês",
  },
  {
    src: salao,
    alt: "Salão da padaria, com mesas, balcão e o painel de produtos com o brasão na parede",
    legenda: "O salão, para almoçar sentado",
  },
  {
    src: rocambole,
    alt: "Fatia de rocambole de goiabada com coco ralado, segurada em um prato à frente da fachada da padaria",
    legenda: "Rocambole na porta da padaria",
  },
  {
    src: paoRecheado,
    alt: "Atendente com o avental do brasão da padaria segurando um pão recheado do tamanho do antebraço",
    legenda: "Pão recheado, feito para dividir",
  },
  {
    src: paesDocesBalcao,
    alt: "Pães doces polvilhados de açúcar com recheio de goiabada, em primeiro plano no balcão",
    legenda: "Os doces do balcão",
  },
];
