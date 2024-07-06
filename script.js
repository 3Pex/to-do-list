const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a new list item element
        let li = document.createElement('li');

        // Create a new checkbox element
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Create a new label element
        let label = document.createElement('label');
        label.textContent = inputBox.value;

        // Append the checkbox and label to the list item
        li.appendChild(checkbox);
        li.appendChild(label);

        // Append the list item to the list container
        listContainer.appendChild(li);

        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Add an event listener to the checkbox
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = 'gray';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = 'black';
            }
        });
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    // Re-add event listeners to the checkboxes after loading from localStorage
    const checkboxes = listContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = 'gray';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = 'black';
            }
        });
        // Trigger change event if checkbox is already checked
        if (checkbox.checked) {
            checkbox.dispatchEvent(new Event('change'));
        }
    });
}

showTask();
