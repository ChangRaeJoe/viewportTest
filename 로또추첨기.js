function winLottoNumber() {
    const candidate = Array(45).fill().map((val, idx)=>{
        return idx+1;
    })
    
    const shuffle = []
    while(candidate.length >0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0])
    }
    
    const winNumber = [...shuffle.slice(0,6)]
    const bonus = shuffle[shuffle.length-1]
    
    winNumber.sort((a,b) =>{
        return a-b;
    })
    
    const js_win_num = document.querySelector('#js-win-num')
    
    let i;
    for(i=0; i<winNumber.length; i++) {
        const doc = document.createElement('span')
        doc.className = "js-circle-num" + i;
        doc.textContent = winNumber[i]
        js_win_num.append(doc)
        setTimeout(()=>{
            doc.classList.add("show-ani");
        }, i*1000)
    }
    
    const js_win_bonus = document.querySelector('#js-win-bonus')
    const bonus_span = document.createElement('span')
    bonus_span.className = "js-circle-num" + i;
    bonus_span.textContent = bonus;
    setTimeout(()=>{
        bonus_span.className = "show-ani";
    }, i*1000)
    
    js_win_bonus.append(bonus_span)
    
    return [...winNumber, bonus]
}

function fillCompareBall(compareVal) {
    document.querySelectorAll('#js-win-num > span').forEach((node) =>{
        if(compareVal.indexOf(parseInt(node.textContent,10)) > -1) {
            node.classList.add('js-background-right');
            console.dir(node.classList)
        } else {
        }
    })
    
}

// 선택할 공 생성
const selectBall = document.querySelector('.js-select-ball')

let selectedBall = 0;
let num = 0;
for(;num<45; num++) {
    const doc = document.createElement('span')
    doc.textContent = num+1;
    doc.addEventListener('click', function(event){

        const clsName = event.target.classList;
        const str = 'js-background-click';
        if(clsName.contains(str)) {
            clsName.remove(str)
            selectedBall-=1;
        } else {
            // cnt확인 7개
            if(selectedBall >= 7) {
                alert('7개를 모두 선택했습니다.')
                return;
            }
            clsName.add(str)
            selectedBall +=1;
        }
    })

    selectBall.append(doc)
}

document.querySelector('.js-win-btn').addEventListener('click', (e) =>{
    const userInput = Array.from(document.querySelectorAll('.js-background-click'))
    
    if(userInput.length <7) {
        alert('7개를 선택해 주세요')
        return;
    } else {
        e.target.disabled = true;
    }

    const userInputNum = userInput.map(val =>{
        return parseInt(val.textContent, 10);
    })
    const winNumber = winLottoNumber()

    // userInputNum, winNumber비교
    const compareVal = userInputNum.filter((val) =>{
        return winNumber.indexOf(val)< 0 ? false: true;
    })
    fillCompareBall(compareVal)
})