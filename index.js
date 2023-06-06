const express = require("express");
const app = express();
const port = 3000;

const USERS = [];

const QUESTIONS = [
  {
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [
      {
        input: "[1,2,3,4,5]",
        output: "5",
      },
    ],
  },
  {
    title: "Maximum Element",
    description: "Given an array, return the maximum element in the array.",
    testCases: [
      {
        input: "[1, 2, 3, 4, 5]",
        output: "5",
      },
      {
        input: "[-10, 0, 10, -20]",
        output: "10",
      },
      {
        input: "[2, 2, 2, 2, 2]",
        output: "2",
      },
    ],
  },
  {
    title: "Sum of Two Numbers",
    description:
      "Given an array of integers and a target value, find two numbers that add up to the target value and return their indices.",
    testCases: [
      {
        input: "[2, 7, 11, 15], 9",
        output: "[0, 1]",
      },
      {
        input: "[-1, 0, 1, 2, 3], 5",
        output: "[2, 4]",
      },
    ],
  },

  {
    title: "Reverse String",
    description: "Given a string, reverse it and return the reversed string.",
    testCases: [
      {
        input: "'hello'",
        output: "'olleh'",
      },
      {
        input: "'world'",
        output: "'dlrow'",
      },
    ],
  },
];
const SUBMISSION = [];
app.use(express.json()); // Middleware to parse JSON in the request body

app.post("/signup", function (req, res) {
  // Add logic to decode body
  // body should have email and password
  // req.body.email  gives the email and req.body.password gives the password
  /* 
  assuming user array to be like this
  and user always enters the correct email and passwords
  USERS = [
    {
      email:souravworkinginweb3@gmail.com
      password:129492
    },
    {
      email:sourav755@gmail.com
      password:19248
    },
    ....
  ]
  */
  const { email, password } = req.body;
  let emailAlreadyExist = false;
  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].email === email) {
      emailAlreadyExist = true;
    }
    if (emailAlreadyExist) {
      res.status(409).json({
        message:
          "Email already exists , please signup with a new email or login",
      });
    } else {
      // creating a user
      const user = { email, password };
      USERS.push(user);
      // return back 200 status code to the client
      res.status(200).json({ message: "Sign up succesfull" });
    }
  }
});

app.post("/login", function (req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  let userPositon = 0;
  let emailFound = false;
  const token = "weeeee";

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client

  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].email === email) {
      userPositon = i;
      emailFound = true;
    }
    if (emailFound) {
      if (USERS[userPositon].password === password) {
        res.status(200).json({ message: "succesfully logged in " });
      } else {
        res.status(401).json({ message: "wrong password" });
      }
    } else {
      res.status(404).json({ message: "email not found", imp: token });
    }
  }
});

app.get("/questions", function (req, res) {
  //return the user all the questions in the QUESTIONS array
  res.json(QUESTIONS);
});

app.get("/submissions", function (req, res) {
  // return the users submissions for this problem
  res.json(SUBMISSION);
});

app.post("/submissions", function (req, res) {
  // let the user submit a problem, randomly accept or reject the solution
  const { submission } = req.body.submission;
  // Random integer between 1 and 10 (inclusive)
  const randomInt = Math.floor(Math.random() * 10) + 1;
  if (randomInt > 5) {
    // Store the submission in the SUBMISSION array above
    SUBMISSION.push(submission);
    res
      .status(200)
      .json({ message: "sucessfully submitted the correct answer" });
  }
  res.status(400).json({ message: "wrong answer" });
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
