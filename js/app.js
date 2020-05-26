//add new notes to local storage

showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTit = document.getElementById("addTit");
  let title = localStorage.getItem("titleget");
  let notes = localStorage.getItem("notes");
  if (title == null) {
    titlelist = [];
  } else {
    titlelist = JSON.parse(title);
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  titlelist.push(addTit.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titleget", JSON.stringify(titlelist));
  addTxt.value = "";
  addTit.value = "";
  console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");

  let title = localStorage.getItem("titleget");

  if (title == null) {
    titlelist = [];
  } else {
    titlelist = JSON.parse(title);
  }

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = ``;
  console.log(notesObj);
  addTit = document.getElementById(addTit);

  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-3 card" style="width: 18rem; id="done ${index}">
          <div class="card-body " id="${index}">
          
            <h5 class="card-title">${titlelist[index]} <a class="right" onclick="doYellow()"><i class="fas fa-bookmark book right"></i></a></h5>
            <hr>
            <p class="card-text">${element}</p>
            <button id ="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            <button id ="${index}" class="btn btn-primary mx-3" onclick="editNote(this.id)">Edit</button>
        </div>
        </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No Notes added, Use "Add Note" to create one`;
  }
}

//Function to delete note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let title = localStorage.getItem("titleget");

  if (title == null) {
    titlelist = [];
  } else {
    titlelist = JSON.parse(title);
  }
  notesObj.splice(index, 1);
  titlelist.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titleget", JSON.stringify(titlelist));
  showNotes();
}
//To search for Notes
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

//Delete all
let del = document.getElementById("delAll");
del.addEventListener("click", function (d) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let title = localStorage.getItem("titleget");

  if (title == null) {
    titlelist = [];
  } else {
    titlelist = JSON.parse(title);
  }

  notesObj.splice(0, notesObj.length);
  titlelist.splice(0, titlelist.length);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titleget", JSON.stringify(titlelist));
  showNotes();
});
//to edit note
function editNote(index) {
  let edit = document.getElementById(index);

  let text = `<p class="lead">Edit here:</p>

  <br/>
  <textarea class="form-control" id="editcard" rows="4">${notesObj[index]}</textarea>
  <p></p>
  <button onclick="end(this.id)" id="${index}" class="btn btn-primary">Save</button>`;
  edit.innerHTML = text;
}

//to save an edit
function end(index) {
  save = document.getElementById("editcard");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  console.log(save);
  notesObj[index] = save.value;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
