// 유저가 값입력
// + 버튼 클리하면, 할일 추가된다.
//delete버튼 누르면 할일 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다(render함수안에잇음 index는 지움)
// 1. check버튼을 클릭하는 순간 is complete를 false에서 true로(반대도)
// 2. true이면 끝난걸로 간주가고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로 보여주기
//Done, Not Done 탭을 누르면, 언더바가 이동한다
//Done은, Done 아이템만, Not Done탭은 Not Done 아이템만


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList=[];


addButton.addEventListener("click",addTask);
//onclick과 addEventListener차이
// onclick은 덮어씌워짐 1 2를 입력해도 마지막 2만 출력
// addEventListener는 누적 1 2입력하면 1 2 둘다 출력

function addTask(){
    //let taskContent = taskInput.value; //value 소문자로만, task 객체에 들어가서 필요없어짐
    let task  = { //객체 관련있는 정보 함수등을 하나로 뭉친것
        id: randomIDGenerate(),
        //id부여하는 이유는 개별로 선택하여 이벤트 적용하기 위해
        //아이디는 겹치면 안되기때문에 검색으로 아이디 찾는 함수 사용
        taskContent:taskInput.value, 
        //: 필터 셀렉터 느낌  taskContent 는 taskInput.value 선택
        isComplete:false //false 안끝남 true 끝남
        // isComplete 끝났는지 안끝났는지 묻는거
    }
    taskList.push(task);
    //taskList.push(taskContent); task 객체때문에 필요없어져서 ()안에 task로 대체
    console.log(taskList)
    render();
    
    //console.log("clicked"); //+버튼 눌럿을때 쿨릭되는지 확인
    //console.log(taskList); / 배열에 잘들어갔는지 확인
}

function render(){ // 그림 이벤트는 render로
    let resultHTML = '';
    for(let i =0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){//tasklist안에 iscomplete가 true라면
            resultHTML +=  `<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button onclick="deleteTask()">Delete</button>
        </div>
    </div>`
        }else{
        resultHTML +=  `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button onclick="deleteTask()">Delete</button>
        </div>
    </div>`
        }
    // taskList[i]만 넣으면 task 객체때문에(string이아니라서) object로 출력됨
    // 따라서 taskList[i].taskContent로 정확하게 객체안에 있는
    // taskContent만 찍어줘서 정상적으로 출력되게 만들어줌
    // taskList[i].id를 toggle에 넣는 이유는 생성될때 각각 아이디 부여를 위함
    // task-done을 추가한 이유는 글자선긋기 효과를 주기위해
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

function toggleComplete(id){ //check할때 id부여
    // console.log("id :",id) 아이디 나오는지 확인용
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            //taskList에 i번째 있는 아이템으로 받는 id가 
            // 매개변수로 받은 아이디와 같다면
            // isComplete의 값을 true로 바꾼다.
            taskList[i].isComplete = !taskList[i].isComplete;
            // 반대값을가져옴 ex) true는 false로 역도 가능
                // taskList[i].isComplete=true;  
                //true로 바뀌면 false로 안돌아오기때문에 사용x
            break; //찾는 아이템 나오면 for문 나오게   
        }
    }
    render(); // 함수를 불러줘야 적용된 이펙스사용
    console.log(taskList);
}

function deleteTask(){
    console.log("삭제");
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
    //generate random Id javascript 검색 후 깃허브
}

