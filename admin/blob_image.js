const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const status = document.getElementById("status");
const imageUrl = document.getElementById("imageUrl");

uploadButton.addEventListener("click", async () => {
  const file = fileInput.files[0];

  if (!file) {
    status.textContent = "Please select a file.";
    return;
  }

  // Step 1: Check if the file is an image
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedImageTypes.includes(file.type)) {
    status.textContent = "Please select a valid image file (JPEG, PNG, GIF, or WEBP).";
    return;
  }

  try {
    status.textContent = "Fetching SAS token...";

    // Step 2: Fetch the SAS token
    const response = await fetch(
      "https://datatosharefunctions.azurewebsites.net/api/addBlobImage?code=ghWdSVrNXmeOMgrOu85nZ07uyb58KHCDYvthI8YaBIvYAzFuztt1HA%3D%3D",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch SAS token: ${response.statusText}`);
    }

    const { sasToken } = await response.json();

    // Step 3: Construct the Blob URL with the SAS token
    const accountName = "datatoshare";
    const containerName = "images";

    // Replace spaces with underscores in the file name
    const sanitizedFileName = file.name.replace(/ /g, "_");

    const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${sanitizedFileName}?${sasToken}`;
    const blobImageUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${sanitizedFileName}`;

    // Step 4: Upload the file to Azure Blob Storage
    status.textContent = "Uploading file...";
    const uploadResponse = await fetch(blobUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    status.textContent = "File uploaded successfully.";
    imageUrl.textContent = blobImageUrl;
    console.log("File uploaded successfully.");
  } catch (error) {
    status.textContent = `Error during upload: ${error.message}`;
    console.error("Error during upload:", error.message);
  }
});