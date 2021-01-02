// import styles
import "../css/styles.css";

// Imports scripts
import "./bootstrap/bootstrap.bundle.min";

// Import install service worker
import { subscribe } from "./helpers/register";
subscribe();

// Import validate form
import { ValidateInput } from "./helpers/validators";

const inputs = document.querySelectorAll("#form-validate input");

const validateInput = new ValidateInput();
validateInput.validate(inputs);
