const ctrlHome = {};

ctrlHome.getHome = async (req, res)=>{
    res.send('<h1>Pagina de Inicio</h1>');
}

module.exports = ctrlHome;