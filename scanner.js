function isKeyword (word) {
    const keywords=["if", "while", "for", "double", "float", "int", "boolean", "do", "return", "void", "main", "function"];
    return keywords.includes(word);
}

// Check that any character start with range a-z orA-Z or both and may be followed by underscore
function isIdentifier (word) {
    return /^[a-zA-Z_]\w*$/.test(word);
}


function isAssignmentOperator (c) {
    const assignmentOperator="-+*/=<>%";
    return assignmentOperator.includes(c);
}

function isSpecialCharacter (c) {
    const specialCharacter="!@#$^&(),;:{}[]?";
    return specialCharacter.includes(c);
}
// check the number that start number followed by one or more number and must be end with number
function isNumber (word) {
    return /^\d+$/.test(word);
}

let finished=[];
// Check function
function analyzeToken (token) {
    if(finished.includes(token)==false) {
        finished.push(token);
        if(isKeyword(token)) {
            console.log("Keyword:", token);
            let Keywordvalue=document.createElement("p");
            Keywordvalue.textContent=`keyword : ${token}`;
            theResult.appendChild(Keywordvalue);

        } else if(isIdentifier(token)) {
            console.log("Identifier:", token);
            let identifiervalue=document.createElement("p");
            identifiervalue.textContent=`Identifier : ${token}`;
            theResult.appendChild(identifiervalue);

        } else if(isNumber(token)) {
            console.log("Number:", token);
            let numberValue=document.createElement("p");
            numberValue.textContent=`Number : ${token}`;
            theResult.appendChild(numberValue);

        } else {
            for(const c of token) {
                if(isAssignmentOperator(c)) {
                    console.log("Assignment Assignment :", c);
                    let assignmentAssignment=document.createElement("p");
                    assignmentAssignment.textContent=`Operator : ${c}`;
                    theResult.appendChild(assignmentAssignment);
                }
                if(isSpecialCharacter(c)) {
                    console.log("Special Character : ", c);
                    let specialCharacter=document.createElement("p");
                    specialCharacter.textContent=`Special Character : ${c}`;
                    theResult.appendChild(specialCharacter);
                }
            }
        }
    }

}
let theInput=document.getElementById("input");
function lexicalAnalyzer (code) {
    let token="";
    for(let c of code) {
        // if;x
        if(isSpecialCharacter(c)||isAssignmentOperator(c)||c==" ") {
            if(token!=="") {
                analyzeToken(token);
                token="";
            }
            analyzeToken(c);
        } else if(code.indexOf(c)===code.length-1) {
            token+=c;
            analyzeToken(token);
        }
        else {
            token+=c;
        }
    }
}

window.onload=() => {
    theInput.focus();
};

let theReset=document.querySelector(".resetInput");
theReset.onclick=() => {
    theInput.value="";
    theInput.focus();
};
let theResult=document.querySelector(".result");

let theBtn=document.querySelector(".showDetails");
theBtn.onclick=() => {
    theResult.innerHTML="";
    if(theInput.value=="") {
        alert("Please Enter The Input");
    } else {
        lexicalAnalyzer(theInput.value);
        finished=[];
    }
};
