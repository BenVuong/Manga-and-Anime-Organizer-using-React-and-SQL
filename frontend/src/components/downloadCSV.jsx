import React from "react";

const DownloadCSV = ({ data, fileName, label }) => {
  const convertToCSV = (objArray) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    const headers = Object.keys(array[0]);
    const csvRows = [];

    // Add the headers row
    csvRows.push(headers.join(","));

    // Loop through the rows and convert them to CSV format
    array.forEach((row) => {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  const downloadCSV = (csvData) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const csvData = convertToCSV(data);
    downloadCSV(csvData);
  };

  return (
    <div>
      <button onClick={handleDownload}>{label}</button>
    </div>
  );
};

export default DownloadCSV;
