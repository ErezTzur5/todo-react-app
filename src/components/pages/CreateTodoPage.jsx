import React from 'react'
import AddTodoForm from '../AddTodoForm'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'


function CreateTodoPage() {

    return (
        <Dialog open={true} >
            <DialogTitle>Add Todo</DialogTitle>
            <DialogContent>
                <AddTodoForm />
            </DialogContent>
        </Dialog>
    )
}

export default CreateTodoPage