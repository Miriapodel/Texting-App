import React from "react";
import styles from "./Message.module.css";

function Message({msg}){

    const username = msg.username;
    const message = msg.message;
    const isLink = msg.isLink;
    const sentAt = msg.sentAt;

    return(
        <article className={styles.message}>
            <span>{username}</span>
            <section className={styles.msgAndTime}>
            {isLink? 
                <a href={message} target="_blank">See location</a>: 
                <span>{message}</span> 
            }
            <span className={styles.time}>{sentAt}</span>
            </section>
           
        </article>
    )
}

export default Message;