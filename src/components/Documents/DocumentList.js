export default function DocumentList({ $target, initialState }) {
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
            return `<li data-id=${doc.id}> ${doc.title} </li>
              ${doc.documents && doc.documents.length > 0 ? this.setDepth(doc.documents) : ""}
            `;
          })
          .join("")}
      </ul>
    `;
    return depth;
  };

  this.render = () => {
    if (this.state.length > 0) {
      $documentList.innerHTML = this.setDepth(this.state.document);
    } else {
      $documentList.innerHTML = `
        <span id="emptyPage"> 페이지가 없습니다 :( </span>
      `;
    }
  };
}
