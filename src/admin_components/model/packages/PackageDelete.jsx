import { Modal, useModal, Button, Text, Tooltip, Spacer, Checkbox, Dropdown } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
import { deleteImages } from "@/utils/firebase_image_upload";
import { deleteData } from "@/utils/firebase_data_handler";
import { queryClient } from "@/pages/_app";
import { useState } from "react";
import InitialLoading from "@/admin_components/initialLoading";
import { useRouter } from "next/router";
import { ADMIN_ROUTES } from "@/admin_components/core/routes";

export default function PackageDelete(props) {
    const { setVisible, bindings } = useModal();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = () => {
        setLoading(true);
        // delete the image
        deleteImages(props.data.images).then(() => {
        }).catch((error) => {
            console.log(error);
        });

        // delete the room
        deleteData(`Packages/${props.data.id}`).then(() => {
            // u[date the query cache
            queryClient.setQueryData(["packages"], (oldData) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((hotel) => hotel.id !== props.data.id)

                }
            }
            );
            alert("Packages deleted successfully");
            router.push(ADMIN_ROUTES.PACKAGES);
            setLoading(false);
        }
        ).catch((error) => {
            console.log(error);
            alert("Error deleting Packages");
            setLoading(false);
        }
        );

    }

    return (
        <div>
            <Button auto shadow color="error" css={{
                color: "white",
            }} onClick={() => setVisible(true)}>
                Delete
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
                        View
                    </Text>
                </Modal.Header>
                <Modal.Body
                    height="800px"
                    scroll={true}

                >

                    <Grid.Container gap={2}>

                        <Grid xs={12} lg={12} md={12} sm={12} xl={12}>

                            <Text size={15} >
                                Are you sure you want to delete this Package?
                            </Text>


                        </Grid>
                        <Grid xs={12} lg={12} md={12} sm={12} xl={12}>

                            <Text size={20} >
                                {props.data.title}
                            </Text>


                        </Grid>

                    </Grid.Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="success" onPress={() => { setVisible(false) }}>
                        Close
                    </Button>
                    <Button auto flat color="error" onPress={() => {
                        handleDelete();
                        setVisible(false)
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
