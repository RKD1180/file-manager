import { Button } from "flowbite-react";

const DownloadButton = ({ base64Data, fileName }) => {
  const handleDownload = () => {
    // Remove the data URL prefix if present
    const base64WithoutPrefix = base64Data.split(",")[1] || base64Data;

    // Convert base64 to binary
    const binaryData = atob(base64WithoutPrefix);

    // Create a Uint8Array from the binary data
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: "application/octet-stream" });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;

    // Append the link to the document and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);
  };

  return (
    <Button color="dark" onClick={handleDownload}>
      Download
    </Button>
  );
};

export default DownloadButton;
