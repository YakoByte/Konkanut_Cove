import { Modal, useModal, Button, Text, Tooltip, Spacer, Checkbox, Dropdown } from "@nextui-org/react";
import { Input, Grid, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { uploadImage } from "@/utils/firebase_image_upload";
import { queryClient } from "@/pages/_app";
import { uploadData } from "@/utils/firebase_data_handler";
import InitialLoading from "@/admin_components/initialLoading";

export default function RoomAdd(props) {
    const { setVisible, bindings } = useModal();
    const [loading, setLoading] = useState(false);

    const handleAdd = (data) => {
        const resp = uploadData(data, `Hotels/${props.hotelId}/Rooms`)
        resp.then(res => {
            if (res.message === "success") {
                // update or add the response to the cache
                queryClient.setQueryData([
                    'hotels',
                    props.hotelId,
                    'rooms'
                ], (old) => {
                    const oldData = old?.data
                    if (oldData) {
                        return { ...old, data: [...oldData, res.data] }
                    }
                    else {
                        return { ...old, data: [res.data] }
                    }
                })

                // close the modal
                setVisible(false);
                setLoading(false);

                alert("Room Added Successfully")
            }
            else {
                setLoading(false);
                alert("Room Adding Failed")
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const title = e.target[0].value;
        const description = e.target[1].value;
        const view = e.target[2].checked;
        const double = e.target[3].checked;
        const people = e.target[4].value;
        const image = e.target[5].files[0];

        const resp = uploadImage(image, `Rooms`)
        resp.then(res => {
            if (res.message === "success") {
                const data = {
                    title: title,
                    description: description,
                    view: view,
                    double: double,
                    people: people,
                    image: res.data
                }
                handleAdd(data)
            }
            else {
                setLoading(false);
                alert("Image Upload Failed")
            }
        })
    }

    return (
        <div>
            <Button auto shadow color="success" css={{
                color: "white",
            }} onClick={() => setVisible(true)}>
                Add Room
            </Button>
            {
                loading && <InitialLoading />
            }

            <Modal
                width="600px"
                height="80px"

                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" color="success" css={{
                        color: "#0000000",
                    }} size={20}>
                        Add Room
                    </Text>
                </Modal.Header>
                <form onSubmit={handleSubmit} >
                    <Modal.Body
                        height="800px"
                        scroll={true}

                    >

                        <Grid.Container gap={4}>
                            <Grid xs={12} lg={12} md={12} sm={12} xl={12}>
                                <Input
                                    bordered
                                    fullWidth={true}
                                    labelPlaceholder="Title"
                                    required
                                    color="success" />
                            </Grid>
                            <Grid xs={12} lg={12} md={12} sm={12} xl={12}>
                                <Textarea
                                    bordered
                                    fullWidth={true}
                                    labelPlaceholder="Description"
                                    required
                                    color="success" />
                            </Grid>

                            <Grid xs={12} css={{
                                display: "flex",
                                gap: "10px",
                            }} lg={12} md={12} sm={12} xl={12}>
                                <Checkbox isRequired defaultSelected>View</Checkbox>
                                <Checkbox isRequired defaultSelected>Double Bed</Checkbox>
                            </Grid>

                            <Grid xs={12} lg={12} md={12} sm={12} xl={12}>
                                <Input
                                    bordered
                                    fullWidth={true}
                                    labelPlaceholder="No of people"
                                    type="number"
                                    required
                                    color="success" />
                            </Grid>

                            <Grid>
                                <input required type="file" />
                            </Grid>

                        </Grid.Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={() => { setVisible(false) }}>
                            Close
                        </Button>
                        <Button auto css={{
                            color: "white",
                        }} color="success" type="submit" >
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div >
    );
}
