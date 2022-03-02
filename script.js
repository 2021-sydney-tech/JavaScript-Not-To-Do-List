const taskList = [];
const badList = [];
const taskListElm = document.getElementById("task-list");
const badListElm = document.getElementById("bad-list");
const weekHrs = 7 * 24;

const handleOnSubmit = event => {


    const frDt = new FormData(event);
    const task = frDt.get("task");
    const hr = +frDt.get("hr");

    if(hr < 1 ){
        return alert("Please enter valid number");  // 
    }
    

    const ttlHr = taskTotalHrs();
	
    if (ttlHr + hr > weekHrs) {
		return alert("You have exceeded the weekly hours");
	};

    
    
    const obj = {
        task,
        hr,
    };
    //console.log(obj);

    taskList.push(obj);
    display();
 



};

const display = () => {
    let str = "";
    taskList.map((item, i) =>{
        str += 
        `
        <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>${item.task}</td>
                                <td>${item.hr}</td>
                                <td>
                                    <button class="btn btn-danger" onClick="deleteTaskList(${i})">
                                        <i class="fa-solid fa-trash-can" ></i></button>
                                    <button class="btn btn-primary" onclick = "markAsNotToDo(${i})">
                                        <i class="fa-solid fa-arrow-right"></i></button></td>
                              </tr>
        
        `
    });
    taskListElm.innerHTML = str;

    taskTotalHrs();

};

const displayBadList = () => {
    let str = "";
    badList.map((item, i) =>{
        str += 
        `
        <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>${item.task}</td>
                                <td>${item.hr}</td>
                                <td>
                                    <button class="btn btn-primary" onclick = "markAsTask(${i})">
                                        <i class="fa-solid fa-arrow-left"></i></button>
                                    <button class="btn btn-danger" onClick="deleteBadList(${i})">
                                        <i class="fa-solid fa-trash-can" ></i></button></td>
                                    
                              </tr>
        
        `
    });
    badListElm.innerHTML = str;
    taskTotalHrs()

};


const deleteTaskList = i => {
    const itm = taskList.splice(i, 1);
    //console.log(itm);
    display();
    return itm[0];
 

}


const markAsNotToDo = i => {
    const badItm = deleteTaskList(i);
    badList.push(badItm);
    //console.log(badItm);
    //console.log(badList);
    displayBadList();
};

const deleteBadList = i =>{
    const itm = badList.splice(i, 1);
    displayBadList();
    return itm[0];
};

const markAsTask = i => {
    const badItm = deleteBadList(i);
    taskList.push(badItm);
    display();
};


// display total task hours
const taskTotalHrs = () => {
	const total = taskList.reduce((acc, item) => acc + item.hr, 0);

    const ttlBadHr = badTotalHrs();
    const grandTotal = total + ttlBadHr;
	document.getElementById("total-hr").innerHTML = grandTotal;
    
	return grandTotal;
};


// display total bad hours
const badTotalHrs = () => {
    const total = badList.reduce((acc, item) => acc + item.hr, 0);
    document.getElementById("bad-hr").innerHTML = total;
    return total;


};
