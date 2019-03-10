import Expo from "expo";
import { Localization } from "expo";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: callback => {
    return (
      Localization.getLocalizationAsync()

        // We will get back a string like "en_US". We
        // return a string like "en" to match our language
        // files.
        .then(localizationData => {
          let lng = localizationData.locale;
          let exactLng = lng.split("-")[0];
          console.log(JSON.stringify(localizationData));
          console.log("exact short langueage:" + exactLng);
          callback(exactLng);
        })
    );
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

export default languageDetector;
