export type IngredientType =
  | "coffee"
  | "milk"
  | "water"
  | "foam"
  | "syrup"
  | "ice"
  | "solid";

export type AnimationType =
  | "pour"
  | "fill"
  | "expand"
  | "drop"
  | "swirl"
  | "stack"
  | "none";

export type CoffeeIngredient = {
  id: string;
  name: string;
  percentage: number;
  type: IngredientType;

  /**
   * Determines the visual stacking order inside the cup.
   * Lower numbers render closer to the bottom.
   */
  layer: number;

  /**
   * Controls how this ingredient enters or behaves
   * during the animation.
   */
  animation: AnimationType;

  /**
   * Optional visual metadata for the SVG renderer.
   */
  color: string;
  opacity?: number;

  /**
   * Optional ingredient metadata.
   */
  description?: string;
};

export type Coffee = {
  id: string;
  name: string;
  category:
    | "black"
    | "milk"
    | "iced"
    | "specialty";

  description: string;

  /**
   * Approximate serving size used by the
   * quantity calculator.
   */
  defaultSizeMl: number;

  ingredients: CoffeeIngredient[];
};

/* -------------------------------------------------------------------------- */
/* Ingredients                                                                */
/* -------------------------------------------------------------------------- */

export const coffees: Coffee[] = [
  {
    id: "espresso",
    name: "Espresso",
    category: "black",
    description: "A concentrated shot of espresso.",
    defaultSizeMl: 30,

    ingredients: [
      {
        id: "espresso",
        name: "Espresso",
        percentage: 100,
        type: "coffee",
        layer: 1,
        animation: "pour",
        color: "#4A2414",
        description: "A concentrated espresso shot.",
      },
    ],
  },

  {
    id: "doppio",
    name: "Doppio",
    category: "black",
    description: "A double shot of espresso.",
    defaultSizeMl: 60,

    ingredients: [
      {
        id: "espresso",
        name: "Espresso",
        percentage: 100,
        type: "coffee",
        layer: 1,
        animation: "pour",
        color: "#4A2414",
        description: "Two shots of espresso.",
      },
    ],
  },

  {
    id: "americano",
    name: "Americano",
    category: "black",
    description: "Espresso diluted with hot water.",
    defaultSizeMl: 180,

    ingredients: [
      {
        id: "water",
        name: "Hot Water",
        percentage: 70,
        type: "water",
        layer: 1,
        animation: "pour",
        color: "#B7A18A",
      },
      {
        id: "espresso",
        name: "Espresso",
        percentage: 30,
        type: "coffee",
        layer: 2,
        animation: "pour",
        color: "#4A2414",
      },
    ],
  },

  {
    id: "long-black",
    name: "Long Black",
    category: "black",
    description: "Hot water with espresso poured over it.",
    defaultSizeMl: 180,

    ingredients: [
      {
        id: "water",
        name: "Hot Water",
        percentage: 70,
        type: "water",
        layer: 1,
        animation: "pour",
        color: "#B7A18A",
      },
      {
        id: "espresso",
        name: "Espresso",
        percentage: 30,
        type: "coffee",
        layer: 2,
        animation: "pour",
        color: "#4A2414",
      },
    ],
  },

  {
    id: "macchiato",
    name: "Macchiato",
    category: "milk",
    description: "Espresso marked with a small amount of milk and foam.",
    defaultSizeMl: 60,

    ingredients: [
      {
        id: "espresso",
        name: "Espresso",
        percentage: 70,
        type: "coffee",
        layer: 1,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "milk",
        name: "Steamed Milk",
        percentage: 20,
        type: "milk",
        layer: 2,
        animation: "pour",
        color: "#E7D6BC",
      },
      {
        id: "foam",
        name: "Milk Foam",
        percentage: 10,
        type: "foam",
        layer: 3,
        animation: "expand",
        color: "#FFF7E8",
      },
    ],
  },

  {
    id: "cortado",
    name: "Cortado",
    category: "milk",
    description: "Espresso balanced with a roughly equal amount of steamed milk.",
    defaultSizeMl: 120,

    ingredients: [
      {
        id: "espresso",
        name: "Espresso",
        percentage: 50,
        type: "coffee",
        layer: 1,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "milk",
        name: "Steamed Milk",
        percentage: 45,
        type: "milk",
        layer: 2,
        animation: "pour",
        color: "#E7D6BC",
      },
      {
        id: "foam",
        name: "Milk Foam",
        percentage: 5,
        type: "foam",
        layer: 3,
        animation: "expand",
        color: "#FFF7E8",
      },
    ],
  },

  {
    id: "flat-white",
    name: "Flat White",
    category: "milk",
    description: "Espresso with steamed milk and a thin layer of microfoam.",
    defaultSizeMl: 180,

    ingredients: [
      {
        id: "espresso",
        name: "Espresso",
        percentage: 30,
        type: "coffee",
        layer: 1,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "milk",
        name: "Steamed Milk",
        percentage: 60,
        type: "milk",
        layer: 2,
        animation: "pour",
        color: "#E7D6BC",
      },
      {
        id: "foam",
        name: "Microfoam",
        percentage: 10,
        type: "foam",
        layer: 3,
        animation: "expand",
        color: "#FFF7E8",
      },
    ],
  },

  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "milk",
    description: "Espresso, steamed milk and a generous layer of milk foam.",
    defaultSizeMl: 180,

    ingredients: [
      {
        id: "espresso",
        name: "Espresso",
        percentage: 30,
        type: "coffee",
        layer: 1,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "milk",
        name: "Steamed Milk",
        percentage: 45,
        type: "milk",
        layer: 2,
        animation: "pour",
        color: "#E7D6BC",
      },
      {
        id: "foam",
        name: "Milk Foam",
        percentage: 25,
        type: "foam",
        layer: 3,
        animation: "expand",
        color: "#FFF7E8",
      },
    ],
  },

  {
    id: "latte",
    name: "Latte",
    category: "milk",
    description: "Espresso with a large amount of steamed milk and a thin foam layer.",
    defaultSizeMl: 300,

    ingredients: [
      {
        id: "espresso",
        name: "Espresso",
        percentage: 20,
        type: "coffee",
        layer: 1,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "milk",
        name: "Steamed Milk",
        percentage: 65,
        type: "milk",
        layer: 2,
        animation: "pour",
        color: "#E7D6BC",
      },
      {
        id: "foam",
        name: "Milk Foam",
        percentage: 15,
        type: "foam",
        layer: 3,
        animation: "expand",
        color: "#FFF7E8",
      },
    ],
  },

  {
    id: "mocha",
    name: "Mocha",
    category: "specialty",
    description: "Espresso, chocolate, steamed milk and milk foam.",
    defaultSizeMl: 300,

    ingredients: [
      {
        id: "chocolate",
        name: "Chocolate",
        percentage: 10,
        type: "syrup",
        layer: 1,
        animation: "swirl",
        color: "#32150D",
      },
      {
        id: "espresso",
        name: "Espresso",
        percentage: 20,
        type: "coffee",
        layer: 2,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "milk",
        name: "Steamed Milk",
        percentage: 55,
        type: "milk",
        layer: 3,
        animation: "pour",
        color: "#E7D6BC",
      },
      {
        id: "foam",
        name: "Milk Foam",
        percentage: 15,
        type: "foam",
        layer: 4,
        animation: "expand",
        color: "#FFF7E8",
      },
    ],
  },

  {
    id: "breve",
    name: "Breve",
    category: "milk",
    description: "Espresso prepared with steamed half-and-half and foam.",
    defaultSizeMl: 240,

    ingredients: [
      {
        id: "espresso",
        name: "Espresso",
        percentage: 20,
        type: "coffee",
        layer: 1,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "milk",
        name: "Half-and-Half",
        percentage: 65,
        type: "milk",
        layer: 2,
        animation: "pour",
        color: "#E8D3B5",
      },
      {
        id: "foam",
        name: "Milk Foam",
        percentage: 15,
        type: "foam",
        layer: 3,
        animation: "expand",
        color: "#FFF7E8",
      },
    ],
  },

  {
    id: "iced-latte",
    name: "Iced Latte",
    category: "iced",
    description: "Espresso, cold milk and ice.",
    defaultSizeMl: 300,

    ingredients: [
      {
        id: "ice",
        name: "Ice",
        percentage: 10,
        type: "ice",
        layer: 1,
        animation: "drop",
        color: "#DCEAF2",
        opacity: 0.7,
      },
      {
        id: "espresso",
        name: "Espresso",
        percentage: 20,
        type: "coffee",
        layer: 2,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "milk",
        name: "Cold Milk",
        percentage: 70,
        type: "milk",
        layer: 3,
        animation: "pour",
        color: "#E7D6BC",
      },
    ],
  },

  {
    id: "iced-americano",
    name: "Iced Americano",
    category: "iced",
    description: "Espresso, cold water and ice.",
    defaultSizeMl: 300,

    ingredients: [
      {
        id: "ice",
        name: "Ice",
        percentage: 30,
        type: "ice",
        layer: 1,
        animation: "drop",
        color: "#DCEAF2",
        opacity: 0.7,
      },
      {
        id: "water",
        name: "Cold Water",
        percentage: 45,
        type: "water",
        layer: 2,
        animation: "pour",
        color: "#B7A18A",
      },
      {
        id: "espresso",
        name: "Espresso",
        percentage: 25,
        type: "coffee",
        layer: 3,
        animation: "pour",
        color: "#4A2414",
      },
    ],
  },

  {
    id: "affogato",
    name: "Affogato",
    category: "specialty",
    description: "Vanilla ice cream topped with a shot of hot espresso.",
    defaultSizeMl: 120,

    ingredients: [
      {
        id: "ice-cream",
        name: "Vanilla Ice Cream",
        percentage: 70,
        type: "solid",
        layer: 1,
        animation: "stack",
        color: "#FFF4D6",
      },
      {
        id: "espresso",
        name: "Espresso",
        percentage: 30,
        type: "coffee",
        layer: 2,
        animation: "pour",
        color: "#4A2414",
      },
    ],
  },

  {
    id: "irish-coffee",
    name: "Irish Coffee",
    category: "specialty",
    description: "Coffee with whiskey, sugar and a layer of cream.",
    defaultSizeMl: 240,

    ingredients: [
      {
        id: "sugar",
        name: "Sugar",
        percentage: 5,
        type: "syrup",
        layer: 1,
        animation: "swirl",
        color: "#D4A94F",
      },
      {
        id: "coffee",
        name: "Coffee",
        percentage: 55,
        type: "coffee",
        layer: 2,
        animation: "pour",
        color: "#4A2414",
      },
      {
        id: "whiskey",
        name: "Whiskey",
        percentage: 15,
        type: "water",
        layer: 3,
        animation: "pour",
        color: "#B9792B",
      },
      {
        id: "cream",
        name: "Cream",
        percentage: 25,
        type: "foam",
        layer: 4,
        animation: "expand",
        color: "#FFF7E8",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Calculate the approximate volume of an ingredient
 * based on the selected cup size.
 */
export const getIngredientVolume = (
  ingredient: CoffeeIngredient,
  cupSizeMl: number,
): number => {
  return Math.round((ingredient.percentage / 100) * cupSizeMl);
};

/**
 * Return a coffee by its ID.
 */
export const getCoffee = (id: string): Coffee | undefined => {
  return coffees.find((coffee) => coffee.id === id);
};

/**
 * Return ingredients ordered according to their
 * visual stacking layer.
 */
export const getIngredientsByLayer = (
  coffee: Coffee,
): CoffeeIngredient[] => {
  return [...coffee.ingredients].sort(
    (a, b) => a.layer - b.layer,
  );
};

/**
 * Calculate the total percentage of a recipe.
 * Useful for validating the data.
 */
export const getTotalPercentage = (coffee: Coffee): number => {
  return coffee.ingredients.reduce(
    (total, ingredient) => total + ingredient.percentage,
    0,
  );
};

/**
 * Check whether a recipe has a valid 100% composition.
 */
export const isValidCoffee = (coffee: Coffee): boolean => {
  return getTotalPercentage(coffee) === 100;
};