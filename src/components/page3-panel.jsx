export default function Page3Panel({title,includedList,title2,desc}){
    return(
        <div className="flex flex-col bg-repeat" style={{
            background:"url('/assets/images/back-3.png')"
        }}>
            <div className="flex w-[75%] sm:w-[60%]">
                <div className="w-full bg-green-800 text-white text-lg font-bold flex justify-center items-center">{title}</div>
                <div className="w-0 h-0 
                    border-t-[30px] border-t-transparent
                    border-l-[45px] border-l-green-800
                    border-b-[30px] border-b-transparent">
                </div>
            </div>
            <div className="flex sm:items-center px-8 max-sm:flex-col">
                <div className="text-gray-500 text-xl sm:text-lg mx-2 max-sm:my-2">Included:</div>
                {includedList.map(({title,Icon},index)=>
                    <div className="flex sm:justify-center items-center max-sm:my-2" key={index}>
                        <Icon  theme="filled" size="36" fill="black"/>
                        <div className="text-green-800 text-xl sm:text-lg mx-3 ">{title}</div>
                    </div>
                )}
            </div>
            <div className="text-2xl font-bold my-3 px-8 text-green-800">{title2}</div>
            <div className="px-8 w-full">
                <div className="bg-gray-400 h-[1px]"></div>
            </div>
            
            <ul className="list-disc list-inside">
                {desc.map((d,index)=><li key={index} className="text-md my-3 px-8 text-green-800">{d}</li>)}
            </ul>
        </div>
    );
}