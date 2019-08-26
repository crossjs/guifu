import Loading from "framework/components/interaction/Loading";
import React from "react";

const initialStates = {
  themeType: "light",
  role: "",
  lng: "zh",
};

export default {
  version: "0.0.1",
  plugins: {
    i18n: {
      fallbackLng: initialStates.lng,
    },
    store: {
      initialStates,
    },
    theme: {
      logoImage: require("images/logo.png"),
      siteTitle: "guifu",
    },
    lazy: {
      fallback: <Loading />,
    },
    router: {
      NotFound: require("framework/components/exception/NotFound").default,
      Forbidden: require("framework/components/exception/Forbidden").default,
    },
  },
};
