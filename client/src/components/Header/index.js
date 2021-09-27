import React from 'react';

// re-import when we have a link
// import { Link } from 'react-router-dom'

function Header(props) {
    return (
        <header >
            {props.children}
        </header>
    )
}

export default Header;