import React from "react";
import { useEffect } from "react";

type Prop = {
    greeting: string;
};

const Welcome = (props: Prop) => {
    useEffect(() => {
        console.log("Welcome Page mounted");
    }, []);

    return <h1>{props.greeting}</h1>;
};

export default Welcome;