import React, { useEffect, useState } from 'react';
import cl from "../Settings/Settings.module.css";
import clD from "./Boost.module.css";
import ButtonClose from "../ButtonSettingBack/ButtonClose";
import { changeNavbarAndMine } from "../../hooks/changeNavbarAndMine";
import { convertMoneyToReduction } from "../../hooks/converMoney";
import Money from "../Money/Money";
import { usePlayerStore } from '../../../store/playerStore.mjs';
import { toast } from 'react-toastify';
import { useTranslation } from '../../../hooks/useTranslation';

const Boost = ({ visible, setVisible, money }) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);
    const player = usePlayerStore((state) => state.player);
    const updatePlayer = usePlayerStore((state) => state.updatePlayer);
    const url = 'https://tongaroo.fun';
    const [isLoading, setIsLoading] = useState(false);

    const [boosters, setBoosters] = useState([]);

    // const [boosters, setBoosters] = useState([
    //     { id: 1, name: "Multitap", benefit: 1000, level: 1, basePrice: 1000, img: "multitap" },
    //     { id: 2, name: "Energy limit", benefit: 1000, level: 1, basePrice: 1000, img: "lightning" }
    // ]);

    useEffect(() => {
        setBoosters([
            { 
                id: 1, 
                name: t('Boost.items.multitap'), 
                benefit: 1000, 
                level: player?.boost?.multiplier?.level, 
                basePrice: 1000, 
                img: "multitap" 
            },
            { 
                id: 2, 
                name: t('Boost.items.energyLimit'), 
                benefit: 1000, 
                level: player?.boost?.energiLimit?.level, 
                basePrice: 1000, 
                img: "lightning" 
            }
        ])
    }, [player?.boost, language]);

    const calculatePrice = (booster) =>
        booster.basePrice * (booster.level+1) * (booster.level === 1 ? 1 : 2);

    const handleBoostResponse = (data) => {
        // Обновление состояния игрока
        updatePlayer({
            max_energy: data.max_energy, 
            energy: data.energy||player.energy,        
            boost: data.boost,          
        });
    };
    

    const booster = async (id) => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error(t('Boost.errors.tokenNotFound'), { theme: 'dark' });
                return;
            }

            const booster = id === 0
                ? { name: 'full', basePrice: 0, level: 0 }
                : boosters.find((item) => item.id === id);

            if (!booster) {
                toast.error(t('Boost.errors.boosterNotFound'), { theme: 'dark' });
                return;
            }

            const nextPrice = calculatePrice(booster);
            if (money < nextPrice) {
                toast.error(t('Boost.errors.notEnoughMoney'), { theme: 'dark' });
                return;
            }

            const req = await fetch(`${url}/api/boost/${player?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ boost: booster.name })
            });

            if (!req.ok) {
                const errorResponse = await req.json();
                toast.error(errorResponse.message || t('Boost.errors.unknown'), { theme: 'dark' });
                return;
            }

            const data = await req.json();
            toast.success(t('Boost.success'), { theme: 'dark' });

            handleBoostResponse(data);

            if (id !== 0) {
                setBoosters((prev) =>
                    prev.map((b) =>
                        b.id === id ? { ...b, level: b.level + 1 } : b
                    )
                );
            }

            setVisible(false);
        } catch (error) {
            toast.error(error.message, { theme: 'dark' });
        } finally {
            setIsLoading(false);
        }
    };

    const rootClasses = [cl.settings__container];
    if (visible) 
        rootClasses.push(cl.active);

    return (
        <div>
            <div className={rootClasses.join(" ")}>
                <div className={cl.settings__container__titlePanel}>
                    <ButtonClose setVisible={setVisible} />
                    <div className={cl.settings__container__title}>
                        {t('Boost.title')}
                    </div>
                </div>
                <div className={clD.boosters__balance}>
                    <div className={clD.boosters__balance__title}>
                        {t('Boost.balance.title')}
                    </div>
                    <div>
                        <Money money={money} />
                    </div>
                </div>
                <div className={cl.settings__container__settingBlock}>
                    {t('Boost.sections.freeDaily')}
                    <div className={clD.boosters__container}>
                        <div className={clD.boosters__container__block}>
                            <div className={clD.boosters__container__block_img}>
                                <img src={require(`../../images/lightning.webp`)} alt="" />
                            </div>
                        </div>
                        <div onClick={() => booster(0)} className={clD.boosters__container__block}>
                            <div className={clD.boosters__container__block__title}>
                                {t('Boost.items.fullEnergy')}
                            </div>
                            <div className={clD.boosters__container__block__info}>
                                <div className={clD.boosters__container__block__level}>
                                    {player?.boost?.fullEnergi?.cont || 0}/{player?.boost?.fullEnergi?.max_count || 3} {t('Boost.items.available')}
                                </div>
                            </div>
                        </div>
                    </div>
                    {t('Boost.sections.boosters')}

                    {boosters.map((prop) => {
                        return <div key={prop.id} onClick={() => booster(prop.id)} className={clD.boosters__container}>
                            <div className={clD.boosters__container__block}>
                                <div className={clD.boosters__container__block_img}>
                                    <img src={require(`../../images/${prop.img}.webp`)} alt="" />
                                </div>
                            </div>
                            <div className={clD.boosters__container__block}>
                                <div className={clD.boosters__container__block__title}>
                                    {prop.name}
                                </div>
                                <div className={clD.boosters__container__block__info}>
                                    <div className={clD.boosters__container__block__svg}>
                                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 10C20 15.5229 15.5229 20 10 20C7.08857 20 4.46775 18.7559 2.64041 16.7702C2.15897 16.2472 1.73441 15.6746 1.37388 15.062C0.500816 13.5771 0 11.8469 0 10C0 4.47714 4.47714 0 10 0C11.8473 0 13.5775 0.500816 15.062 1.37429C15.6747 1.73455 16.2472 2.15913 16.7698 2.64082C18.7555 4.46735 20 7.08857 20 10Z" fill="#F0CD00" />
                                            <path d="M20 9.99999C20 15.3984 15.7229 19.7975 10.3722 19.993C5.02163 19.7975 0.744492 15.3984 0.744492 9.99999C0.744492 4.60162 5.02163 0.202438 10.3722 0.00692749C15.7229 0.202438 20 4.60162 20 9.99999Z" fill="#FFDE50" />
                                            <path d="M16.7698 2.64083L2.64041 16.7702C2.15897 16.2473 1.73441 15.6747 1.37388 15.0621L15.062 1.3743C15.6747 1.73457 16.2472 2.15914 16.7698 2.64083ZM19.3102 6.34409L6.34367 19.3106C5.43301 18.9524 4.57995 18.4623 3.81184 17.8559L17.8559 3.81185C18.4624 4.57997 18.9524 5.4332 19.3102 6.34409Z" fill="#FFEA94" />
                                            <path d="M17.7706 10C17.7706 14.2914 14.2914 17.7706 10 17.7706C8.50531 17.7706 7.10939 17.3486 5.92449 16.6172C5.40941 16.2993 4.93314 15.9224 4.50531 15.4943C4.19077 15.1801 3.90374 14.8395 3.64735 14.4763C3.29117 13.972 2.99656 13.4269 2.7698 12.8527C2.43184 11.9976 2.24163 11.0678 2.23021 10.0955C2.22939 10.0637 2.22939 10.0318 2.22939 10C2.22939 5.70858 5.70816 2.2294 10 2.2294C10.0318 2.2294 10.0641 2.2294 10.0959 2.23022C11.0682 2.24165 11.9976 2.43226 12.8527 2.76981C13.4268 2.99673 13.9719 3.29133 14.4763 3.64736C14.84 3.9045 15.1804 4.19144 15.4943 4.50532C15.9225 4.93307 16.2994 5.40935 16.6171 5.9245C17.3486 7.1094 17.7706 8.50532 17.7706 10Z" fill="#FAA300" />
                                            <path d="M15.4943 4.50532L4.50531 15.4943C4.19077 15.1801 3.90373 14.8395 3.64735 14.4763C3.29117 13.972 2.99656 13.4269 2.7698 12.8527C2.43184 11.9976 2.24163 11.0678 2.23021 10.0955C2.22939 10.0637 2.22939 10.0318 2.22939 10C2.22939 5.70858 5.70816 2.2294 10 2.2294C10.0318 2.2294 10.0641 2.2294 10.0959 2.23022C11.0682 2.24165 11.9976 2.43226 12.8527 2.76981C13.4268 2.99673 13.9719 3.29133 14.4763 3.64736C14.84 3.9045 15.1804 4.19144 15.4943 4.50532Z" fill="#FFBD00" />
                                            <path d="M17.7704 10C17.7704 14.2914 14.2912 17.7706 9.9998 17.7706C9.85245 17.7706 9.70633 17.7665 9.56102 17.7584C13.6484 17.531 16.8924 14.1441 16.8924 10C16.8924 5.85593 13.6484 2.46899 9.56102 2.24165C9.70633 2.23348 9.85245 2.2294 9.9998 2.2294C14.2912 2.2294 17.7704 5.70858 17.7704 10Z" fill="#F68E00" />
                                            <path d="M9.744 9.40288V6.2559C10.2344 6.52648 10.5675 7.04868 10.5675 7.64733C10.5675 8.06962 10.9098 8.41194 11.3321 8.41194C11.7544 8.41194 12.0967 8.06962 12.0967 7.64733C12.0967 6.19219 11.0944 4.96697 9.744 4.62517V4.0028C9.744 3.58052 9.40167 3.23819 8.97939 3.23819C8.5571 3.23819 8.21478 3.58052 8.21478 4.0028V4.62513C6.86437 4.96697 5.86204 6.19215 5.86204 7.64729C5.86204 8.51615 6.11723 9.1937 6.64216 9.71864C7.0249 10.1014 7.53331 10.3846 8.21478 10.5922V13.7441C7.72433 13.4736 7.39127 12.9514 7.39127 12.3528C7.39127 11.9305 7.04894 11.5881 6.62665 11.5881C6.20437 11.5881 5.86204 11.9305 5.86204 12.3528C5.86204 13.8079 6.86437 15.0331 8.21478 15.3749V15.9973C8.21478 16.4195 8.5571 16.7619 8.97939 16.7619C9.40167 16.7619 9.744 16.4195 9.744 15.9973V15.3749C11.0944 15.0331 12.0967 13.8079 12.0967 12.3528C12.0967 11.4959 11.8306 10.7954 11.3058 10.2706C10.9244 9.88913 10.4096 9.60317 9.744 9.40288ZM7.72351 8.63733C7.56882 8.48268 7.39131 8.23035 7.39131 7.64729C7.39131 7.04864 7.72437 6.52648 8.21482 6.25586V8.96264C8.00857 8.86713 7.84531 8.75917 7.72351 8.63733ZM9.744 13.7441V11.029C10.4085 11.3385 10.5675 11.7812 10.5675 12.3528C10.5675 12.9514 10.2344 13.4736 9.744 13.7441Z" fill="#F68E00" />
                                            <path d="M10.7645 9.40288V6.2559C11.2549 6.52648 11.588 7.04868 11.588 7.64733C11.588 8.06962 11.9303 8.41194 12.3526 8.41194C12.7749 8.41194 13.1172 8.06962 13.1172 7.64733C13.1172 6.19219 12.1149 4.96697 10.7645 4.62517V4.0028C10.7645 3.58052 10.4222 3.23819 9.99988 3.23819C9.57759 3.23819 9.23527 3.58052 9.23527 4.0028V4.62513C7.88486 4.96697 6.88253 6.19215 6.88253 7.64729C6.88253 8.51615 7.13771 9.1937 7.66265 9.71864C8.04539 10.1014 8.5538 10.3846 9.23527 10.5922V13.7441C8.74482 13.4736 8.41175 12.9514 8.41175 12.3528C8.41175 11.9305 8.06943 11.5881 7.64714 11.5881C7.22486 11.5881 6.88253 11.9305 6.88253 12.3528C6.88253 13.8079 7.88486 15.0331 9.23527 15.3749V15.9973C9.23527 16.4195 9.57759 16.7619 9.99988 16.7619C10.4222 16.7619 10.7645 16.4195 10.7645 15.9973V15.3749C12.1149 15.0331 13.1172 13.8079 13.1172 12.3528C13.1172 11.4959 12.8511 10.7954 12.3263 10.2706C11.9449 9.88913 11.4301 9.60317 10.7645 9.40288ZM8.74396 8.63733C8.58927 8.48268 8.41175 8.23035 8.41175 7.64729C8.41175 7.04864 8.74482 6.52648 9.23527 6.25586V8.96264C9.02906 8.86713 8.8658 8.75917 8.74396 8.63733ZM10.7645 13.7441V11.029C11.429 11.3385 11.588 11.7812 11.588 12.3528C11.588 12.9514 11.2549 13.4736 10.7645 13.7441Z" fill="#FFEA94" />
                                        </svg>
                                    </div>
                                    <div className={clD.boosters__container__block__benefit}>
                                        {convertMoneyToReduction(calculatePrice(prop))}
                                    </div>
                                    <div className={clD.boosters__container__block__level}>
                                        {prop.level} lvl
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Boost;