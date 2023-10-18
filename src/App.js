import DocumentBox from "./components/Documents/DocumentBox.js";

export default function App({ $target }) {
  const documentBox = new DocumentBox({
    $target,
  });

  documentBox.setState();
}
