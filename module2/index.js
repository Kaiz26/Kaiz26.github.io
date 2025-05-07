let currentId = 0;
let students = [];
let isedit = false 
let editid = null;
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("createBtn")
    .addEventListener("click", UpdateOrCreateTable);
  document
    .getElementById("searchBtn")
    .addEventListener("click", SearchStudent);
});
function UpdateOrCreateTable() {
  const name = document.getElementById("name").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const math = parseFloat(document.getElementById("mathScore").value);
  const english = parseFloat(document.getElementById("englishScore").value);
  const literature = parseFloat(
    document.getElementById("literatureScore").value
  );
  const average = parseFloat((math + english + literature) / 3).toFixed(1);
  
   if ( !name || isNaN(math) || isNaN(english) || isNaN(literature) || math < 0 || math > 10 || english < 0 || english > 10 || literature < 0 || literature > 10 )
      {
        alert("VUI LONG NHAP GIA TRI PHU HOP")
        return;
      }
  const student = {
    name: name,
    gender: gender,
    math: math,
    english: english,
    literature: literature,
    average: average,
  };
  if ( isedit && editid !== null )
   {  
      UpdateTable(student,editid)
   }
   else      
   { 
      AddStudent(student);
   }
   resetForm()
}

function UpdateTable(updatedInfo,id){
  const index = students.findIndex(student =>( student.id === id ))

  if (index != -1)
   students[index] = {
      ...students[index] ,
      name: updatedInfo.name,
      gender: updatedInfo.gender,
      math: updatedInfo.math,
      english: updatedInfo.english,
      literature: updatedInfo.literature,
      average: updatedInfo.average,      
    }
   
  
  //Cap nhat thong tin
  renderStudentTable()

}

function AddStudent(student) {
  currentId++;

  students.push({
    id: currentId,
    name: student.name,
    gender: student.gender,
    math: student.math,
    english: student.english,
    literature: student.literature,
    average: student.average,
  });

  renderStudentTable();
}

function renderStudentTable() {
  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = ''
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                     <td>${index + 1}</td>
                     <td>${student.name}</td>
                     <td>${student.gender}</td>
                     <td>${student.math}</td> 
                     <td>${student.english}</td>
                     <td>${student.literature}</td>
                     <td>${student.average}</td>
                     <td>
                        <button class="btn btn-danger" onclick="EditTable(${student.id})" >Update</button>
                        <button class="btn btn-primary"  onclick="DeleteStudent(${student.id})" >Delete</button>
                     </td>
                    `;
    tableBody.appendChild(row)
  });
}

function DeleteStudent(id) {
  if ( confirm('Ban co muon xoa hoc sinh nay ?') )
   students = students.filter( (student) => student.id !== id   )

  renderStudentTable()
}

function EditTable(id) {
   const student = students.find( (student) => student.id === id )

   if ( student )
   {
      document.getElementById('name').value = student.name
      document.querySelector(`input[name="gender"][value = "${student.gender}"]`).checked = true
      document.getElementById('mathScore').value = student.math
      document.getElementById('englishScore').value = student.english
      document.getElementById('literatureScore').value = student.literature
      
      // Update nut
      document.getElementById('createBtn').textContent = 'Update Student'
      document.getElementById('createBtn').className = 'btn btn-danger'
      editid = id
      isedit = true
   }
}

function SearchStudent(){
  const input = document.getElementById('searchInput').value.toLowerCase().trim();
  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = '' 
   students.forEach((student,index) => {
      if ( student.name.toLowerCase().includes(input) )
      {
        const row = document.createElement("tr");
          row.innerHTML = `
                           <td>${index + 1}</td>
                           <td>${student.name}</td>
                           <td>${student.gender}</td>
                           <td>${student.math}</td> 
                           <td>${student.english}</td>
                           <td>${student.literature}</td>
                           <td>${student.average}</td>
                           <td>
                              <button class="btn btn-danger" onclick="EditTable(${student.id})" >Update</button>
                              <button class="btn btn-primary"  onclick="DeleteStudent(${student.id})" >Delete</button>
                           </td>
                          `;
          tableBody.appendChild(row)
      }
   })
}

function resetForm(){
   document.getElementById('name').value = ''
      document.querySelector(`input[name="gender"][id = "Nam"]`).checked = true
      document.getElementById('mathScore').value = ''
      document.getElementById('englishScore').value = ''
      document.getElementById('literatureScore').value = ''
      
      // Update nut
      document.getElementById('createBtn').textContent = 'Create Student'
      document.getElementById('createBtn').className = 'btn btn-primary'
      editid = null
      isedit = false
}

