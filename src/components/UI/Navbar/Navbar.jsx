import React, {useEffect, useLayoutEffect, useState} from 'react';
import cl from "./Navbar.module.css"
import ExchangeOn from "../NavbarIcon/ExchangeOn";
import ExchangeOff from "../NavbarIcon/ExchangeOff";
import MineOff from "../NavbarIcon/MineOff";
import MineOn from "../NavbarIcon/MineOn";
import AirdropOn from "../NavbarIcon/AirdropOn";
import AirdropOff from "../NavbarIcon/AirdropOff";
import EarnOn from "../NavbarIcon/EarnOn";
import EarnOff from "../NavbarIcon/EarnOff";
import FriendsOn from "../NavbarIcon/FriendsOn";
import FriendsOff from "../NavbarIcon/FriendsOff";
import {useLocation} from "react-router-dom";
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine"
import NavbarBtn from "../NavbarBtn/NavbarBtn";

const Navbar = () => {
    const [navbarPosition, setNavbarPosition] = useState([
        {id:1, name:"home", isActive: false, on: <ExchangeOn/>, off: <ExchangeOff/>},
        {id:2, name:"mine", isActive: false, on: <MineOn/>, off: <MineOff/>},
        {id:3, name:"friends", isActive: false, on: <FriendsOn/>, off: <FriendsOff/>},
        {id:4, name:"earn", isActive: false, on: <EarnOn/>, off: <EarnOff/>},
        {id:5, name:"airdrop", isActive: false, on: <AirdropOn/>, off: <AirdropOff/>},
    ])
    const pos = useLocation().pathname






    useEffect(() => {
        changeNavbarAndMine(setNavbarPosition, pos.slice(1))
    }, [])
    const setActive = (id) => {
        setNavbarPosition((prevState) => {
            return prevState.map((item) => {
                if (item.id === id) {
                    return { ...item, isActive: true };
                } else {
                    return { ...item, isActive: false };
                }
            });
        });
    };
    return (
        <div className={cl.navbar__container}>
            <div className={cl.navbar__container__block}>
                {navbarPosition.map((item, index) => {
                    return <NavbarBtn key={index} navbarPosition={navbarPosition} setNavbarPosition={setNavbarPosition} index={index}/>
                })}
            </div>
        </div>
    );
};

export default Navbar;