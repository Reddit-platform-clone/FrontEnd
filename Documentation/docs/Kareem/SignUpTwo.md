# SingUpTwo js


```jsx
 const [showSignUpOne, setShowSignUpOne] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(true);
  const { setToken } = useAuth();

  const handleContinueClick = async () => {
    if (!recaptchaVerified) {
      toast.error("Please verify that you're not a robot.");
      return;
    }

    const usernameInput = document.getElementById("signuptwo-username");
    const passwordInput = document.getElementById("signuptwo-password");

    if (!usernameInput || !passwordInput) {
      toast.error("Username or password is missing.");
      return;
    }

    const username = usernameInput.value.trim(); // Trim whitespace
    const password = passwordInput.value.trim();

    if (!username || !password) {
      toast.error("Username and password cannot be empty.");
      return;
    }

    if (!email || !password || !username) {
      toast.error("Email, password, or username is missing.");
      return;
    }

    try {
      const response = await fetch("http://57.151.116.81:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Account created!");
        console.log("Token:", data.token);
        setToken(data.token);
        handleCloseModal();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while signing up");
    }
  };

  const handleBackButtonClick = () => {
    setShowSignUpOne(true);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
  };

  const handleCloseModal = () => {
    setShowSignUpModal(false);
  };

  if (showSignUpOne) {
    return <SignUpOne />;
  }
```
This handles The seconed step of the signing up process by validating the email if its used or not by using the API mentioned 
