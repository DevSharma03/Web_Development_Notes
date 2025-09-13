// Sample data
let posts = [
  { id: 1, title: "Post 1", content: "This is post 1" },
  { id: 2, title: "Post 2", content: "This is post 2" },
  { id: 3, title: "Post 3", content: "This is post 3" },
];
// @desc: Get all posts or a limited number of posts
// @route: GET /api/posts
const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit); // Get the limit query parameter
    if (!isNaN(limit) && limit > 0) {
      // Check if the limit is a valid number
      res.status(200).json(posts.slice(0, limit)); // Respond with the limited number of posts
    } else {
      res.status(200).json(posts); // Respond with all posts
    }
}

// @desc: Get a single post by ID
// @route: GET /api/posts/:id
const getPostById = (req, res, next) => {
    const id = parseInt(req.params.id); // Get the post ID from the URL parameter
    const post = posts.find((post) => post.id === id); // Find the post by ID
    if (post) {
        res.status(200).json(post); // Respond with the matching post
    } else {
        const error = new Error (`A post with the id of ${id} was not found`) // Respond with an error if not found
        error.status = 404;
        return next(error);
    }
}

// @desc: create a post 
// @route: POST/api/posts/:id
const createPost = (req, res, next) => {
    console.log(req.body);
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };
    if (!newPost.title || !newPost.content) {
        const error = new Error (`Please include a title`) // Respond with an error if not found
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(posts);
}

// @desc: update a post by ID
// @route: PUT/api/posts/:id
const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error (`check the id of the post you are trying to update`) // Respond with an error if not found
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    post.content = req.body.content;
    res.status(200).json(post);
}

// @desc: delete a post by ID
// @route: DELETE/api/posts/:id
const deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((post) => post.id === id);
    if (index === -1) {
        const error = new Error (`A post with the id of ${id} was not found`) // Respond with an error if not found
        error.status = 404;
        return next(error);
    }
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
}

export { getPosts, getPostById, createPost, updatePost, deletePost }; // Export the controller functions