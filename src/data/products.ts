export interface Product {
  slug: string;
  name: string;
  edition: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  storyTitle: string;
  story: string;
  craftSections: {
    title: string;
    text: string;
  }[];
  ritualGuide: {
    step: string;
    title: string;
    description: string;
  }[];
  details: {
    label: string;
    value: string;
  }[];
  images: string[];
  whatsappMessage: string;
}

export const products: Product[] = [
  {
    slug: "torpedo-crudo",
    name: "Torpedo Crudo",
    edition: "Cosido al Tiento con Virola al Lacre",
    price: 50000,
    shortDescription:
      "Mate torpedo de calabaza cruda cosida al tiento con virola al lacre. El clásico rosarino con el sello RioMates.",
    fullDescription:
      "El Torpedo Crudo captura la esencia de la Costanera en un mate torpedo de calabaza cruda, cosido al tiento con virola al lacre. Cada puntada es hecha a mano, cada detalle refleja la paciencia del artesano que entiende que lo bueno lleva tiempo.",
    storyTitle: "Nacido en la orilla",
    story: `Este mate nació de una tarde de noviembre en la Costanera de Rosario. El sol caía bajo sobre el Paraná, tiñendo el agua de tonos que van del ámbar al cobre.

La calabaza fue seleccionada a mano. El tiento, cortado y cosido con la paciencia de quien sabe que cada puntada cuenta. La virola al lacre le da ese carácter único: la combinación de lo rústico con lo refinado.

Cada Torpedo Crudo es único. Como cada atardecer sobre el agua.`,
    craftSections: [
      {
        title: "La calabaza",
        text: "Calabaza cruda seleccionada a mano. Sin acelerar el proceso natural. Cada una tiene su forma, su textura, su historia.",
      },
      {
        title: "El cosido al tiento",
        text: "Técnica artesanal donde el tiento se cose a mano creando un envolvente funcional y estético. Cada puntada es un acto de paciencia.",
      },
      {
        title: "La virola al lacre",
        text: "La terminación en lacre aporta un detalle de carácter: une lo rústico de la calabaza con la elegancia del metal.",
      },
    ],
    ritualGuide: [
      {
        step: "01",
        title: "Curá tu calabaza",
        description: "Seguí nuestra guía de cura para preparar la calabaza correctamente.",
      },
      {
        step: "02",
        title: "Cebá con calma",
        description: "Agua a 75-80°C. No quemes la yerba.",
      },
      {
        step: "03",
        title: "Disfrutá el momento",
        description: "Cada mate es una pausa.",
      },
    ],
    details: [
      { label: "Tipo", value: "Torpedo" },
      { label: "Material", value: "Calabaza cruda, tiento, virola al lacre" },
      { label: "Capacidad", value: "~350ml" },
      { label: "Origen", value: "Rosario, Santa Fe" },
      { label: "Cuidado", value: "No lavar con jabón. Secar al aire." },
      { label: "Entrega", value: "Rosario: 24-48hs. Interior: 5-7 días." },
    ],
    images: [
      "/images/products/mate-cuero-oscuro-solo.jpeg",
    ],
    whatsappMessage: "Hola! Me interesa el mate Torpedo Crudo — Cosido al Tiento con Virola al Lacre",
  },
  {
    slug: "torpedo-criollo",
    name: "Torpedo Criollo",
    edition: "Crudo Cosido al Tiento con Virola al Lacre",
    price: 55000,
    shortDescription:
      "Mate torpedo criollo de calabaza cruda cosido al tiento con virola al lacre. La pieza más premium del catálogo RioMates.",
    fullDescription:
      "El Torpedo Criollo es nuestra pieza insignia. Calabaza cruda seleccionada, cosida al tiento con virola al lacre. Cada detalle refleja la dedicación artesanal que define a RioMates.",
    storyTitle: "La pieza insignia",
    story: `El Torpedo Criollo es lo que hacemos cuando no hay límite de tiempo ni de esfuerzo. Cada calabaza es seleccionada con el criterio de quien sabe que solo lo mejor es suficiente.

El cosido al tiento es un trabajo de paciencia infinita. Cada puntada, cada nudo, cada terminación es hecha a mano con la calma de quien entiende que la calidad no se apura.

La virola al lacre es el sello final: une todo en una pieza que es más que la suma de sus partes.`,
    craftSections: [
      {
        title: "Calabaza premium",
        text: "Solo las calabazas que pasan nuestro criterio más exigente llegan a ser Torpedo Criollo. Forma, grosor, textura: todo debe ser perfecto.",
      },
      {
        title: "Técnica criolla",
        text: "El cosido al tiento criollo es una técnica tradicional que requiere años de práctica. Cada puntada es un acto de maestría artesanal.",
      },
    ],
    ritualGuide: [
      {
        step: "01",
        title: "Prepará el terreno",
        description: "La cura de un Torpedo Criollo merece atención especial.",
      },
      {
        step: "02",
        title: "Cebá con respeto",
        description: "Esta pieza merece tu mejor yerba y tu mejor agua.",
      },
      {
        step: "03",
        title: "Disfrutá la excelencia",
        description: "Cada sorbo es un recordatorio de que lo bueno existe.",
      },
    ],
    details: [
      { label: "Tipo", value: "Torpedo Criollo" },
      { label: "Material", value: "Calabaza cruda premium, tiento, virola al lacre" },
      { label: "Capacidad", value: "~350ml" },
      { label: "Origen", value: "Rosario, Santa Fe" },
      { label: "Cuidado", value: "No lavar con jabón. Secar al aire." },
      { label: "Entrega", value: "Rosario: 24-48hs. Interior: 5-7 días." },
    ],
    images: [
      "/images/products/mate-encuentro-bombilla.jpeg",
    ],
    whatsappMessage: "Hola! Me interesa el mate Torpedo Criollo — Cosido al Tiento con Virola al Lacre",
  },
  {
    slug: "imperial-crudo",
    name: "Imperial Crudo",
    edition: "Con Base de Alpaca y Bronce",
    price: 50000,
    shortDescription:
      "Mate imperial de calabaza cruda con base de alpaca y detalles en bronce. Pieza de edición limitada con el sello artesanal RioMates.",
    fullDescription:
      "El Imperial Crudo celebra esa conversación entre el río y la tierra. Mate imperial de calabaza cruda con base de alpaca y bronce, una combinación que une la rusticidad de la calabaza con la nobleza del metal trabajado a mano.",
    storyTitle: "Donde dos orillas se encuentran",
    story: `Hay momentos en que el río y la tierra se encuentran sin fronteras. En esas orillas, donde el agua lame la tierra y la tierra contiene al agua, nace la idea de este mate.

El Imperial Crudo es nuestra pieza más exclusiva. La base de alpaca y bronce es trabajada pieza por pieza, con el cuidado de quien sabe que el metal noble merece un trabajo a la altura.

Solo producimos unas pocas unidades por mes. Porque lo bueno lleva tiempo.`,
    craftSections: [
      {
        title: "Edición limitada",
        text: "Cada Imperial Crudo lleva semanas de trabajo artesanal. La base de alpaca y bronce requiere un trabajo de precisión que no se puede acelerar.",
      },
      {
        title: "La base de alpaca y bronce",
        text: "La alpaca y el bronce se combinan para crear una base que protege la calabaza y eleva la pieza. Cada detalle es trabajado a mano.",
      },
      {
        title: "Terminaciones",
        text: "Los detalles en bronce complementan el tono cálido de la calabaza cruda. Un equilibrio entre lo rústico y lo refinado.",
      },
    ],
    ritualGuide: [
      {
        step: "01",
        title: "Seleccioná el momento",
        description: "El Imperial Crudo es un mate para ocasiones especiales.",
      },
      {
        step: "02",
        title: "Curá con dedicación",
        description: "Seguí la guía de cura paso a paso.",
      },
      {
        step: "03",
        title: "Compartilo",
        description: "El mejor mate es el que se comparte.",
      },
    ],
    details: [
      { label: "Tipo", value: "Imperial" },
      { label: "Material", value: "Calabaza cruda, alpaca, bronce" },
      { label: "Capacidad", value: "~400ml" },
      { label: "Origen", value: "Rosario, Santa Fe" },
      { label: "Edición", value: "Limitada" },
      { label: "Entrega", value: "Rosario: 24-48hs. Interior: 5-7 días." },
    ],
    images: [
      "/images/products/mate-parana-patas-doradas.jpeg",
    ],
    whatsappMessage: "Hola! Me interesa el mate Imperial Crudo — Con Base de Alpaca y Bronce",
  },
  {
    slug: "criollo",
    name: "Criollo",
    edition: "Con Base Cosida al Tiento",
    price: 22000,
    shortDescription:
      "Mate criollo con base cosida al tiento. Diseño puro y minimalista. El sol que se despide sobre el Paraná en su forma más esencial.",
    fullDescription:
      "Minimalismo con alma. El Criollo es la esencia del mate RioMates: calabaza natural, base cosida al tiento a mano, y nada más. Para quienes entienden que la belleza está en lo esencial.",
    storyTitle: "El sol que se despide",
    story: `El Criollo es nuestro mate más puro. Sin adornos, sin artificios. Solo calabaza y tiento, como fue siempre.

La inspiración vino de mirar el sol caer sobre el Paraná una y otra vez. Cada tarde, el mismo espectáculo, siempre distinto. La simplicidad de ese momento es lo que buscamos en este mate: que lo esencial sea suficiente.

La calabaza se muestra en su estado más natural. La base cosida al tiento es el único adorno. Porque a veces, menos es todo.`,
    craftSections: [
      {
        title: "Calabaza natural",
        text: "La calabaza del Criollo se muestra sin cobertura, en su estado más puro. Solo una cura cuidadosa para protegerla sin alterar su naturaleza.",
      },
      {
        title: "Base cosida al tiento",
        text: "La base es cosida a mano con tiento, creando un envolvente orgánico y único. Cada Criollo tiene su propio carácter.",
      },
    ],
    ritualGuide: [
      {
        step: "01",
        title: "Curá simple",
        description: "La cura es directa. Seguí nuestra guía para el mejor resultado.",
      },
      {
        step: "02",
        title: "Usalo todos los días",
        description: "El Criollo es un mate de uso diario.",
      },
      {
        step: "03",
        title: "Dejalo secar al sol",
        description: "Después de usarlo, aire y sol.",
      },
    ],
    details: [
      { label: "Tipo", value: "Criollo" },
      { label: "Material", value: "Calabaza, tiento cosido a mano" },
      { label: "Capacidad", value: "~300ml" },
      { label: "Origen", value: "Rosario, Santa Fe" },
      { label: "Cuidado", value: "Secar al sol después de cada uso." },
      { label: "Entrega", value: "Rosario: 24-48hs. Interior: 5-7 días." },
    ],
    images: [
      "/images/products/mate-madera-silver.jpeg",
    ],
    whatsappMessage: "Hola! Me interesa el mate Criollo — Con Base Cosida al Tiento",
  },
  {
    slug: "imperial-algarrobo",
    name: "Imperial de Algarrobo",
    edition: "Con Virola de Alpaca",
    price: 22000,
    shortDescription:
      "Mate imperial de madera de algarrobo con virola de alpaca. Una pieza única que combina la calidez de la madera nativa con la nobleza del metal.",
    fullDescription:
      "El Imperial de Algarrobo es nuestra apuesta por la madera nativa. El algarrobo, noble y resistente, se transforma en un mate imperial coronado con una virola de alpaca trabajada a mano.",
    storyTitle: "La nobleza del algarrobo",
    story: `El algarrobo es el árbol de nuestra tierra. Resistente, noble, con una calidez que solo la madera nativa puede dar.

Este mate nace de respetar ese material. Cada pieza es torneada y pulida a mano, hasta que la madera muestra su veta más hermosa. La virola de alpaca corona el conjunto: lo rústico y lo refinado en perfecta armonía.

Una pieza para quienes valoran lo autóctono.`,
    craftSections: [
      {
        title: "Madera de algarrobo",
        text: "Algarrobo nativo seleccionado por su veta y resistencia. Cada pieza es torneada y pulida a mano hasta lograr la textura perfecta.",
      },
      {
        title: "Virola de alpaca",
        text: "La terminación en alpaca aporta un contraste elegante que eleva la pieza. Trabajada a mano con los mismos estándares que nuestros mates de calabaza.",
      },
    ],
    ritualGuide: [
      {
        step: "01",
        title: "Prepará la madera",
        description: "La cura del algarrobo es simple: enjuagá con agua tibia y dejá secar.",
      },
      {
        step: "02",
        title: "Cebá con tranquilidad",
        description: "La madera responde mejor con agua a temperatura moderada.",
      },
      {
        step: "03",
        title: "Mantenelo seco",
        description: "Después de usarlo, dejalo secar al aire libre.",
      },
    ],
    details: [
      { label: "Tipo", value: "Imperial" },
      { label: "Material", value: "Madera de algarrobo, virola de alpaca" },
      { label: "Capacidad", value: "~350ml" },
      { label: "Origen", value: "Rosario, Santa Fe" },
      { label: "Cuidado", value: "No sumergir en agua. Secar al aire." },
      { label: "Entrega", value: "Rosario: 24-48hs. Interior: 5-7 días." },
    ],
    images: [
      "/images/products/mates-madera-duo.jpeg",
    ],
    whatsappMessage: "Hola! Me interesa el mate Imperial de Algarrobo — Con Virola de Alpaca",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
