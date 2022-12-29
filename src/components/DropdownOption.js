import { Form } from "react-bootstrap"

const DropdownOption = (props) => {
    return (
        <>
            <Form.Label>{props.title} <span className="text-danger">*</span></Form.Label>
            <Form.Select name={props.name} onChange={props.onChange} value={props.item}>
                <option>{props.optionTitle}</option>
                {props.data.map((val, idx) => {
                    return <option value={val[props.value]} key={idx}>{val[props.option]}</option>
                })}
            </Form.Select>
        </>
    )
}

export default DropdownOption