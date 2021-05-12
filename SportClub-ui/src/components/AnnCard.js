import React from "react";

export const AnnCard =({announcement})=>{

    return (
        <div id="logform">
            <h5>{announcement.user.firstName} {announcement.user.lastName}</h5>
            <div>{announcement.text}</div>
        </div>
    );

};
export default AnnCard;