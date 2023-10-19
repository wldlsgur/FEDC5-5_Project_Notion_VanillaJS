import { push } from "../../utils/router.js";

export default function DocumentList({ $target, initialState, onClick }) {
  const $documentList = document.createElement("div");

  $documentList.className = "document-list";
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.setDepth = (documentList) => {
    const depth = `
      <ul class=${hide ? "hidden" : ""}>
        ${documentList
          .map((doc) => {
            return `<li data-id=${doc.id}> ${doc.title} <button> + </button> </li>
              ${doc.documents && doc.documents.length > 0 ? this.setDepth(doc.documents, !this.state.selectedDocument.has(`${doc.id}`)) : ""}
            `;
          })
          .join("")}
      </ul>
    `;
    return depth;
  };

  this.render = () => {
    $documentList.innerHTML = "";
    if (this.state.document && this.state.document.length > 0) {
      $documentList.innerHTML = this.setDepth(this.state) + `<button name="addButton" id="newPage"> 새 페이지 생성 </button>`;
    } else {
      $documentList.innerHTML = `
        <button name="addButton" id="newPage"> 새 페이지 생성 </button>
      `;
    }
  };

  $documentList.addEventListener("click", (e) => {
    const { target } = e;
    const Untitle = "제목 없음";
    const $li = target.closest("li");
    const id = $li?.dataset.id;

    if (target.tagName === "BUTTON") {
      if ($li) {
        const { id } = $li.dataset;
        onClick({ parent: id, title: Untitle });
      } else {
        onClick({ parent: null, title: Untitle });
      }
    } else if (target.tagName === "LI") {
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }
  });
}
