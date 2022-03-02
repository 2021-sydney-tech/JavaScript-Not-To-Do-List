// alert("Hi")

const taskList = [];
const taskListElm =document.getElementById("task-list")
const badListElm =document.getElementById("bad-list")
const badList = [];
const weekHrs = 7*24;

const handleOnSubmit = event => {
    //console.log(event);

    const frmDt = new FormData(event);
    //console.log(frmDt);
    const task =frmDt.get("task"); // to get data from the form
    const hr =frmDt.get("hr"); // to get data from the form

    //console.log(task, hr);

    const obj = {
        task,
        hr
    };
    
    const ttlHr = taskTotalHours();
    //const ttlBadHr = badTotalHours();

    if (ttlHr + hr > weekHrs) {
        return alert("You have exceeded the weekly hours")
    }

    //taskList.push(obj);
    taskList.push(obj);
    display();

    
};

// display task list in the DOM
const display = () => {
    let str = ""



    // loop through the task list and convert into tr string
    taskList.map((item, i) => {
        str += `
        <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>${item.task}</td>
                                <td>${item.hr}</td>
                                <td>
                                    <button class="btn btn-danger" onClick="deleteTaskList(${i})">
                                        <i class="fa-solid fa-trash-can"></i></button>
                                    <button class="btn btn-primary" onClick="markNotToDo(${i})">
                                        <i class="fa-solid fa-arrow-right"></i></button></td>
                              </tr>
        `

    });
    taskListElm.innerHTML = str;


};

// display bad list in the DOM

const displayBadList = () => {
    let str = "";

    badList.map((item, i)=> {
        str += `
        <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>${item.task}</td>
                                <td>${item.hr}</td>
                                <td>
                                    <button class="btn btn-warning" onClick="markAsTask(${i})" >
                                        <i class="fa-solid fa-arrow-left"></i>
                                        </button>
                                    <button class="btn btn-danger" onClick="deleteBadList(${i})">
                                        <i class="fa-solid fa-trash-can"></i></button></td>
                                    
                              </tr>
        `
    });
    badListElm.innerHTML = str;
};


// delete item from taskList
const deleteTaskList = (i) => {
    //console.log(i)
    const itm = taskList.splice(i, 1); // stay at the current index then delete that 1 item out of the taskList, after that display the update
    display();
    return itm[0];

};


// delete item from bad list
const deleteBadList = i => {
    //console.log(i)
    const itm = badList.splice(i, 1); // stay at the current index then delete that 1 item out of the taskList, after that display the update
    displayBadList();
    return itm[0];

};


// mark task as to not to do item

const markNotToDo = i => {
    const badItem = deleteTaskList(i);
    badList.push(badItem);
    console.log(badItem);
    displayBadList();
};

// mark task as task item

const markAsTask = i => {
    const badItem = deleteTaskList(i);
    taskList.push(badItem);
    display();

};


// display total task hours
const taskTotalHours = () => {
    const total = taskList.reduce((acc, item) => acc + item.hr, 0);
    document.getElementById("total-hr").innerHTML = total;
    return total;

}

// display total bad hours
const badTotalHours