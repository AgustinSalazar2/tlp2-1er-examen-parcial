const Tasks = require('../models/Task');

ctrlTask = {};

ctrlTask.postTasks = async (req, res) => {
    const {title, description} = req.body;

    const task = new Tasks({
        title,
        description,
        userId: req.user._id
    });

    try {
        const newTask = await task.save();
        return res.json({
            msg: 'Tarea creada correctamente'
        });
    } catch (error) {
        return res.json({
            msg: 'Error al crear nueva tarea'
        });
    }
}

ctrlTask.getTasks = async (req, res) => {
    const tasks = await Tasks.find({userId: req.user._id});
    return res.json(tasks);
}

module.exports = ctrlTask;