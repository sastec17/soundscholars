import Cookies from "js-cookie";
// User correctly answers
export default function correctAnswer(exerciseType: string){
    // update counter in BE
    // TODO: ignoreStaleRequest stuff needed here? 
    fetch('/api/correctResponse', {
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({exerciseType: exerciseType})
        }
    ).then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
     }).then((data) => {
        // TODO: update user's cookies if needed?
        // increase user's level!
        if (data.increaseLevel) {
            Cookies.set('level', data.nextLevel);
            // navigate to next page
            // TODO: Cleaner way to do this???
            window.location.href = '/learningPages/levels/level'+data.nextLevel+'0'
        }
     })
}