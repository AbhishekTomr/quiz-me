import styles from './EndQuiz.module.css'
import React from 'react'; 
import {useSelector} from 'react-redux'
import {useState} from 'react'
import Button from '../UI/Button/Button'
import QuestionSummary from '../QuestionSummary/QuestionSummary'

let EndQuiz = (props) =>{
    let data = useSelector((state)=>state.userInfo[props.currentPlayer-1]);
    let quesList = data.questionsList;
    let [questionNum,changeQuesNo] = useState(0);
    console.log(quesList);


    let userName = data.uname;
    let total = data.questions;
    let correctNo = quesList.reduce((count,item)=>{
        if(item.correct)
        {
            
            return +count+1;
        }
        else{
            return +count+0;
        }
    },0)
    let Unanswered = quesList.reduce((count,item)=>{
        if(item.ans)
        {
            
            return +count+0;
        }
        else{
            return +count+1;
        }
    },0)


    return(
        <div className={styles["summary-board"]}>
        <div className={styles.uname}>{userName}</div>
        <div className={styles.summary}>
        {quesList.map((item,index)=>{
            return <QuestionSummary key={index} questionNum = {index+1} question={item}/>
        })}
        </div>
        <div id='status' className={styles.status}>
        <div className={styles.info}>
        <div className={styles.questionLeft}>Total : {total}</div>
        <div className={styles.score}>Correct: {correctNo}</div>
        <div className={styles.score}>Not Answered: {Unanswered}</div>
        <div className={styles.score}>Incorrect: {total- (correctNo+Unanswered)}</div>
        </div>
        <Button data = {{'type':'button','className': styles.btn, onClick: ()=>{props.newQuiz(0)}}}>Quiz Again</Button>
        </div>
        </div>  
    )    
}

export default EndQuiz;