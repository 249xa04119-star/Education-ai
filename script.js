function checkAnswer(correctAnswer) {
    let selected = event.target.innerText;
    let result = document.getElementById("result");

    if (parseInt(selected) === correctAnswer) {
        result.innerHTML = "✅ Correct! Well Done!";
        result.style.color = "green";
    } else {
        result.innerHTML = "❌ Wrong Answer. Try Again!";
        result.style.color = "red";
    }
}

function simplify() {
    let problem = document.getElementById("problem").value;
    let solution = document.getElementById("solution");

    if(problem.trim() === ""){
        solution.innerHTML = "Please enter a problem.";
        return;
    }

    solution.innerHTML = `
    Step 1: Read the question carefully.<br>
    Step 2: Identify given values.<br>
    Step 3: Identify what is asked.<br>
    Step 4: Apply formula.<br><br>
    Problem: ${problem}
    `;
}
