
  app.post('/signup', async (req, res) => {
    try {
      // Validate request body using Joi schema
      const { error } = userValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // If validation passes, proceed to create a new user
      const { email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ email, password });
      await newUser.save();
      res.status(200).json(newUser);
  
      // Optionally, set username to cookie upon signup
      res.cookie('email', email, { httpOnly: true });
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Logout endpoint
  app.post('/logout', (req, res) => {
    res.clearCookie('email', { httpOnly: true});
    res.status(200).json({ message: 'Logout successful' });
  });
  

  // Route to add a new sell camera to the sell page
  
  // Endpoint to update a sell camera

  
  // Route to serve the SellForm.jsx file for updating a sell camera
  