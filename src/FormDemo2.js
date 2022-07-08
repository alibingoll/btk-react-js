import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from "reactstrap";
import alertify from "alertifyjs";

class FormDemo2 extends Component {
    state = {email: "", password: "", city: "", description: ""}
    handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({[name]: value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        alertify.success(this.state.email + " added to db!", 2)

    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for={"email"}>Email</Label>
                        <Input type={"email"} name={"email"} id={"email"} placeholder={"Enter Email"}
                               onChange={this.handleChange}></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for={"password"}>Password</Label>
                        <Input type={"password"} name={"password"} id={"password"} placeholder={"Enter Password"}
                               onChange={this.handleChange}></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for={"description"}>Password</Label>
                        <Input type={"textarea"} name={"description"} id={"description"}
                               placeholder={"Enter Description"}
                               onChange={this.handleChange}></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for={"city"}>City</Label>
                        <Input type={"select"} name={"city"} id={"city"} onChange={this.handleChange}>
                            <option>Ankara</option>
                            <option>İzmir</option>
                            <option>Adana</option>
                            <option>İstanbul</option>
                            <option>Kocaeli</option>
                        </Input>
                    </FormGroup>
                    <Button type={"submit"}>Save</Button>


                </Form>
            </div>
        );
    }
}

export default FormDemo2;
