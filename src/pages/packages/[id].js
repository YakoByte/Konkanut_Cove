import ButtonPanel from "@/components/button-panel";
import Layout from "@/components/layout";
import Page3Panel from "@/components/page3-panel";
import Page3Panel2 from "@/components/page3-panel2";
import Page3Panel3 from "@/components/page3-panel3";
import Page3PicPanel from "@/components/page3-pic-panel";
import { Airplane, Car, Hotel } from "@icon-park/react";
import React, { useEffect, useState } from "react";
import { routes } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getAllData, getSubcollectionById } from "@/utils/firebase_data_handler";

const panel1Copy = {
    duration: "3days,2nights",
    images: {
        image1:
            "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",

        image2:
            "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",

        image3:
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",

        image4:
            "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",

        image5:
            "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        image6: "/assets/images/fort.png"
    },
    imagesRemaining: 7,
    desc: "All-Inclusive 3 Days Holiday - Flights, Sightseeing & Transfers ",
    startingPrice: 20000,
    startingDate: Date(2, 3, 21),
    endingDate: Date(2, 5, 22)
}


const accomodation = [
    {
        selected: true,
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: 'Luxury Resort',
        location: 'Maldives',
        distance: '5km',
        fromLocation: 'New York',
        fromDate: new Date('2023-04-01'),
        toDate: new Date('2023-04-08'),
        includes: ['Free breakfast', 'Spa access'],
        room_type: 'Deluxe Suite',
        imageWidth: 240, imageHeight: 160
    },
    {
        selected: true,
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: 'Luxury Resort',
        location: 'Maldives',
        distance: '5km',
        fromLocation: 'New York',
        fromDate: new Date('2023-04-01'),
        toDate: new Date('2023-04-08'),
        includes: ['Free breakfast', 'Spa access'],
        room_type: 'Deluxe Suite',
        imageWidth: 240, imageHeight: 160
    },
    {
        selected: true,
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: 'Luxury Resort',
        location: 'Maldives',
        distance: '5km',
        fromLocation: 'New York',
        fromDate: new Date('2023-04-01'),
        toDate: new Date('2023-04-08'),
        includes: ['Free breakfast', 'Spa access'],
        room_type: 'Deluxe Suite',
        imageWidth: 240, imageHeight: 160
    }

];

const activitiesCopy = [
    {
        selected: true,
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: 'Luxury Resort',
        location: '',
        distance: '',
        fromLocation: '',
        fromDate: "",
        toDate: "",
        imageWidth: 240, imageHeight: 160
    },
    {
        selected: true,
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: 'Luxury Resort',
        location: 'Maldives',
        distance: '5km',
        fromLocation: 'New York',
        fromDate: new Date('2023-04-01'),
        toDate: new Date('2023-04-08'),
        imageWidth: 240, imageHeight: 160
    },
    {
        selected: true,
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: 'Luxury Resort',
        location: 'Maldives',
        distance: '5km',
        fromLocation: 'New York',
        fromDate: new Date('2023-04-01'),
        toDate: new Date('2023-04-08'),
        imageWidth: 240, imageHeight: 160
    }
];

const transport = [
    {
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        imageWidth: 250,
        imageHeight: 172,
        carType: "Sedan",
        seats: 7
    },
    {
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        imageWidth: 250,
        imageHeight: 172,
        carType: "Sedan",
        seats: 7
    },
    {
        image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        imageWidth: 250,
        imageHeight: 172,
        carType: "Sedan",
        seats: 7
    },
]

const includedList = [
    {
        title: "Airport",
        Icon: Airplane,
    },
    {
        title: "Accomodation",
        Icon: Hotel,
    },
    {
        title: "Travel",
        Icon: Car,
    },
];

const optionsList = [
    {
        title: "Airport",
        Icon: Airplane,
    },
    {
        title: "Accomodation",
        Icon: Hotel,
    },
    {
        title: "Travel",
        Icon: Car,
    },
];

const Accomodation = ({ accomodation, selected, handleSelect }) => {
    return (
        <ul className="flex flex-col">
            {accomodation?.map((a, i) => {
                const isSelected = selected?.accomodations.includes(a?.id)
                return (
                    <li className="my-2" key={i}>
                        <Page3Panel2 {...a} handleSelect={handleSelect} selected={isSelected} />
                    </li>
                )
            })}
        </ul>
    );
};

const Activities = ({ activities, imageWidth, imageHeight, selected, handleSelect }) => {
    return (
        <ul className="grid sm:grid-cols-2 md:grid-cols-1 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-2">
            {activities?.map((a, i) => {
                const isSelected = selected?.activities.includes(a?.id)
                return (
                    <li className="my-2" key={i}>
                        <Page3Panel2
                            {...a}
                            handleSelect={handleSelect}
                            selected={isSelected}
                            imageWidth={imageWidth}
                            imageHeight={imageHeight}
                        />
                    </li>
                )
            })

            }

        </ul>
    );
};

const Travel = ({ transport, selected, handleSelect }) => {
    return (
        <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-2">
            {transport?.map((t, i) => {
                console.log(selected);
                console.log(t);
                console.log(selected?.transportations.includes(t?.id));
                const isSelected = selected?.transportations.includes(t?.id)
                console.log(isSelected);
                return (
                    <li className="my-2" key={i}>
                        <Page3Panel3 {...t} selected={isSelected} handleSelect={handleSelect} />
                    </li>
                )
            })}
        </ul>
    );
};

export default function Index() {
    const [options, setOptions] = useState(0);
    const { id } = useRouter().query

    const [selected, setSelected] = useState({
        activities: [],
        accomodations: [],
        transportations: [],
    });

    const handleActivitySelect = (id) => {
        setSelected((prev) => ({
            ...prev,
            activities: prev.activities.includes(id) ? prev.activities.filter(a => a !== id) : [...prev.activities.slice(1), id],
        }));
    };

    const handleAccomodationSelect = (id) => {
        setSelected((prev) => ({
            ...prev,
            accomodations: [id],
        }));
    };

    const handleTransportationSelect = (id) => {
        setSelected((prev) => ({
            ...prev,
            transportations: [id],
        }));
    };


    const packageData = useQuery(
        ["package", id],
        () => getSubcollectionById("Packages", id, ["Activities", "Accomadations", "Transportations", "Days"]),
        {
            staleTime: 1000 * 60,
            enabled: !!id
        }
    )

    const activitiesData = useQuery(
        ["activities"],
        () => getAllData("Activities"),
        {
            staleTime: 1000 * 60 * 10,
        }
    )

    const accomodationsData = useQuery(
        ["hotels"],
        () => getAllData("Hotels"),
        {
            staleTime: 1000 * 60 * 10,
        }
    )

    const transportationsData = useQuery(
        ["transportations"],
        () => getAllData("Transportations"),
        {
            staleTime: 1000 * 60 * 10,
        }
    )

    const panel1 = {
        ...panel1Copy,
        duration: `${packageData.data?.data?.days}Days,${packageData.data?.data?.nights}Nights`,
        images: {
            image1: packageData.data?.data?.images[0],
            image2: packageData.data?.data?.images[1],
            image3: packageData.data?.data?.images[2],
            image4: packageData.data?.data?.images[3],
            image5: packageData.data?.data?.images[4],
            image6: packageData.data?.data?.images[5],
        },
        imagesRemaining: packageData.data?.data?.images.length - 6,
        desc: packageData.data?.data?.description,
        startingPrice: packageData.data?.data?.price,
        // skip dates
    }


    const travelSteps = packageData.data?.data?.Days.map((d, i) => {
        return {
            title: `Day ${i + 1} : ${d.title}`,
            title2: d.subTitle,
            // splait descrption into array by * and remove first element
            desc: d.description.split("*").slice(1),
            flight: d.flight,
            hotel: d.hotel,
            transfer: d.transfer,
        }
    })

    const activities = activitiesData.data?.data?.filter(
        (a) => packageData.data?.data?.Activities.map((a) => a.activityId).includes(a.id)
    ).map((a) => {
        return {
            title: a.title,
            image: a.images[0],
            id: a.id,
        }
    })

    const transport = transportationsData.data?.data?.filter(
        (t) => packageData.data?.data?.Transportations.map((t) => t.transportationId).includes(t.id)
    ).map((t) => {
        return {
            carType: t.title,
            image: t.images[0],
            imageWidth: 250,
            imageHeight: 172,
            id: t.id,
        }
    })

    const accomodation = accomodationsData.data?.data?.filter(
        (a) => packageData.data?.data?.Accomadations.map((a) => a.accomadationId).includes(a.id)
    ).map((a) => {
        return {
            id: a.id,
            title: a.name,
            image: a.images[0],
            imageWidth: 250,
            imageHeight: 172,
        }
    })

    useEffect(() => {
        if (packageData.data?.data) {
            setSelected((prev) => ({
                ...prev,
                // only slelect first 2activity and 1accomodation and 1transportation
                activities: packageData.data?.data?.Activities.map((a) => a.activityId).slice(0, 2),
                accomodations: [packageData.data?.data?.Accomadations[0]?.accomadationId],
                transportations: [packageData.data?.data?.Transportations[0]?.transportationId],

            }));
        }
    }, [packageData.data?.data])


    return (
        <Layout>
            <div className="mt-20">
                <Page3PicPanel {...panel1} />
            </div>
            <div
                className="grid grid-cols-1 lg:grid-cols-2   bg-repeat "
                style={{ backgroundImage: "url('/assets/images/back3.png')" }}
            >
                <ol className="flex flex-col overflow-scroll mt-5">
                    {travelSteps?.map((tstep, i) => (
                        <li className="mt-5" key={i}>
                            <Page3Panel {...tstep} includedList={includedList} />
                        </li>
                    ))}
                </ol>
                <div className="flex flex-col w-full items-center">
                    <div className="sm:w-[85%] w-[98%] mt-5">
                        <ButtonPanel
                            optionList={["Accommodation", "Activities", "Transport"]}
                            options={options}
                            setOptions={setOptions}
                        />
                    </div>
                    <div className="w-[100%] mt-2">
                        {(() => {
                            switch (options) {
                                case 0:
                                    return <Accomodation
                                        selected={selected}
                                        handleSelect={handleAccomodationSelect}
                                        accomodation={accomodation} />;
                                case 1:
                                    return (
                                        <Activities
                                            activities={activities}
                                            selected={selected}
                                            handleSelect={handleActivitySelect}
                                            image
                                            imageWidth="120"
                                            imageHeight="90"
                                        />
                                    );
                                case 2:
                                    return <Travel
                                        selected={selected}
                                        handleSelect={handleTransportationSelect}
                                        transport={transport} />;
                                default:
                                    null;
                            }
                        })()}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

