const { default: dynamic } = require("next/dynamic");

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>LOADING.......</p>,
  ssr: false,
});

export default Map;
