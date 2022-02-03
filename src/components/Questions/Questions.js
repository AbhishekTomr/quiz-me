import { Fragment, useEffect, useState,useRef } from 'react'
import styles from '../PlayQuiz/PlayQuiz.module.css'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input';
import {useDispatch} from 'react-redux';
import UserActions from '../../store/userslice'

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

let Question = (props) => {

    let no = props.Qno;
    let op1 = props.Question.op1;
    let op2 = props.Question.op2;
    let oprOption = ['+','-','/','x'];
    let opr = oprOption[props.Question.opr-1];
    let ans = returnOp(op1,op2,opr);
    let [ansInp,changeAnsInp] = useState('');
    let isFinal = (no==props.total-1)?true:false;
    let [isCorrect,changeIsCorrect] = useState(false);
    let [isIncorrect,changeIsIncorrect] = useState(false);
    let [isAnswered,changeIsAnswered] = useState(false);
    let dispatchFn = useDispatch();
    let next = useRef();
    let finish = useRef();
    let inp = useRef();
    
    let checkAnswer =(flag)=>{
         inp.current.setAttribute('disabled','true');
         //checkAns
        let data = ansInp;
        if(data.trim().length==0)
            {
                changeIsAnswered(false);
                changeIsCorrect(false);
                changeIsIncorrect(true);
            }
            else if(data==ans)
            {   changeIsAnswered(true);
                changeIsIncorrect(false);
                changeIsCorrect(true);
            }
            else{
                changeIsAnswered(true);
                changeIsCorrect(false);
                changeIsIncorrect(true);
            }
        if(flag){
            //when next Question is pressed;
            changeAnsInp('');
            inp.current.removeAttribute('disabled');
            dispatchFn(UserActions.changeAns({id:no,user:props.user,isAns:isAnswered}));
            dispatchFn(UserActions.changeCorrect({id:no,user:props.user,isCorrect:isCorrect}));
            props.nextQues();
        }
    }
    useEffect(()=>{
        changeIsAnswered(false);
        changeIsCorrect(false);
        changeIsIncorrect(false);
        inp.current.focus();
    },[no]);
    return (
        <Fragment>
                <div id='quesNo' className={styles.questionNo}>Question Number : {no+1}</div>
                <div id='question' className={styles.question}>
                <div className={styles.op} id='op1'>{op1}</div>
                <div id='operand' className={styles.op}>{opr}</div>
                <div className={styles.op} id='op2'>{op2}</div>
                <div className={styles.op}>=</div>
                <Input data={{className:styles.opr,id:'op3',value:ansInp,ref:inp,onChange:(e)=>{changeAnsInp(e.target.value)},disabled:false}}></Input>
                </div>
                <div id='correctAns' className={styles.correct}>
                {isCorrect && <p className={styles.correctAns}>Correct Answer !</p>}
                {isIncorrect && <p className={styles.wrongAns}>Wrong Answer, Correct Answer is {ans}</p>}
                </div>
                <div id='btn'>
                <Button data={{id:'checkAns',className:styles.btn,onClick:()=>{checkAnswer(false)}}}>Submit Answer</Button>
                {!isFinal && <Button data={{id:'nextQues',className:styles.btn,ref:next,onClick:()=>{checkAnswer(true)}}}>Next Question</Button>}
                {isFinal && <Button data={{id:'finishQues',className:styles.btn,ref:finish,onClick:()=>{checkAnswer(true)}}}>Finish Quiz</Button>}
                </div>
        </Fragment>
    )
}

export default Question;