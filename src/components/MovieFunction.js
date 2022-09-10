export function movieLength(moiveRuntime){
    let hours = math.floor(movieRuntime / 60);
    let minutes = moiveRuntime % 60;
    return hours + " h " + minutes + "min";
}

export function moiveDiretor(crew) {
    const moiveDirector = crew.find((item) => {
        return item.job === "Director"
    })
    return moiveDirector
}