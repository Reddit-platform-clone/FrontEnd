# Login JS
```jsx
const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const { setToken } = useAuth();

  const handleSignUpClick = () => {
    setRedirectToSignUp(true);
  };

  const handleUsernameClick = () => {
    setShowUsername(true);
  };

  const handlePasswordClick = () => {
    setShowPassword(true);
  };

  const handleLogin = async () => {
    const emailOrUsername = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch('http://57.151.116.81:5000/api/login', {
        method: 'POST',
        body: JSON.stringify({ emailOrUsername, password }), // Ensure both fields are included
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success("Login successful!");
        console.log(data.token);
        console.log("before setting token");

          setToken(data.token);
          setJWT(data.token)
          console.log("after setting token")
        // Call onSuccessfulLogin function passed from parent component
        onSuccessfulLogin();
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        toast.error('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while logging in. Please try again later.');
    }
  };
  
  // Function to handle closing the login modal
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  if (redirectToSignUp) {
    return <SignUpOne />;
  }

  if (showUsername) {
    return <ForgotUsername />;
  }

  if (showPassword) {
    return <ForgotPassword />;
  }
```
This handles the login process by checking the user name and password and retrieves the token from user
