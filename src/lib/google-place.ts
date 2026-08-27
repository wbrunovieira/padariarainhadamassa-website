import { site } from "./site";

export type PlaceStats = {
  rating: number;
  count: number;
  /** true quando o número veio da API agora; false quando é o valor de reserva */
  live: boolean;
};

const fallback: PlaceStats = {
  rating: site.rating.value,
  count: site.rating.count,
  live: false,
};

const FIELDS = "rating,userRatingCount";
const REVALIDATE = 60 * 60 * 12; // 12h

/**
 * Lê a nota e o total de avaliações direto do Google.
 *
 * Sem `GOOGLE_PLACES_API_KEY` no ambiente, devolve os valores fixos de
 * site.ts — o site continua funcionando, só não atualiza sozinho.
 * Com `GOOGLE_PLACE_ID` a consulta é direta; sem ele, resolve pelo nome
 * e endereço.
 */
export async function getPlaceStats(): Promise<PlaceStats> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return fallback;

  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const data = placeId
      ? await fetchPlaceDetails(key, placeId)
      : await searchPlace(key);

    if (typeof data?.rating !== "number" || typeof data?.userRatingCount !== "number") {
      return fallback;
    }
    return { rating: data.rating, count: data.userRatingCount, live: true };
  } catch {
    return fallback;
  }
}

type PlacePayload = { rating?: number; userRatingCount?: number };

async function fetchPlaceDetails(key: string, placeId: string): Promise<PlacePayload | null> {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR`,
    {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELDS },
      next: { revalidate: REVALIDATE },
    },
  );
  return res.ok ? ((await res.json()) as PlacePayload) : null;
}

async function searchPlace(key: string): Promise<PlacePayload | null> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": `places.id,places.${FIELDS.split(",").join(",places.")}`,
    },
    body: JSON.stringify({
      textQuery: `${site.name}, ${site.street}, ${site.city} - ${site.state}`,
      languageCode: "pt-BR",
      maxResultCount: 1,
    }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { places?: PlacePayload[] };
  return json.places?.[0] ?? null;
}

export const formatRating = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
