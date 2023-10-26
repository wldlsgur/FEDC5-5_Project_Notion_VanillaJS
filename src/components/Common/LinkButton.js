import { SELECTOR } from "../../constants/selector.js";
import { TAG } from "../../constants/tag.js";
import { navigate } from "../../routes/router.js";
import { createCustomElement } from "../../utils/dom.js";

export default function LinkButton({ linkUrl, text }) {
  const $linkButton = createCustomElement({
    tag: TAG.BUTTON,
    props: {
      className: SELECTOR.DOCUMENT.LINKED_BTN,
      textContent: text,
    },
  });

  $linkButton.addEventListener("click", () => {
    navigate(linkUrl);
  });

  return $linkButton;
}
