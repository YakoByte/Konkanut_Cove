import InitialLoading from '@/admin_components/initialLoading'
import Layout from '@/admin_components/layout'
import HotelsDelete from '@/admin_components/model/HOTELS/HotelsDelete'
import HotelsEdit from '@/admin_components/model/HOTELS/HotelsEdit'
import LandmarkAdd from '@/admin_components/model/HOTELS/landmarks/landmarkAdd'
import LandmarkDelete from '@/admin_components/model/HOTELS/landmarks/landmarkDelete'
import LandmarkEdit from '@/admin_components/model/HOTELS/landmarks/landmarkEdit'
import LandmarkView from '@/admin_components/model/HOTELS/landmarks/landmarkView'
import RoomAdd from '@/admin_components/model/HOTELS/room/roomAdd'
import RoomDelete from '@/admin_components/model/HOTELS/room/roomDelete'
import RoomEdit from '@/admin_components/model/HOTELS/room/roomEdit'
import RoomView from '@/admin_components/model/HOTELS/room/roomView'
import { getAllData, getDataById } from '@/utils/firebase_data_handler'
import { Button, Col, Row, Table, Text, Tooltip, User } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Index() {
    const { id } = useRouter().query
    const hotels = useQuery(
        ['hotel', id],
        () => {
            return getDataById(`Hotels/${id}`)
        },
        {
            staleTime: 10000 * 60,
            enabled: !!id
        },
    )

    const places = useQuery(['places'], () => {
        return fetch('/api/place')
            .then(res => res.json())
    },
        {
            staleTime: 10000 * 60
        }
    )


    const roomsData = useQuery(
        [
            'hotels',
            id,
            'rooms'
        ],
        () => {
            return getAllData(`Hotels/${id}/Rooms`)
        },
        {
            staleTime: 10000 * 60,
            enabled: !!id
        }
    )

    const landmarksData = useQuery(
        [
            'hotels',
            id,
            'landmarks'
        ],
        () => {
            return getAllData(`Hotels/${id}/Landmarks`)
        },
        {
            staleTime: 10000 * 60,
            enabled: !!id
        }
    )


    return (
        <Layout>
            {
                hotels.isLoading && <InitialLoading />
            }
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20
            }} >
                <Text css={{
                    margin: 0,
                    padding: 0,
                    letterSpacing: 0.5,
                }} h1>{hotels.data?.data?.title}</Text>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                }} >
                    <HotelsEdit data={{
                        ...hotels.data?.data
                    }} />

                    {/* only display delete if there are no landmarks nor rooms or else display a diabled button with a tool tip */}
                    {/* <HotelsDelete data={{
                        ...hotels.data?.data
                    }} /> */}
                    {
                        (landmarksData.data?.data?.length === 0 && roomsData.data?.data?.length === 0) ?
                            <HotelsDelete data={{
                                ...hotels.data?.data
                            }} />
                            :
                            <Tooltip
                                content="Delete all landmarks and rooms first"
                                color="error"
                            >
                                <Button disabled auto tooltip="Delete all landmarks and rooms first" >Delete</Button>
                            </Tooltip>
                    }
                </div>
            </div>

            <Text css={{
                margin: 0,
                padding: 0,
                letterSpacing: 0.5,
            }} h3>{
                    places.data?.data?.find(place => place.id === hotels.data?.data?.place)?.data.title
                }</Text>
            {
                // split the string into array of string by *
                hotels.data?.data?.description?.split('*').map((item, index) => {
                    return (
                        <Text key={index} p>
                            {item}
                        </Text>
                    )
                })
            }
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                marginTop: 20

            }} >

                {
                    hotels.data?.data?.images?.map((item, index) => {
                        return (
                            <Image key={index} src={item} alt="" style={{
                                borderRadius: 10,
                                width: 100,
                                height: 100,
                            }} width={1000} height={1000} />
                        )
                    })

                }
            </div>

            <div style={{
                marginTop: 20,
                // scrllable div
                maxHeight: 100,
                overflowY: 'scroll',

                border: '1px solid #ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 20


            }} >
                <Text h4>Terms and Conditions</Text>
                {
                    //  terms and conditions in a scrollable div
                    hotels.data?.data?.terms?.split('*').map((item, index) => {
                        return (
                            <Text key={index} p>
                                {item}
                            </Text>
                        )
                    }
                    )
                }
            </div>

            {/* Rooms */}
            <div style={{
                marginTop: 50,
            }}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }} >
                    <Text h3>Rooms</Text>
                    <RoomAdd hotelId={id} />
                </div>

                <Table
                    bordered
                    shadow={false}
                    color={"suceess"}
                    selectionBehavior="toggle"
                    aria-label="Example static bordered collection table"
                    allowDuplicateSelectionEvents="false"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header>
                        <Table.Column>Place</Table.Column>
                        <Table.Column>Title</Table.Column>
                        <Table.Column>
                            Options
                        </Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            // hotelsData.data?.map(({ id, data }, i) => (
                            roomsData.data?.data.map((data, i) => (
                                <Table.Row key={i + 1}>
                                    <Table.Cell>
                                        <User size="xl" squared src={data.image} css={{ p: 0 }}>
                                        </User>
                                    </Table.Cell>
                                    <Table.Cell>{data.title}</Table.Cell>

                                    <Table.Cell>  <Row justify="center" align="center">
                                        <Col css={{ d: "flex" }}>
                                            <RoomView data={{ ...data }} />
                                        </Col>
                                        <Col css={{ d: "flex" }}>
                                            <RoomEdit hotelId={id} data={{ ...data }} />
                                        </Col>
                                        <Col css={{ d: "flex" }}>
                                            <RoomDelete hotelId={id} data={{ ...data }} />
                                        </Col>
                                    </Row>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }

                    </Table.Body>
                    <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={5}
                        color={"success"}
                        onPageChange={(page) => console.log({ page })}
                    />
                </Table>
            </div>

            {/* Landmarks */}
            <div style={{
                marginTop: 50,
            }}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }} >
                    <Text h3>Landmarks</Text>
                    <LandmarkAdd hotelId={id} />
                </div>

                <Table
                    bordered
                    shadow={false}
                    color={"suceess"}
                    selectionBehavior="toggle"
                    aria-label="Example static bordered collection table"
                    allowDuplicateSelectionEvents="false"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header>
                        <Table.Column>Name</Table.Column>
                        <Table.Column>Distance</Table.Column>
                        <Table.Column>Options</Table.Column>


                    </Table.Header>
                    <Table.Body>
                        {
                            // hotelsData.data?.map(({ id, data }, i) => (
                            landmarksData.data?.data.map((data, i) => (
                                <Table.Row key={i + 1}>

                                    <Table.Cell>{data.name}</Table.Cell>
                                    <Table.Cell>{data.distance} km</Table.Cell>

                                    <Table.Cell>  <Row justify="center" align="center">
                                        <Col css={{ d: "flex" }}>
                                            <LandmarkView data={{ ...data }} />
                                        </Col>
                                        <Col css={{ d: "flex" }}>
                                            <LandmarkEdit hotelId={id} data={{ ...data }} />
                                        </Col>
                                        <Col css={{ d: "flex" }}>
                                            <LandmarkDelete hotelId={id} data={{ ...data }} />
                                        </Col>
                                    </Row>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }

                    </Table.Body>
                    <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={5}
                        color={"success"}
                        onPageChange={(page) => console.log({ page })}
                    />
                </Table>
            </div>

        </Layout>
    )
}

export default Index