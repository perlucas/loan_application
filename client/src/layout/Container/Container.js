import React from "react";
import { buildNavbarFromLinks } from "../Navbar/Navbar";

function Container(props) {
    return <React.Fragment>
        <main className='container'>
            {buildNavbarFromLinks(props.links)}
            {props.children}
        </main>
    </React.Fragment>
}

export default Container;