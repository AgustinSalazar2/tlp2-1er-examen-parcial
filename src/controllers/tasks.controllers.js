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
    const tasks = await Tasks.find({$and: [{userId: req.user._id}, {active: true}]});
    return res.json(tasks);
}

ctrlTask.putTasks = async (req, res) => {
    const idTask = req.params.id;
    const idUser = req.user._id;
    if (!idTask) {
        return res.json({
            msg: 'no viene id en el parametro'
        })
    }
    const { title, description } = req.body;
    const task = await Tasks.findById(idTask);
    
    if (idUser.toString() != task.userId.toString()) {
        return res.json({
            msg: 'Error de usuario'
        })
    }

    await Tasks.findByIdAndUpdate(idTask, { title, description });

    return res.json({
        msg: 'Tarea modificada correctamente'
    })
}

ctrlTask.deleteTask = async (req, res) => {
    const idTask = req.params.id;
    const idUser = req.user._id;
    if (!idTask) {
        return res.json({
            msg: 'no viene id en el parametro'
        })
    }

    const task = await Tasks.findById(idTask);
    
    if (idUser.toString() != task.userId.toString()) {
        return res.json({
            msg: 'Error de usuario'
        })
    }

    await Tasks.findByIdAndUpdate(idTask, { active: false });

    return res.json({
        msg: 'Tarea eliminada correctamente'
    })
}


module.exports = ctrlTask;