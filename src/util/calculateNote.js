import noteCircle from './noteCircle';
import findNote from './findNote';

const calculateNote = (initialNote="A", stepNumber) => {
    //Given a initial note and a number of steps, it returns the note X steps from the initial note.
    initialNote = initialNote.toUpperCase();
    stepNumber = stepNumber + findNote(initialNote);
    while(stepNumber>11){
        stepNumber=stepNumber-12;
    }
    return noteCircle[stepNumber];
}

export default calculateNote;