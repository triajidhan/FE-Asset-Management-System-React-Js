import { Container, Spinner, Stack } from "react-bootstrap"

export const Loading = () => {
    return (
        <Container>
            <Stack className="vw-100 vh-100 justify-content-center align-items-center">
                <Spinner animation="border" />
            </Stack>
        </Container>
    )
}