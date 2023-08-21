// passwordUtils.js
export const updatePassword = async (oldPassword, newPassword, email, user) => {
    try {
      const response = await fetch("/api/blogs/editUserPassword", {
        method: "POST",
        body: JSON.stringify({
          hashedPassword: user.password,
          oldPassword,
          newPassword,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        return "Password Change Successful";
      } else {
        const responseBody = await response.json();
        return responseBody.errorMessage;
      }
    } catch (error) {
      return "An error occurred while changing the password. Please try again later.";
    }
  };
  