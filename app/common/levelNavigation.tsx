import Cookies from "js-cookie";

type correctAnserReturn = {
    exercisePath: string;
    answer: string;
    textDescription: string;
};

export default async function correctAnswer(
    exerciseType: string
): Promise<correctAnserReturn> {
    // update counter in BE
    // TODO: ignoreStaleRequest stuff needed here? 
    const response = await fetch('/api/correctResponse', {
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            exerciseType: exerciseType,
            username: Cookies.get('username'),
        }),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();

    if (data.increaseLevel) {
        Cookies.set('level', data.nextLevel);
        // navigate to next page
        window.location.href = '/learningPages/levels/level' + data.nextLevel + '0';
        throw new Error("Navigation occurred, no return value possible."); // Prevent further execution
    }
    return {
        exercisePath: data.nextExercise.exercisePath,
        answer: data.nextExercise.answer,
        textDescription: data.nextExercise.textDescription,
    };
}