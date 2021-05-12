import React from "react";
import { Button} from "react-bootstrap"
export const AnnCard =({announcement})=>{

    function edit(){
        console.log("Edit")
    }
    function remove(){
        console.log("Remove")
    }
    return (
        <div id="logform">
            <div class="row">
                <div><h5>{announcement.user.firstName} {announcement.user.lastName}</h5></div>
                <div class="date">{announcement.date.substring(0,10)+" "+announcement.date.substring( 11,16)}</div>
            </div>
            <div>
            <span class="text">{announcement.text}</span>
            </div>
        <Button variant="primary" size="sm" onClick={edit}>
            Edit
        </Button>{" "}
            <Button variant="primary" size="sm" onClick={remove}>
                Delete
            </Button>
        </div>
    );

};
export default AnnCard;