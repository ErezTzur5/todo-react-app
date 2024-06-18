import React from 'react'
import AddTodoForm from '../AddTodoForm'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'


function CreateTodoPage() {
    console.log("Hi");
    return (
        <Dialog open={true} >
            <DialogTitle>Add Todo</DialogTitle>
            <DialogContent>
                <AddTodoForm />
            </DialogContent>
            <DialogActions>
                <Button>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateTodoPage