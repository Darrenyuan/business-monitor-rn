import moment from "moment";
import "moment/min/locales";
import momentZh from "moment/src/locale/zh-cn";
export const fallback = "en";

export const supportedLocales = {
  en: {
    name: "English",
    translationFileLoader: () => require("../lang/en.json"),

    // en is default locale in Moment
    momentLocaleLoader: () => Promise.resolve()
  },
  zh: {
    name: "中文",
    translationFileLoader: () => require("../lang/zh.json"),
    momentLocaleLoader: () => {
      moment.locale("zh", momentZh);
      return Promise.resolve();
    }
  }
};

export const defaultNamespace = "common";

export const namespaces = [
  "common",
  "lists",
  "index",
  "issuesScreen",
  "projectsScreen",
  "login"
];
