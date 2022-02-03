import styles from './PlayQuiz.module.css'
import Question from "../Questions/Questions"
import {useSelector} from 'react-redux';
import {useState} from 'react';
import React from 'react';

let PlayQuiz = (props) => {
    let data = useSelector((state)=>state.userInfo[props.currentPlayer-1]);
    let quesList = data.questionsList;
    let [questionNum,changeQuesNo] = useState(0);


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

    let nextQues = ()=>{
        if(questionNum!==total-1)
        changeQuesNo(previous=>previous+1);
        else if(questionNum==total-1)
        props.endQuiz(2);
    }


    return(
            <div className={styles["game-panel"]}>
                <Question 
                total = {total}
                Qno = {questionNum}
                user = {props.currentPlayer-1}
                Question = {quesList[questionNum]} 
                nextQues={nextQues}/>
                <div className={styles.uname}>{userName}</div>
                <div id='status' className={styles.status}>
                <div className={styles.questionLeft}>Total : {total}</div>
                <div className={styles.score}>Correct: {correctNo}</div>
                <div className={styles.left}>Left: {total- questionNum}</div>
                </div>
            </div>  
    )
}

export default PlayQuiz;