const notasCtrl = {};

const Notas = require('../models/Notas');

notasCtrl.renderNoteForm = (req,res) => {
    
    res.render('notas/new-note')
};
//crear nota
notasCtrl.createNewNota = async (req, res) => {
    const {title, description} = req.body;
    console.log(title)
    const newNotas = new Notas({title: title, description: description});
    // console.log(newNotas);
    newNotas.user = req.user.id;
    await newNotas.save();
    req.flash('succes_msg', 'Nueva nota agregada correctamente');
    res.redirect('/notas');
};

notasCtrl.renderNotas = async (req, res)=>{
    const notes = await Notas.find({user: req.user.id}).lean().sort({createdAt: 'desc'});
    res.render('notas/all-notes', {notes});
};

notasCtrl.renderEditForm = async (req, res) =>{
    const notas = await Notas.findById(req.params.id).lean();
    if (note.user != req.user.id){
        req.flash('error_msg', 'Opcion invalida');
        return res.redirect('/notas');
    }
    // console.log(notas)
    res.render('notas/edit-note.hbs', {notas});
};

notasCtrl.updateNote = async (req, res) => {
    const {title, description} = req.body;
    await Notas.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('succes_msg', 'Nota modificada correctamente');
    res.redirect('/notas') 
 
};



notasCtrl.deleteNotes = async (req, res) => {
    await Notas.findByIdAndDelete(req.params.id);
    req.flash('succes_msg', 'Nota eliminada correctamente');
    res.redirect('/notas')
};


module.exports = notasCtrl;