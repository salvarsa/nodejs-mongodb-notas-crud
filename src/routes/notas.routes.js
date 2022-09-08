const { Router } = require('express');
const router = Router();

const { 
    renderNoteForm, 
    createNewNota, 
    renderNotas, 
    renderEditForm, 
    updateNote, 
    deleteNotes } = require('../controllers/notas.controller');


const {isAuthenticated} = require('../helpers/auth');


    //nueva nota
router.get('/notas/add', isAuthenticated, renderNoteForm);

router.post('/notas/new-note', isAuthenticated, createNewNota);

//get all note

router.get('/notas', isAuthenticated, renderNotas);

//editar notas

router.get('/notas/edit/:id', isAuthenticated, renderEditForm);

router.put('/notas/edit/:id', isAuthenticated, updateNote);

//eliminar notas
router.delete('/notas/delete/:id',isAuthenticated, deleteNotes);

module.exports = router;