import SideBar from "./src/components/Sidebar.js";
import { SELECTOR } from "./src/constants/selector.js";
import DocumentEditPage from "./src/pages/DocumentEditPage.js";
import { PATH } from "./src/routes/path.js";
import { initRouter, navigate } from "./src/routes/router.js";
import { getAllDocuments } from "./src/service/documents.js";
import { $ } from "./src/utils/dom.js";

export default function App({ $target }) {
  const $sideBar = new SideBar({
    $target,
    navigateToDocument: (id) => {
      navigate(`${PATH.DOCUMENTS}/${id}`, { id });
    },
  });

  const $documentEditPage = new DocumentEditPage({
    $target,
    updateAllDocuments: async () => {
      const documentList = await getAllDocuments();
      $sideBar.setState(documentList);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    const $editPageElement = $(`#${SELECTOR.EDIT.SECTION}`);
    $editPageElement.style.display = "none";

    if (pathname.indexOf(PATH.DOCUMENTS) === 0) {
      const [, , id] = pathname.split("/");
      $documentEditPage.setState({ id });
    }
  };

  this.route();

  initRouter(() => this.route());
}
