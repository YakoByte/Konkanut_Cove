import { Airplane, ForkSpoon, SingleBed, TourBus } from "@icon-park/react"
import Image from "next/image";

const options=[
    {
        name:"meals",
        icon:ForkSpoon
    },{
        name:"Optional",
        icon:Airplane
    },{
        name:"Accomodation",
        icon:SingleBed
    },{
        name:"Sightseeing",
        icon:TourBus
    }
]

const ImagePanel = ({image,width})=>{
    const IMG_PROP=0.5;
    const imgWidth=""+width*IMG_PROP;
    const imgHeight=""+parseInt(width*IMG_PROP*(0.5));
    const leftWidth = width-76;
    return(
    <>
        <div className="xs:hidden">
            <Image src={image} width={imgWidth} height={imgHeight} alt="" className="shadow-md mb-2 rounded-md"/>
        </div>
        <div className={`flex flex-col relative w-full max-xs:hidden w-[${IMG_PROP*100}%]`}>
            <div className="absolute top-1 border-2 border-green-800 text-green-800 rounded-sm text-md text-center px-2 "
            style={{left:leftWidth}}>2N</div>
            <div className="absolute bottom-[35%]">
                <Image src={image} width={imgWidth} height={imgHeight} alt="" className="shadow-md mb-2 rounded-md"/>
            </div>
    
            <ul className="absolute bottom-0 shadow-md rounded-md flex w-full">
                {options.map((option,ind)=>{
                    const Icon = option.icon;
                   return( <li key={ind} className="px-3 py-2 text-green-800 flex flex-col justify-center items-center grow cursor-pointer
                   hover:bg-gray-200">
                        <div className="text-green-800 text-xs">{option.name}</div>
                        <Icon size="24" className="stroke-current text-green-800"/>
                    </li>)
                })}
            </ul>
        </div>
    </>
    )
}

export default  function Page2Panel({image,title,duration,desc,discounted_rate,actual_rate,percent_off,n=2,width}){
    return(
        <div className="flex max-sm:justify-center max-sm:flex-col bg-white shadow-2xl border-[2px] border-gray-100 rounded-lg px-5 py-5 max-sm:w-full">
            <ImagePanel image={image} width={width}/>
            <div className="grow"></div>
            <div className="flex flex-col text-green-800 sm:w-[40%] sm:pr-4 mt-2">
                <div className="font-bold text-xl mb-3">{title}</div>
                <div className="font-bold text-lg mb-2">{duration}</div>
                <div className="text-md">{desc}</div>
                <div className="text-lg">{"\u20b9"}{discounted_rate}</div>
                <div className="flex mb-4 items-center">
                    <div className="text-lg text-gray-400 line-through mr-2">{"\u20b9"}{actual_rate}</div>
                    <div className="text-green-600 text-sm font-bold">{percent_off}% off</div>
                </div>
                <button className="bg-green-800 mb-3 text-white font-bold py-2 rounded-sm">View More</button>
            </div>
        </div>
    )
}