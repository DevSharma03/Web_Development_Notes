// Mock database
const users = [];

const createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email,
    };
    users.push(newUser);

    res.status(201).json({
        message: 'User created successfully',
        user: newUser,
    });
};

module.exports = { createUser };
