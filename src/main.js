import App from "./App.js";
import { SELECTOR } from "./constants/selector.js";
import { $ } from "./utils/dom.js";

const $app = $(`#${SELECTOR.ROOT}`);

try {
  new App({ $target: $app });
} catch (error) {
  console.error(error.message);
}
