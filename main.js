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
let tabs = document.querySelectorAll(".task-tabs div");

// ("")안에 조건에 맞는 모든 것을 가져옴 -> id name등에 제한 받지 않음
// querySelector랑 차이는 한개냐 여러개냐 
// (#sections) -> sections 아이디를 가진 요소를 찾음.
// (.section) -> section 클래스명을 가진 요소를 찾음.
// ex) querySelector
// let section = document.querySelector("#sections .section");
// ex) querySelectorAll
// let sections = document.querySelectorAll("#sections, #sections .section");
// console.log(tabs) div갯수확인

let mode = 'all' // -> Html에서 div All탭 id 값
let filterList = [];

for(let i=1; i<tabs.length; i++){ //i=1부터인 이유는 0번쨰 div는 underline이라 필요없음
    tabs[i].addEventListener("click", function(event){
        filter(event)
    })
    // add이벤트는 클릭하면 function event안에 filter 적용
    // 내가 무슨 tab을 선택했는지 알아야해서 function event사용
}


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
    //console.log(taskList)
    render();
    
    //console.log("clicked"); //+버튼 눌럿을때 쿨릭되는지 확인
    //console.log(taskList); / 배열에 잘들어갔는지 확인
}

function render(){ // 그림 이벤트는 render로 //값이 업데이트되면 UI(render)도: 함수에 render넣으면됨
    //내가 선택한 탭에 따라서 리스트를 달리 보여준다
    // 지금은 taskList만 가능 
    // all만 보여줄꺼면 tasklist만 보여줘도 되지만
    // not done done을 보여줄려면 filterList도 필요
    // 내가 선택한 것에 대한 정보는 mode가 가지고 있음 
    let list =[]; // 리스트를 달리 보여주기 위해
    // 내가 선택한 탭 만드는 식 (아래)
    if(mode ==="all"){ // all -> tasklist
        list = taskList;
    } else{ //not done done -> filterList
        list = filterList;
    }
    
    let resultHTML = '';
    for(let i =0; i<list.length; i++){
        if(list[i].isComplete == true){//tasklist안에 iscomplete가 true라면
            resultHTML +=  `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`
        }else{
        resultHTML +=  `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`
        }


    // let resultHTML = '';
    // for(let i =0; i<taskList.length; i++){
    //     if(taskList[i].isComplete == true){//tasklist안에 iscomplete가 true라면
    //         resultHTML +=  `<div class="task">
    //     <div class="task-done">${taskList[i].taskContent}</div>
    //     <div>
    //         <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
    //         <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
    //     </div>
    // </div>`
    //     }else{
    //     resultHTML +=  `<div class="task">
    //     <div>${taskList[i].taskContent}</div>
    //     <div>
    //         <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
    //         <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
    //     </div>
    // </div>`
    //     }
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
}

function deleteTask(id){
   // console.log("삭제",id); 삭제버튼 눌렀을때 id나오면서 작동하는지 확인
   // splice(시작점,몇개)를 사용하기위해 몇번째 인덱스 값인지 알기위해 for문씀
   for(let i = 0; i<taskList.length; i++){
    if(taskList[i].id == id){//taskList의 id값이랑 내가 받은 id값이 같다면
        taskList.splice(i,1); //i번째 1개 삭제
        break;
    }
   }
   render(); //위치 중요
}

function filter(event){ 
    // 매개변수를 addeventListener로부터 event를 받음 
    // event안에는 내가 누구를 클릭했는지에 대한 정보가 있음
    // all not done done div각각을 구분하기 위해 id를 줘야함
    // 고정된 값(=탭)이라 html에 바로줌
    console.log("filter",event.target.id);
    // .target정확하게 뭘클릭했는지 보여줌 ex) <div id = not done> Not Done </div>
    //.target.id 아이디 값만 가져옴 ex) not done
    
    mode = event.target.id; 
    // 너무 길어서 줄여줌
    //필요한 이유는 바로위 기술
    // mode값은 render에서도 필요해서 지역변수가 아닌 전역변수로 바꿔줌
    filterList = []; 
    // 필터된 리스트 모음이 필요함 render도 필요해서 전역변수로
    // 다시 비워주지 않으면 클릭할때마다 반복되서 ui에 계속 not done이 반복됨
    // ex) not done누르면 1,3나오면 다시누르면 1,3,1,3나옴
    if(mode == "all"){ //event.target.id all이면
        //전체리스트 보여줌
        render(); // render가 사실상 전체리스트 보여줌
    } else if(mode == "not done"){
        //Not done인 아이템을 보여줌
        // 진행중은 task.isComplete=false  
        // 진행중인건 컴퓨터가 구분못하기 때문
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                // taskList안에 i번째 값이 false다 == 진행중의미
                filterList.push(taskList[i])
                // 필터된 리스트 모음이 필요해서 i번째값을 저장
            }
        }
        render(); //UI바꿔주는 기능
        console.log("진행중",filterList);
    } else if(mode === "done"){
        // done인 아이템을 보여줌
        // 끝난것은 task.isComplete=true 
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]) 
            }
        }  // not done 반대로 하면됨
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
    //generate random Id javascript 검색 후 깃허브
}

