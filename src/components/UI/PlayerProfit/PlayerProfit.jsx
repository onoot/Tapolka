import React, {useState} from 'react';
import cl from './PlayerProfit.module.css';
import iconProfit from "./../../images/iconProfit.png"

const PlayerProfit = ({profit, setSettings}) => {
    return (
        <div className={cl.playerProfit__container}>
            <div className={cl.playerProfit__container__block}>
                <div className={cl.playerProfit__container__block__item}>
                    <img className={cl.playerProfit__container__item__icon} src={iconProfit} alt=""/>
                </div>
                <div className={cl.playerProfit__container__block__item}>
                    <div className={cl.playerProfit__container__block__item__profitInfo__text}>
                        Profit per hour
                    </div>
                    <div className={cl.playerProfit__container__block__item__profitInfo}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 10C20 15.5229 15.5229 20 10 20C7.08857 20 4.46775 18.7559 2.64041 16.7702C2.15897 16.2472 1.73441 15.6746 1.37388 15.062C0.500816 13.5771 0 11.8469 0 10C0 4.47714 4.47714 0 10 0C11.8473 0 13.5775 0.500816 15.062 1.37429C15.6747 1.73455 16.2472 2.15913 16.7698 2.64082C18.7555 4.46735 20 7.08857 20 10Z" fill="#F0CD00"/>
                            <path d="M20 9.99999C20 15.3984 15.7229 19.7975 10.3722 19.993C5.02163 19.7975 0.744492 15.3984 0.744492 9.99999C0.744492 4.60162 5.02163 0.202438 10.3722 0.00692749C15.7229 0.202438 20 4.60162 20 9.99999Z" fill="#FFDE50"/>
                            <path d="M16.7698 2.64083L2.64041 16.7702C2.15897 16.2473 1.73441 15.6747 1.37388 15.0621L15.062 1.3743C15.6747 1.73457 16.2472 2.15914 16.7698 2.64083ZM19.3102 6.34409L6.34367 19.3106C5.43301 18.9524 4.57995 18.4623 3.81184 17.8559L17.8559 3.81185C18.4624 4.57997 18.9524 5.4332 19.3102 6.34409Z" fill="#FFEA94"/>
                            <path d="M17.7706 10C17.7706 14.2914 14.2914 17.7706 10 17.7706C8.50531 17.7706 7.10939 17.3486 5.92449 16.6172C5.40941 16.2993 4.93314 15.9224 4.50531 15.4943C4.19077 15.1801 3.90374 14.8395 3.64735 14.4763C3.29117 13.972 2.99656 13.4269 2.7698 12.8527C2.43184 11.9976 2.24163 11.0678 2.23021 10.0955C2.22939 10.0637 2.22939 10.0318 2.22939 10C2.22939 5.70858 5.70816 2.2294 10 2.2294C10.0318 2.2294 10.0641 2.2294 10.0959 2.23022C11.0682 2.24165 11.9976 2.43226 12.8527 2.76981C13.4268 2.99673 13.9719 3.29133 14.4763 3.64736C14.84 3.9045 15.1804 4.19144 15.4943 4.50532C15.9225 4.93307 16.2994 5.40935 16.6171 5.9245C17.3486 7.1094 17.7706 8.50532 17.7706 10Z" fill="#FAA300"/>
                            <path d="M15.4943 4.50532L4.50531 15.4943C4.19077 15.1801 3.90373 14.8395 3.64735 14.4763C3.29117 13.972 2.99656 13.4269 2.7698 12.8527C2.43184 11.9976 2.24163 11.0678 2.23021 10.0955C2.22939 10.0637 2.22939 10.0318 2.22939 10C2.22939 5.70858 5.70816 2.2294 10 2.2294C10.0318 2.2294 10.0641 2.2294 10.0959 2.23022C11.0682 2.24165 11.9976 2.43226 12.8527 2.76981C13.4268 2.99673 13.9719 3.29133 14.4763 3.64736C14.84 3.9045 15.1804 4.19144 15.4943 4.50532Z" fill="#FFBD00"/>
                            <path d="M17.7704 10C17.7704 14.2914 14.2912 17.7706 9.9998 17.7706C9.85245 17.7706 9.70633 17.7665 9.56102 17.7584C13.6484 17.531 16.8924 14.1441 16.8924 10C16.8924 5.85593 13.6484 2.46899 9.56102 2.24165C9.70633 2.23348 9.85245 2.2294 9.9998 2.2294C14.2912 2.2294 17.7704 5.70858 17.7704 10Z" fill="#F68E00"/>
                            <path d="M9.744 9.40288V6.2559C10.2344 6.52648 10.5675 7.04868 10.5675 7.64733C10.5675 8.06962 10.9098 8.41194 11.3321 8.41194C11.7544 8.41194 12.0967 8.06962 12.0967 7.64733C12.0967 6.19219 11.0944 4.96697 9.744 4.62517V4.0028C9.744 3.58052 9.40167 3.23819 8.97939 3.23819C8.5571 3.23819 8.21478 3.58052 8.21478 4.0028V4.62513C6.86437 4.96697 5.86204 6.19215 5.86204 7.64729C5.86204 8.51615 6.11723 9.1937 6.64216 9.71864C7.0249 10.1014 7.53331 10.3846 8.21478 10.5922V13.7441C7.72433 13.4736 7.39127 12.9514 7.39127 12.3528C7.39127 11.9305 7.04894 11.5881 6.62665 11.5881C6.20437 11.5881 5.86204 11.9305 5.86204 12.3528C5.86204 13.8079 6.86437 15.0331 8.21478 15.3749V15.9973C8.21478 16.4195 8.5571 16.7619 8.97939 16.7619C9.40167 16.7619 9.744 16.4195 9.744 15.9973V15.3749C11.0944 15.0331 12.0967 13.8079 12.0967 12.3528C12.0967 11.4959 11.8306 10.7954 11.3058 10.2706C10.9244 9.88913 10.4096 9.60317 9.744 9.40288ZM7.72351 8.63733C7.56882 8.48268 7.39131 8.23035 7.39131 7.64729C7.39131 7.04864 7.72437 6.52648 8.21482 6.25586V8.96264C8.00857 8.86713 7.84531 8.75917 7.72351 8.63733ZM9.744 13.7441V11.029C10.4085 11.3385 10.5675 11.7812 10.5675 12.3528C10.5675 12.9514 10.2344 13.4736 9.744 13.7441Z" fill="#F68E00"/>
                            <path d="M10.7645 9.40288V6.2559C11.2549 6.52648 11.588 7.04868 11.588 7.64733C11.588 8.06962 11.9303 8.41194 12.3526 8.41194C12.7749 8.41194 13.1172 8.06962 13.1172 7.64733C13.1172 6.19219 12.1149 4.96697 10.7645 4.62517V4.0028C10.7645 3.58052 10.4222 3.23819 9.99988 3.23819C9.57759 3.23819 9.23527 3.58052 9.23527 4.0028V4.62513C7.88486 4.96697 6.88253 6.19215 6.88253 7.64729C6.88253 8.51615 7.13771 9.1937 7.66265 9.71864C8.04539 10.1014 8.5538 10.3846 9.23527 10.5922V13.7441C8.74482 13.4736 8.41175 12.9514 8.41175 12.3528C8.41175 11.9305 8.06943 11.5881 7.64714 11.5881C7.22486 11.5881 6.88253 11.9305 6.88253 12.3528C6.88253 13.8079 7.88486 15.0331 9.23527 15.3749V15.9973C9.23527 16.4195 9.57759 16.7619 9.99988 16.7619C10.4222 16.7619 10.7645 16.4195 10.7645 15.9973V15.3749C12.1149 15.0331 13.1172 13.8079 13.1172 12.3528C13.1172 11.4959 12.8511 10.7954 12.3263 10.2706C11.9449 9.88913 11.4301 9.60317 10.7645 9.40288ZM8.74396 8.63733C8.58927 8.48268 8.41175 8.23035 8.41175 7.64729C8.41175 7.04864 8.74482 6.52648 9.23527 6.25586V8.96264C9.02906 8.86713 8.8658 8.75917 8.74396 8.63733ZM10.7645 13.7441V11.029C11.429 11.3385 11.588 11.7812 11.588 12.3528C11.588 12.9514 11.2549 13.4736 10.7645 13.7441Z" fill="#FFEA94"/>
                        </svg>
                        {profit}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16C9.58225 16 11.129 15.5308 12.4446 14.6518C13.7602 13.7727 14.7855 12.5233 15.391 11.0615C15.9965 9.59966 16.155 7.99113 15.8463 6.43928C15.5376 4.88743 14.7757 3.46197 13.6569 2.34315C12.538 1.22433 11.1126 0.462403 9.56072 0.153721C8.00887 -0.15496 6.40034 0.00346629 4.93853 0.608967C3.47672 1.21447 2.22729 2.23985 1.34824 3.55544C0.469192 4.87104 0 6.41775 0 8C0.00229405 10.121 0.845886 12.1545 2.34568 13.6543C3.84547 15.1541 5.87897 15.9977 8 16ZM8 3.33334C8.19778 3.33334 8.39112 3.39199 8.55557 3.50187C8.72002 3.61175 8.84819 3.76793 8.92388 3.95065C8.99957 4.13338 9.01937 4.33445 8.98079 4.52843C8.9422 4.72241 8.84696 4.90059 8.70711 5.04044C8.56726 5.1803 8.38907 5.27554 8.19509 5.31412C8.00111 5.35271 7.80004 5.3329 7.61732 5.25722C7.43459 5.18153 7.27841 5.05336 7.16853 4.88891C7.05865 4.72446 7 4.53112 7 4.33334C7 4.06812 7.10536 3.81377 7.29289 3.62623C7.48043 3.43869 7.73478 3.33334 8 3.33334ZM7.33333 6.66667H8C8.35362 6.66667 8.69276 6.80715 8.94281 7.0572C9.19286 7.30724 9.33333 7.64638 9.33333 8V12C9.33333 12.1768 9.2631 12.3464 9.13807 12.4714C9.01305 12.5964 8.84348 12.6667 8.66667 12.6667C8.48986 12.6667 8.32029 12.5964 8.19526 12.4714C8.07024 12.3464 8 12.1768 8 12V8H7.33333C7.15652 8 6.98695 7.92977 6.86193 7.80474C6.73691 7.67972 6.66667 7.51015 6.66667 7.33334C6.66667 7.15653 6.73691 6.98696 6.86193 6.86193C6.98695 6.73691 7.15652 6.66667 7.33333 6.66667Z" fill="#8E8E8E"/>
                        </svg>
                    </div>
                </div>
                <button onClick={() => setSettings(true)} className={`${cl.playerProfit__container__block__item} ${cl.playerProfit__settingBtn}`}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.339177 15C1.02847 16.1963 2.55711 16.6073 3.75344 15.918L3.75586 15.9166L4.12668 15.7025C4.82668 16.3014 5.63128 16.7658 6.5 17.0725V17.5C6.5 18.8807 7.61929 20 9 20C10.3807 20 11.5 18.8807 11.5 17.5V17.0725C12.3688 16.7654 13.1735 16.3003 13.8733 15.7008L14.2458 15.9158C15.4424 16.6062 16.9721 16.1958 17.6625 14.9991C18.3528 13.8025 17.9425 12.2728 16.7458 11.5825L16.3758 11.3691C16.5424 10.4628 16.5424 9.53376 16.3758 8.62746L16.7458 8.41414C17.9424 7.72379 18.3528 6.1941 17.6625 4.99746C16.9721 3.80086 15.4425 3.39043 14.2458 4.08078L13.875 4.29496C13.1743 3.69679 12.3691 3.23319 11.5 2.9275V2.5C11.5 1.1193 10.3807 0 9 0C7.61929 0 6.5 1.1193 6.5 2.5V2.9275C5.63115 3.23463 4.82654 3.69967 4.12668 4.29918L3.75418 4.08336C2.55754 3.39297 1.02785 3.8034 0.337498 5C-0.352854 6.1966 0.0575367 7.72633 1.25418 8.41668L1.62418 8.63C1.45762 9.5363 1.45762 10.4654 1.62418 11.3717L1.25418 11.585C0.0608571 12.2772 -0.348205 13.8039 0.339177 15ZM9 6.66668C10.8409 6.66668 12.3333 8.15906 12.3333 10C12.3333 11.8409 10.8409 13.3333 9 13.3333C7.15906 13.3333 5.66668 11.8409 5.66668 10C5.66668 8.15906 7.15906 6.66668 9 6.66668Z" fill="white"/>
                    </svg>
                </button>
            </div>

        </div>
    );
};

export default PlayerProfit;