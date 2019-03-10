import * as config from "../../config/i18n";

const translationLoader = {
  type: "backend",
  init: () => {},
  read: function(language, namespace, callback) {
    let resource,
      error = null;
    console.log("===============>into translationLoader");
    console.log("language=" + language);
    console.log("namespace=" + namespace);
    console.log("callback=" + JSON.stringify(callback));

    try {
      resource = config.supportedLocales[language].translationFileLoader()[
        namespace
      ];
      console.log("<<===============return translationLoader");
    } catch (_error) {
      error = _error;
    }

    callback(error, resource);
  }
};

export default translationLoader;
