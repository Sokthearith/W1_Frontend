let questionsState = loadQuestions();
let editingIndex = null;

const listEl = document.querySelector("#questionsList");
const addBtn = document.querySelector("#addQuestionBtn");
const modalEl = document.querySelector("#questionModal");
const modalTitleEl = document.querySelector("#modalTitle");
const formEl = document.querySelector("#questionForm");
const cancelBtn = document.querySelector("#cancelModalBtn");

const inputTitle = document.querySelector("#qTitle");
const inputA = document.querySelector("#qA");
const inputB = document.querySelector("#qB");
const inputC = document.querySelector("#qC");
const inputD = document.querySelector("#qD");
const selectCorrect = document.querySelector("#qCorrect");

function renderQuestions() {
  listEl.innerHTML = "";
  questionsState.forEach((q, index) => {
    const li = document.createElement("li");
    li.className = "question-item";
    li.innerHTML = `
      <span class="question-item__title">${q.title}</span>
      <div class="question-item__actions">
        <button class="icon-btn" data-action="edit" data-index="${index}">✏️</button>
        <button class="icon-btn" data-action="delete" data-index="${index}">🗑</button>
      </div>
    `;
    listEl.appendChild(li);
  });
}

function openModal(mode, index) {
  if (mode === "edit") {
    editingIndex = index;
    const q = questionsState[index];
    modalTitleEl.textContent = "Edit question";
    inputTitle.value = q.title;
    inputA.value = q.choiceA;
    inputB.value = q.choiceB;
    inputC.value = q.choiceC;
    inputD.value = q.choiceD;
    selectCorrect.value = q.correct;
  } else {
    editingIndex = null;
    modalTitleEl.textContent = "Create new question";
    formEl.reset();
    selectCorrect.value = "A";
  }
  modalEl.style.display = "block";
}

function closeModal() {
  modalEl.style.display = "none";
}

addBtn.addEventListener("click", () => openModal("create"));

cancelBtn.addEventListener("click", () => {
  closeModal();
});

listEl.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const action = target.getAttribute("data-action");
  const indexAttr = target.getAttribute("data-index");
  if (!action || indexAttr === null) return;
  const index = parseInt(indexAttr, 10);

  if (action === "edit") {
    openModal("edit", index);
  } else if (action === "delete") {
    questionsState.splice(index, 1);
    saveQuestions(questionsState);
    renderQuestions();
  }
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const newQuestion = {
    title: inputTitle.value.trim(),
    choiceA: inputA.value.trim(),
    choiceB: inputB.value.trim(),
    choiceC: inputC.value.trim(),
    choiceD: inputD.value.trim(),
    correct: selectCorrect.value,
  };

  if (!newQuestion.title) {
    return;
  }

  if (editingIndex === null) {
    questionsState.push(newQuestion);
  } else {
    questionsState[editingIndex] = newQuestion;
  }

  saveQuestions(questionsState);
  renderQuestions();
  closeModal();
});

// initial render
renderQuestions();


