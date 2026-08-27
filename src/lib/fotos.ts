import type { StaticImageData } from "next/image";

import carreSuino from "@/assets/fotos/carre-suino.jpg";
import fachada from "@/assets/fotos/fachada.jpg";
import feijoada from "@/assets/fotos/feijoada.jpg";
import paesDoces from "@/assets/fotos/paes-doces.jpg";
import paesFranceses from "@/assets/fotos/paes-franceses.jpg";
import paoGratinado from "@/assets/fotos/pao-gratinado-cafe.jpg";
import paoRecheado from "@/assets/fotos/pao-recheado.jpg";
import pratoDoDia from "@/assets/fotos/prato-do-dia.jpg";
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
    alt: "Prato do dia em embalagem para viagem: frango ensopado, polenta, arroz e couve refogada",
    legenda: "Prato do dia, pronto para levar",
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
    src: fachada,
    alt: "Fachada da padaria, com toldo verde e a bandeira roxa com o brasão da Rainha da Massa",
    legenda: "A fachada da padaria",
  },
];
