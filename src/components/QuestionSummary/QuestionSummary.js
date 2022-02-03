import styles from "./QuestionSummary.module.css";
import React from 'react';

let returnOp=(a,b,opr)=>{
    switch(opr)
    {
        case '+' : 
        return (a+b);
        
        case '-' : 
        return (a-b);
        
        case '/' : 
        return Math.floor(a/b);
        
        case 'x' : 
        return (a*b);
        
        default :
        return 'n.a'
    }
}

let QuestionSummary = (props) =>{
    let no = props.questionNum;
    let op1 = props.question.op1;
    let op2 = props.question.op2;
    let oprOption = ['+','-','/','x'];
    let opr = oprOption[props.question.opr-1];
    let ans = returnOp(op1,op2,opr);
    let finalClass = '';
    if(!props.question.ans)
    {
        finalClass = styles.unans;
    }
    else if(props.question.correct)
    {
        finalClass = styles.correct;
    }
    else {
        finalClass = styles.wrong;
    }
    return(
        <div className={`${styles.question} ${finalClass}`}>
        {props.questionNum}. {op1} {opr} {op2} = {ans}
        </div>
    )
} 

export default QuestionSummary;