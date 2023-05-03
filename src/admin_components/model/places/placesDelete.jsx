import { Modal, useModal, Button, Text, Tooltip } from "@nextui-org/react";
import { DeleteIcon, IconButton } from "../../icons";
import InitialLoading from "@/admin_components/initialLoading";
import { useState } from "react";

const ROUTE = '/api/place';

export default function PlaceDelete(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { setVisible, bindings } = useModal();
    console.log(bindings);
    if (props.visibity) {
        setVisible(false);
    }

    // Delete Place List API
    const deletePlace = async (id) => {
        setIsLoading(true);
        setVisible(false);
        fetch(ROUTE + `?id=${id}`, { method: 'DELETE' }).then(res => res.json()).then(res => {
            if (res.status === 200) {
                props.count();
                setIsLoading(false);
            }
        })
        setIsLoading(false);
    }

    return (
        <div>
            {
                isLoading && <InitialLoading />
            }
            <Tooltip
                content="Delete"
                color="success"
                onClick={() => {
                    setVisible(true)
                }}
            >
                <IconButton>
                    <DeleteIcon size={20} fill="#095000" />
                </IconButton>
            </Tooltip>

            <Modal
                scroll
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Delete Place
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text id="modal-description">
                        Are you sure? You Want to Delete the Place!
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="success" onPress={() => setVisible(false)}>
                        Close
                    </Button>
                    <Button auto color="error" onPress={() => deletePlace(props.id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}