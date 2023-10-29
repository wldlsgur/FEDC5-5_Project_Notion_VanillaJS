import { SELECTOR } from "../../constants/selector.js";
import { TAG } from "../../constants/tag.js";
import { PATH } from "../../routes/path.js";
import { navigate } from "../../routes/router.js";
import {
  deleteDocument,
  getAllDocuments,
  postDocument,
} from "../../service/documents.js";
import { $, createCustomElement, createDocumentTree } from "../../utils/dom.js";

export default function DocumentList({ $target, state, navigateToDocument }) {
  const $documentList = createCustomElement({
    tag: TAG.UL,
    props: { id: SELECTOR.DOCUMENT.LIST },
  });

  $target.appendChild($documentList);

  this.state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = "";

    if (this.state && this.state.length > 0) {
      this.state.forEach((node) => {
        const $documentTree = createDocumentTree(node, navigateToDocument);
        $documentList.appendChild($documentTree);
      });
    }
  };

  this.fetchAllDocuments = async () => {
    const documentList = await getAllDocuments();
    this.setState(documentList);
  };

  $documentList.addEventListener("click", async (event) => {
    if (event.target == null) return;

    const $documentDiv = event.target.closest(`#${SELECTOR.DOCUMENT.ITEM}`);
    const { id } = $documentDiv.dataset;

    if (
      event.target.id === SELECTOR.DOCUMENT.TITLE_GROUP ||
      event.target.id === SELECTOR.DOCUMENT.TITLE
    ) {
      navigateToDocument(id);
      return;
    }

    const $button = event.target.closest(TAG.BUTTON);

    if ($button == null) return;

    const buttonId = $button.id;

    if (buttonId === SELECTOR.DOCUMENT.EXPAND_BTN) {
      const $documentTree = event.target.closest(`#${SELECTOR.DOCUMENT.TREE}`);
      const $childrenElement = $(
        `#${SELECTOR.DOCUMENT.CHIDREN}`,
        $documentTree
      );

      $childrenElement.classList.toggle("hide");
      $button.classList.toggle("rotate");
      return;
    }

    if (buttonId === SELECTOR.DOCUMENT.ADD_BTN) {
      const createdPost = await postDocument({ title: "", parent: id });
      navigate(`${PATH.DOCUMENTS}/${createdPost.id}`);

      this.fetchAllDocuments();

      return;
    }

    if (buttonId === SELECTOR.DOCUMENT.DELTE_BTN) {
      if (confirm("정말 삭제하시겠습니까?")) {
        await deleteDocument(id);
        navigate("/");

        this.fetchAllDocuments();
      }
    }
  });

  this.fetchAllDocuments();
}
