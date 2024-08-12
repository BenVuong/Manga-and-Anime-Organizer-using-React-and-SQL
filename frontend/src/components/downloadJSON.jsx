import React from "react";

const DownloadJSON = ({ data, fileName }) => {
  const downloadJSON = () => {
    const jsonData = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button onClick={downloadJSON}>Download collection as JSON</button>;
};

export default DownloadJSON;
