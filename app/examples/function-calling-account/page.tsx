"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getAccount } from "../../utils/account";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

interface AccountData {
  AccountOpenSuccessfull?: boolean;
  AccountNumber?: number;
 }

const FunctionCalling = () => {
  const [accountData, setAccountData] = useState<AccountData>({});
  const isEmpty = Object.keys(accountData).length === 0;

  const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
    if (call?.function?.name !== "brokerage_individual") return;
    const args = JSON.parse(call.function.arguments);
  //const data = getWeather(args.City);
  const data = getAccount(args.SocialSecurityNumber);
    setAccountData(data);
    console.log(args)
    return JSON.stringify(data);
    //return JSON.stringify(call.function.arguments);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
        <WeatherWidget
            
          />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
