import React from "react";

export default function Forminput(props){
    
    return (
        <>
        <div className="form-group mb-2">
            <label className="font-weight-bold h5">{props.labelName}</label>
            <input type={props.inputType} className="form-control" style={{width:'250px'}} name={props.inputName} defaultValue={props.val} placeholder={props.placeHolderValue} onChange={(e)=>{props.handleInput(e)}} />
        </div>
        </>
    )
}

