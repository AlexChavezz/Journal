
// -> Close modal when user make click outside modal 

export const onCloseModal = (target, className, setState) => {
    if( target.classList.contains(className) ){
        setState(false);
    }
}