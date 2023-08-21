// nameUtils.js
export const updateName = async (nameChangeValue, email) => {
    try {
      const response = await fetch("/api/blogs/editBlogs", {
        method: "POST",
        body: JSON.stringify({ nameChangeValue, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        return "Name Change Successful";
      } else {
        return "Name Change Failed";
      }
    } catch (err) {
      return "An error occurred while updating the name.";
    }
  };
  