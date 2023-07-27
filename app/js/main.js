const addBox = document.querySelector(".addBox"),
popupBox = document.querySelector(".popupBox"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector('header .close'),
titleTag = popupBox.querySelector('input'),
descTag = popupBox.querySelector('textarea'),
addBtn = popupBox.querySelector('button');

let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// передаем сюды Title descriptiom and date
const notes = JSON.parse(localStorage.getItem('notes') || "[]");
let isUpdate = false, updateId;

addBox.addEventListener('click', () => {
    titleTag.focus();
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click', () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Добавь новое задание";
    popupTitle.innerText = "Добавь задание";
    popupBox.classList.remove('show');
});

function showNotes() {

    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="ditails">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottomContent">
                            <span>${note.date}</span>
                            <div class="settings">
                                <ion-icon onclick"showMenu(this)" class="elem" name="ellipsis-vertical-outline"></ion-icon>
                                <ul class="menu">
                                    <li>
                                        <ion-icon onclick = "updateNote(${index}, '${note.title}', '${note.description}')" name="pencil-outline"></ion-icon>
                                    </li>
                                    <li>
                                        <ion-icon onclick="deleteNote(${index})" name="trash-outline"></ion-icon>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
        console.log(notes);
    });
}

showNotes();

function deleteNote(noteId){
    let confrifDel = confirm("Вы уверены что хотите удалить здания?");
    if(!confrifDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes();
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Исправить";
    popupTitle.innerText = "Обновить задание";
    console.log(noteId, title, desc);
}


addBtn.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;
    
    if( noteTitle || noteDesc ) {
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }

        localStorage.setItem("notes", JSON.stringify(notes))
        closeIcon.click();
        showNotes();
    }
});