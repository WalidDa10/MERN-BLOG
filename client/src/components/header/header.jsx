import React, { useState } from 'react';
import "./header.css"
import Navbar from './Navbar';
import HeaderLeft from './headerLeft';
import HeaderRight from './headerRight';
const Header = () => {

 const [toggle, settogggle]= useState(false)
    return (
        <header className="header">
            <HeaderLeft toggle = {toggle} settogggle={settogggle} />
            <Navbar toggle = {toggle} settogggle={settogggle} />
            <HeaderRight/>
            
        </header>
    );
};

export default Header;