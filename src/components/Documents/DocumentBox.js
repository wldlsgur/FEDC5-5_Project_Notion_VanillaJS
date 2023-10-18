import DocumentList from "./DocumentList.js";

export default function DocumentBox({ $target }) {
  const $documentBox = document.createElement("div");

  const documentList = new DocumentList({
    $target: $documentBox,
    initialState: [],
  });

  this.setState = async () => {
    const documents = [
      {
        id: 1,
        title: "공부하기",
        documents: [
          {
            id: 2,
            title: "강의듣기",
            documents: [
              {
                id: 3,
                title: "바닐라 JS",
                documents: [],
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "프로젝트 하기",
        documents: [],
      },
    ];

    documentList.setState(documents);
    this.render();
  };

  this.render = () => {
    $target.appendChild($documentBox);
  };
}
