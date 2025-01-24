import React from 'react';
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine";
import cl from "./NavbarBtn.module.css";
import {Link} from "react-router-dom";
import { useTranslation } from "../../../hooks/useTranslation";

const NavbarBtn = ({navbarPosition, setNavbarPosition, index}) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    return (
        <Link to={`/${navbarPosition[index].name}`} 
            onClick={() => changeNavbarAndMine(setNavbarPosition, navbarPosition[index].name)} 
            className={cl.navbar__container__item}
        >
            <div className={cl.navbar__container__item__icon}>
                {
                    navbarPosition[index].isActive ? navbarPosition[index].on : navbarPosition[index].off
                }
            </div>
            <div className={cl.navbar__container__item__title}>
                {t(`Navbar.${navbarPosition[index].name}`)}
            </div>
        </Link>
    );
};

export default NavbarBtn;