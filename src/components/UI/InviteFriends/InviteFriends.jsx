import React from 'react';
import cl from "./InviteFriends.module.css";
import Button from "../Button/Button";
import { convertMoneyToRCommasIsFull } from "../../hooks/converMoney";
import { usePlayerStore } from "../../../store/playerStore.mjs";
import { toast } from 'react-toastify';
import Lottie from 'react-lottie'; // Импорт компонента Lottie
import { useTranslation } from "../../../hooks/useTranslation";

const InviteFriends = ({ item, url, openModal }) => {
    const { player } = usePlayerStore((state) => state);
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);
    const [animationData, setAnimationData] = React.useState(null);

    async function inviteFriend() {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error(t('InviteFriends.errors.tokenMissing'), { theme: 'dark' });
            return;
        }
        try {
            const response = await fetch(`${url}/api/generateReferralLink/${player.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                toast.error(t('InviteFriends.errors.linkGeneration') + response.status, { theme: 'dark' });
                return;
            }

            const data = await response.json();

            if (data.referralLink) {
                openModal(data.referralLink);
            } else {
                toast.error(t('InviteFriends.errors.linkNotFound'), { theme: 'dark' });
            }
        } catch (e) {
            console.log(e);
            toast.error(t('InviteFriends.errors.general'), { theme: 'dark' });
        }
    }

    const loadAnimation = async (animationName) => {
        try {
            const animation = await import(`../../images/${animationName}.json`); // Динамический импорт анимации
            console.log(animation); // Проверьте, что анимация загружена
            return animation;
        } catch (error) {
            console.error('Failed to load animation:', error);
            return null;
        }
    };
    

    // Загружаем анимацию для текущего item
    React.useEffect(() => {
        if (item.pathImg) {
            loadAnimation(item.pathImg).then((animation) => {
                setAnimationData(animation); // Обновляем состояние с анимацией
            });
        }
    }, [item.pathImg]);

    // Определяем параметры анимации для Lottie
    const defaultOptions = {
        loop: true, // Зацикливать анимацию
        autoplay: true, // Автоматически запускать анимацию
        animationData: animationData, // Используем загруженные данные анимации
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice', // Настройки отображения
        },
    };

    return (
        <div className={cl.inviteFriend__container__item}>
            <div className={cl.inviteFriend__container__item__block}>
                <div className={cl.inviteFriend__container__item__block__video}>
                    {/* Если анимация загружена, показываем Lottie */}
                    {animationData ? (
                        <Lottie options={defaultOptions} height={80} width={80} />
                    ) : (
                        null
                    )}
                </div>
                <div style={{ gap: "20px" }} className={cl.inviteFriend__container__item__block__content}>
                    <div className={cl.inviteFriend__container__item__task}>
                        {item.task}
                    </div>
                    <div className={cl.inviteFriend__container__item__block__rewardText}>
                        <div className={cl.inviteFriend__container__item__block__svg}>
                            <img className={cl.inviteFriend__chest} src={require("../../images/key.png")} />
                        </div>
                        <div className={cl.inviteFriend__container__item__reward}>
                            +{convertMoneyToRCommasIsFull(item.reward)}
                        </div>
                        <div>
                            {item.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cl.inviteFriend__container__item__block}>
                <Button 
                    text={t('InviteFriends.button')} 
                    isImg={false} 
                    isFullScreen={false} 
                    onClick={() => inviteFriend()} 
                />
            </div>
        </div>
    );
};

export default InviteFriends;
