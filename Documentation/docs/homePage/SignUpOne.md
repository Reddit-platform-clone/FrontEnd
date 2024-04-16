# SingUpOne Js


#### function SignUpOne()

```jsx
const [showSignUpTwo, setShowSignUpTwo] = useState(false);
  const [email, setEmail] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showModal, setShowModal] = useState(true); // State for modal visibility

  const handleContinueButtonClick = () => {
    // Check if email is empty or not in a valid format
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Check if the entered email exists in the users section of the JSON data
    const userExists = jsonData.users.some((user) => user.email === email);

    if (userExists) {
      toast.error("Email already exists");
    } else {
      setShowSignUpTwo(true);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLoginClick = () => {
    setRedirectToLogin(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // If redirectToLogin is true, render the LogIn component
  if (redirectToLogin) {
    return <LogIn />;
  }

  // If showSignUpTwo is true, render SignUpTwo component
  if (showSignUpTwo) {
    return<SignUpTwo email={email} />;
  }
```
This script handles when a user tries to enter an email to signup and redirects you to login if the email you enter already exists and directs you to the next step of signing up if u have a new email
