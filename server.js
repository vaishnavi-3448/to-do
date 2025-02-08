const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// Define Task schema and model
const taskSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, // Ensure name is required and trimmed
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks", error: err.message });
    }
});

// Add a new task
app.post('/tasks', async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ message: "Task name is required" });
    }

    try {
        const newTask = new Task({ name });
        await newTask.save();
        res.status(201).json({ message: "Task added successfully!", task: newTask });
    } catch (err) {
        res.status(500).json({ message: "Error adding task", error: err.message });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task", error: err.message });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
