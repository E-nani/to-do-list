// 유저가 값입력
// + 버튼 클리하면, 할일 추가된다.
//delete버튼 누르면 할일 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//Done, Not Done 탭을 누르면, 언더바가 이동한다
//Done은, Done 아이템만, Not Done탭은 Not Done 아이템만


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList=[];


addButton.addEventListener("click",addTask);

function addTask(){
    let taskContent = taskInput.value; //value 소문자로만
    taskList.push(taskContent);
    render();
    
    //console.log("clicked"); //+버튼 눌럿을때 쿨릭되는지 확인
    //console.log(taskList); / 배열에 잘들어갔는지 확인
}

function render(){
    let resultHTML = '';
    for(let i =0; i<taskList.length; i++){
        resultHTML +=  `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`
    }

    document.getElementById("task-board").innerHTML=resultHTML;
    // innerHTML: 해당 Element의 HTML/XML을 가져옴 
    //             ex)가져온게 숨겨진 텍스트(안읽히는것)라고 나옴
    //                 안녕하세요 <span> 숨겨진 텍스트 </span>
    // innerText: 보여지는 텍스트만 가져옴 
    //             ex) 숨겨진텍스트는 가져오지 않음
    //                 안녕하세요
    // textContent: 텍스트값을 그대로 읽음 
    //             ex)숨겨진 텍스트라고 문자열로 가져옴
    //                 안녕하세요 숨겨진 텍스트
}

