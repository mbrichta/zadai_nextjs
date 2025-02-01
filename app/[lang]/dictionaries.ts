import "server-only";

const dictionaries: any = {
  "en-US": () =>
    import("../../dictionaries/en.json").then((module) => module.default),
  "de-DE": () =>
    import("../../dictionaries/de.json").then((module) => module.default),
  "es-ES": () =>
    import("../../dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale]();
};
