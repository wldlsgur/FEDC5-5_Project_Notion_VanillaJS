import EditorPage from "./EditorPage.js";
import { request } from "../../utils/request.js";

export default function EditorBox({ $target }) {
  const $editorBox = document.createElement("main");
  $editorBox.className = "editor-box";

  const $editor = new EditorPage({
    $target: $editorBox,
  });

  this.setState = async (selectedDoc) => {
    const id = selectedDoc?.id;

    if (!id) {
      this.state = { id: "new" };
      $editor.setState({ title: "", content: "" });
    } else {
      this.state = selectedDoc;
      const doc = await request(`/documents/${id}`);
      $editor.setState(doc);
    }
  };

  this.render = () => {
    $target.appendChild($editorContainer);
  };
}
