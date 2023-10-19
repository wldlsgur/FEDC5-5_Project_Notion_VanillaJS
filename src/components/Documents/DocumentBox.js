import { request } from "../../utils/request.js";
import DocumentList from "./DocumentList.js";

export default function DocumentBox({ $target }) {
  const $documentBox = document.createElement("div");
  $documentBox.className = "document-box";

  const documentList = new DocumentList({
    $target: $documentBox,
    initialState: [],
    onClick: async ({ parent, title }) => {
      await request("/documents", {
        method: "POST",
        body: JSON.stringify({ parent, title }),
      });
      this.setState();
    },
  });
  this.setState = async () => {
    const documents = await request("/documents");
    docsList.setState(documents);
  };

  this.render = () => {
    $target.appendChild($documentBox);
  };
}
