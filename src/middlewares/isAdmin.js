const isAdmin = (req, res, next) => {
    if (req.user.rol[0] !== 'admin') {
        return res.json({
            msg: 'No autorizado '
        });
    }
    next();
}

module.exports = isAdmin;