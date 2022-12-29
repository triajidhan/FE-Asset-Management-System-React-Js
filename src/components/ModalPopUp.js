import { Button, Modal } from "react-bootstrap"

const ModalPopUp = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.fcNo}>
                    {props.no}
                </Button>
                <Button onClick={props.fcYes} variant="danger">{props.yes}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPopUp