# Overview
This is a simple form which notifies the user whether inputs in given fields are correct.

Here is how before inputs are added
![Default](https://user-images.githubusercontent.com/70066475/112865471-b62d5480-90b0-11eb-8251-4612e696683b.png)

# The Finer Details
The JavaScript in this project validates all fields, ensuring that:
 - No fields are empty
 - Names only contain letters
 - Certain conditions for the password are met, and that the confirmation password matches the initial password
 - A given email is in the correct format

Once all inputs are registered as valid, the form allows the user to submit it, notfying the user with a welcome panel when the submission process is complete.

In terms of JavaScript code specifics:
 - Event handlers are used to prevent default behaviour and handle form submission
 - If (and else) statements are used for validating inputs
 - Template strings are used for writing pieces of code that involve a variable more concisely
 - Regular expressions are used for setting the conditions for a password to be valid

Materialize has been used to give the page a clean style, hence the minimal custom CSS in the CSS file.

# See Live
https://pedantic-curran-4349f1.netlify.app/

# Get Started
This directory has no dependancies, so it can be run in VSCode with the Live Server extension.
