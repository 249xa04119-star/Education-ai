let currentUser="";
let currentRole="";

const classSelect=document.getElementById("classSelect");
for(let i=1;i<=12;i++){
  let opt=document.createElement("option");
  opt.text="Class "+i;
  classSelect.add(opt);
}

function login(){
  currentUser=document.getElementById("username").value;
  currentRole=document.getElementById("role").value;

  if(currentRole==="student"){
    document.getElementById("studentPanel").classList.remove("hidden");
  } else {
    showTeacherDashboard();
    document.getElementById("teacherPanel").classList.remove("hidden");
  }
}

function loadStreams(){
  let selected=classSelect.value;
  if(selected==="Class 11"||selected==="Class 12"){
    document.getElementById("streamDiv").classList.remove("hidden");
    document.getElementById("streamSelect").innerHTML=
      "<option>Science</option><option>Commerce</option><option>Humanities</option>";
  }
}

function loadSubjects(){
  let stream=document.getElementById("streamSelect").value;
  let subjectSelect=document.getElementById("subjectSelect");
  subjectSelect.innerHTML="";
  let subjects=["Math","English"];

  if(stream==="Science")
    subjects=["Math","Physics","Chemistry","Biology"];
  if(stream==="Commerce")
    subjects=["Accountancy","Economics"];
  if(stream==="Humanities")
    subjects=["History","Geography"];

  subjects.forEach(s=>{
    let opt=document.createElement("option");
    opt.text=s;
    subjectSelect.add(opt);
  });
}

function submitQuiz(answer){
  let score=(answer===5)?100:40;
  let risk=score<50?"High Risk 🔴":"Low Risk 🟢";

  document.getElementById("quizResult").innerText=
    "Score: "+score+"% | "+risk;

  saveScore(score);
  drawChart(score);
}

function saveScore(score){
  let data=JSON.parse(localStorage.getItem("students"))||{};
  if(!data[currentUser]) data[currentUser]=[];
  data[currentUser].push(score);
  localStorage.setItem("students",JSON.stringify(data));
}

function drawChart(score){
  new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels:["Score"],
      datasets:[{label:"Performance",data:[score]}]
    }
  });
}

function showTeacherDashboard(){
  let data=JSON.parse(localStorage.getItem("students"))||{};
  let output="";
  for(let student in data){
    output+="<p>"+student+": "+data[student].join(", ")+"</p>";
  }
  document.getElementById("studentData").innerHTML=output;
}

function playGame(){
  let random=Math.floor(Math.random()*5)+1;
  let guess=parseInt(document.getElementById("guess").value);
  document.getElementById("gameResult").innerText=
    guess===random?"🎉 Correct!":"❌ Try Again!";
}

function simplify(){
  let text=document.getElementById("wordProblem").value;
  document.getElementById("solution").innerHTML=
    "Step 1: Identify given data.<br>Step 2: Apply formula.<br>"+text;
}

function downloadReport(){
  const { jsPDF } = window.jspdf;
  let doc=new jsPDF();
  doc.text("Student Report: "+currentUser,10,10);
  doc.save("report.pdf");
}

function toggleLang(){
  document.getElementById("title").innerText="🎓 AI విద్యా వేదిక";
}
