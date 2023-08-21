export const signupUser = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`Sign up failed: ${data.message}`);
      }
  
      return true;
    } catch (error) {
      throw error;
    }
  };