
// -> Close modal when user make click outside modal 

export const onCloseModal = (target, className, setState, animation) => {
    if (target.classList.contains(className)) {
        if (animation) {
            whitAnimation(setState, animation);
        }else{
            whitOutAnimation(setState);
        }
    }
}

const whitAnimation = (setState, animation) => {
    console.log(animation)
    animation.current();
    setTimeout(() => {
        setState(false);
    }, animation.time)
}
const whitOutAnimation = (setState) => {
    setState(false);
}