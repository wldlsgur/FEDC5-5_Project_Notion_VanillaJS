import App from "./App.js";
import { SELECTOR } from "./src/constants/selector.js";
import { $ } from "./src/utils/dom.js";

const $app = $(SELECTOR.ROOT);

try {
  new App({ $target: $app });
} catch (error) {
  console.error(error.message);
}
