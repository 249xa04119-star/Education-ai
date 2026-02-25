function go(page){
  window.location.href = page;
}

function studentLogin(){
  let name = document.getElementById("studentName").value;
  let cls = document.getElementById("studentClass").value;
  localStorage.setItem("studentName", name);
  localStorage.setItem("studentClass", cls);
  window.location.href = "student-dashboard.html";
}

function teacherLogin(){
  let name = document.getElementById("teacherName").value;
  localStorage.setItem("teacherName", name);
  window.location.href = "teacher-dashboard.html";
}

function logout(){
  localStorage.clear();
  window.location.href = "index.html";
}

window.onload = function(){
  let name = localStorage.getItem("studentName");
  let cls = localStorage.getItem("studentClass");

  if(document.getElementById("studentDisplay")){
    document.getElementById("studentDisplay").innerText =
      name + " - " + cls;
  }

  if(document.getElementById("riskStatus")){
    checkRisk();
  }

  generateQuestion();
};

function checkAnswer(ans){
  if(ans == 15){
    alert("Correct!");
    localStorage.setItem("score", 85);
  } else {
    alert("Wrong Answer");
  }
}

function checkRisk(){
  let score = localStorage.getItem("score") || 50;
  let status = document.getElementById("riskStatus");

  if(score < 40){
    status.innerText = "⚠ High Risk";
    status.style.color = "red";
  }
  else if(score < 70){
    status.innerText = "⚠ Moderate Risk";
    status.style.color = "yellow";
  }
  else{
    status.innerText = "✅ Safe";
    status.style.color = "lightgreen";
  }
}

function simplify(){
  let text = document.getElementById("problemInput").value;
  document.getElementById("result").innerText =
    "Simplified: " + text;
}

let num1, num2;

function generateQuestion(){
  if(document.getElementById("question")){
    num1 = Math.floor(Math.random()*10);
    num2 = Math.floor(Math.random()*10);
    document.getElementById("question").innerText =
      num1 + " + " + num2 + " = ?";
  }
}

function submitGame(){
  let userAns = document.getElementById("answer").value;
  if(parseInt(userAns) === num1 + num2){
    alert("Correct!");
  } else {
    alert("Try Again!");
  }
}

function downloadReport(){
  let score = localStorage.getItem("score") || 0;
  let content = "EduSmart Performance Report\nScore: " + score;
  let blob = new Blob([content], {type:"text/plain"});
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "report.txt";
  link.click();
}
