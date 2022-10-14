const Tasks = require('../models/Task');

ctrlTask = {};
//Controlador para crear una nueva tarea
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

//Controlador para listar las tareas creadas
ctrlTask.getTasks = async (req, res) => {
    try {
        if (req.user.rol[0] == 'admin') {
            const tasks = await Tasks.find().populate('userId', ['username'])
            return res.json(tasks)
        }

        const tasks = await Tasks.find({$and: [{userId: req.user._id}, {active: true}]}).populate('userId', ['username']);
        if (tasks.length === 0) {
            return res.json({
                msg: "No tiene tareas creadas"
            })
        }
        return res.json(tasks);
    } catch (error) {
        res.json({
            msg: "Error al listar las tareas"
        });
    }
}

//Controlador para actualizar tareas
ctrlTask.putTasks = async (req, res) => {
    const idTask = req.params.id;
    const idUser = req.user._id;
    try {
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
    } catch (error) {
        res.json({
            msg: "Error al modificar la tarea"
        });
    }
}

//controlador para eliminar tareas
ctrlTask.deleteTask = async (req, res) => {
    const idTask = req.params.id;
    const idUser = req.user._id;
    try {
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
    } catch (error) {
        res.json({
            msg: "Error al eliminar la tarea"
        });
    }
}

//Controlador para marcar tareas como completadas
ctrlTask.finishTasks = async (req, res) => {
    const idTask = req.params.id;
    const idUser = req.user._id;
    try {
        if (!idTask) {
            return res.json({
                msg: 'no viene id en el parametro'
            });
        }
    
        const task = await Tasks.findById(idTask);
        
        if (idUser.toString() != task.userId.toString()) {
            return res.json({
                msg: 'Error de usuario'
            });
        }
    
        await Tasks.findByIdAndUpdate(idTask, { finished: true });
    
        return res.json({
            msg: 'Tarea marcada como realizada'
        });
    } catch (error) {
        res.json({
            msg: "Error al modificar el estado"
        });
    }
}

module.exports = ctrlTask;