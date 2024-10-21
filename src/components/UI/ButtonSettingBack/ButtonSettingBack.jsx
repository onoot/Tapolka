import React from 'react';
import ButtonClose from "./ButtonClose";
import ButtonBack from "./ButtonBack";

const ButtonSettingBack = ({setVisible, settings, setSetting}) => {

    return (
        <div>
            {
                settings.map((prop) =>{
                    if(prop.isActive){
                        if(prop.name === "Settings"){
                            return <ButtonClose key={prop.id} setVisible={setVisible}/>
                        } else{
                            return <ButtonBack key={prop.id} setVisible={setVisible} setSetting={setSetting}/>
                        }
                    }
                })
            }
        </div>

    );
};

export default ButtonSettingBack;