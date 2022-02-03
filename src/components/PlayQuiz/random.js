import styles from './PlayQuiz.module.css'
import Button from '../UI/Button/Button'
import {useSelector} from 'react-redux';
import { useRef, useState } from 'react';
import Input from '../UI/Input/Input';


let PlayQuiz = (props) =>{
    let returnOp=(a,b,opr)=>{
        switch(opr)
        {
            case '+' : 
            return (a+b);
            break;
            case '-' : 
            return (a-b);
            break;
            case '/' : 
            return (a/b);
            break;
            case '*' : 
            return (a*b);
            break; 
            default :
            return 'n.a'
        }
    }

    let checkAns = (data,flag) => {
        if(flag)
        {
            if(data==result)
            {
                wrongP.current.style.display = 'none';
                correctP.current.style.display = 'initial';
            }
            else{
                correctP.current.style.display = 'none';
                wrongP.current.style.display = 'initial';
            }
            return;
        }
        else{
            //update visited

        ansInp.current.value = '';

        changeVisited((previousState)=>{
            let newState = [...previousState];
            newState.push(quesList[currentQuestion]);
            return newState;
        })
        if(data.trim().length==0)
        {
            //update not answered
            changeUnAns((previousState)=>{
                let newState = [...previousState];
                newState.push(quesList[currentQuestion]);
                return newState;
            })
        }
        if(data==result)
        {
            //update correct
            changeCorrect((previousState)=>{
                let newState = [...previousState];
                newState.push(quesList[currentQuestion]);
                return newState;}
                )
        }
        else{ 
            changeInCorrect((previousState)=>{
                let newState = [...previousState];
                newState.push(quesList[currentQuestion]);
                return newState;}
                )
        }
        changeCurrentQuestion((previousState)=>{
            let newState = previousState+1;
            return newState;

        });
    }
    }

    console.log("running");

    let data = useSelector((state)=>state.userInfo[props.currentPlayer-1]);
    let uname = data.uname;
    let total = data.questions;
    let [correct1,changeCorrect] = useState([]);
    let [visited,changeVisited] = useState([]);
    let [unAns,changeUnAns] = useState([]);
    let [incorrect,changeInCorrect] = useState([]);
    let quesList = data.questionsList;
    let [currentQuestion,changeCurrentQuestion] = useState(0);
    let oprOption = ['+','-','/','*'];
    let op1 = quesList[currentQuestion].op1;
    let op2 = quesList[currentQuestion].op1
    let opr = oprOption[quesList[currentQuestion].opr-1];  
    
    let result = returnOp(op1,op2,opr);
    let ansInp = useRef();
    let correctP = useRef();
    let wrongP = useRef();
    let finalQuestion = (currentQuestion===total-1)?true:false;

    return(
        <div className={styles["game-panel"]}>
            <div id='quesNo' className={styles.questionNo}>Question Number : {currentQuestion+1}</div>
            <div id='question' className={styles.question}>
            <div className={styles.op} id='op1'>{op1}</div>
            <div id='operand' className={styles.op}>{opr}</div>
            <div className={styles.op} id='op2'>{op2}</div>
            <div className={styles.op}>=</div>
            <Input data={{className:styles.opr,id:'op3',ref:ansInp}}></Input>
            </div>
            <div id='correctAns' className={styles.correct}>
            <p className={styles.correctAns} ref={correctP}>Correct Answer !</p>
            <p className={styles.wrongAns} ref={wrongP}>Wrong Answer, Correct Answer is {result}</p>
            </div>
            <div id='btn'>
            <Button data={{id:'checkAns',className:styles.btn,onClick:(e)=>{checkAns(ansInp.current.value,true)}}}>Check Answer</Button>
            {!finalQuestion&&<Button data={{id:'nextQues',className:styles.btn,onClick:(e)=>{checkAns(ansInp.current.value,false)}}}>Next Question</Button>}
            {finalQuestion&&<Button data={{id:'finishQues',className:styles.btn,onClick:(e)=>{FinishQuiz()}}}>Finish Quiz</Button>}
            </div>
            <div className={styles.uname}>{uname}</div>
            <div id='status' className={styles.status}>
            <div className={styles.questionLeft}>Total : {total}</div>
            <div className={styles.score}>Correct: {correct1.length}</div>
            <div className={styles.left}>Left: {total - visited.length}</div>
            </div>
        </div>
    )    
}

export default PlayQuiz;

