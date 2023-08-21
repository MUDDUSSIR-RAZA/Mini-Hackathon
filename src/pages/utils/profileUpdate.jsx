export const handlePictureChange = async (selectedFile, setSelectedPicture, setUpdatePic) => {
    setSelectedPicture(selectedFile);
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataUrl = event.target.result;
      setUpdatePic(dataUrl);
    };
    reader.readAsDataURL(selectedFile);
  };
  
  export const updateProfilePicture = async (selectedPicture, updatePic, email) => {
    if (!selectedPicture) {
      return; // No need to proceed without a selected picture
    }
  
    try {
      const response = await fetch("/api/blogs/updateProfilePics", {
        method: "POST",
        body: JSON.stringify({
          updatePic,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        return "Picture Update Successful";
      } else {
        const responseBody = await response.json();
        return responseBody.errorMessage;
      }
    } catch (error) {
      return "An error occurred while changing the picture. Please try again later.";
    }
  };