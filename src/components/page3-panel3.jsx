import { Select } from "../constants/select-status";
import Image from "next/image";

export default function Page3Panel3({image,imageWidth,imageHeight,carType,seats,selectionStatus=Select.SELECT}){
    console.log(seats,carType,imageWidth,imageHeight)
    return(
        <div className="flex flex-col justify-center rounded-md overflow-hidden shadow-2xl" style={{maxWidth:imageWidth}}>
            <Image src={image} alt="" width={""+imageWidth} height={""+imageHeight} className="mb-3"/>
            <div className="flex mb-5 px-5">
                <div className="flex text-md grow">{carType}</div>
                <div className="flex text-sm">{seats} seaters</div>
            </div>
            <button className="mx-5 mb-5 rounded-lg py-3 bg-green-800 text-white font-bold disabled:bg-slate-500" disabled={selectionStatus===Select.SELECT_DISABLED}>{selectionStatus===Select.SELECTED?"Selected":"Select"}</button>
        </div>
    )
}