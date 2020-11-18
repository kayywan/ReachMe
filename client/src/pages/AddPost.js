import React, { useState } from 'react';
import { storage } from "../firebase/firebase.js";
import NavTag from '../components/NavTag';
import API from '../utils/API';
import { Jumbotron, Container, Form, Button, Card } from 'react-bootstrap';

import session from "../utils/session";

export default function AddPost() {
    const [formObject, setFormObject] = useState({
        caption: "",
        imageAsFile: "",
        imageUrl: "",
        imageUpload: ""
    })

    const handleOnSubmit = e => {
        e.preventDefault()
        if (formObject.imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (formObject.imageAsFile)}`)
        }

        const imageName = `${Date.now()}-${formObject.imageAsFile.name}`
        const uploadTask = storage.ref(`/images/${imageName}`).put(formObject.imageAsFile);

        // initiates the firebase side uploading
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('images').child(imageName).getDownloadURL()
                    .then(fireBaseUrl => {
                        setFormObject({ ...formObject, imageUrl: fireBaseUrl })

                        API.addPost({
                            caption: formObject.caption,
                            user_id: session.get()._id,
                            image: fireBaseUrl
                        })
                            .then(function (response) {
                                window.location.href = "/"
                            })
                            .catch(e => {
                                alert(e.error);
                            });
                    })
            })
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    }

    const handleImageAsFile = (event) => {
        const image = event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = () => {
            setFormObject({ ...formObject, imageUpload: reader.result, imageAsFile: image })
        }
        reader.readAsDataURL(image)
    }

    const containerStyle = {
        margin: "auto",
        height: "200px",
        width: "800px",
        marginTop: "100px",
    }

    const jumbotronStyle = {
        backgroundImage: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)"
    }

    const imgStyle = {
        height: "100%", maxHeight: "300px", width: "100%", maxWidth: "300px", float: "left"
    }

    return (
        <div>
            <NavTag />
            <Container style={containerStyle}>
                <Jumbotron style={jumbotronStyle}>
                    <h4 className="text-center">Create Post</h4>
                    <hr />
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{ float: "left", fontWeight: "bold" }}>What's on your mind ?</Form.Label>
                            <Form.Control type="text" name="caption" as="textarea" rows={2} placeholder="Type here ..." onChange={handleInputChange} />
                        </Form.Group>
                        <br />
                        <span>
                            <label style={{ float: "left", fontWeight: "bold", }}>
                                Upload your Image :
                          </label>
                            {(formObject.imageUpload) ?
                                <Card
                                    style={{ width: "300px" }}><img src={formObject.imageUpload} alt="post-pic" style={imgStyle} />
                                </Card>
                                : " "}
                        </span>
                        <span >
                            <input onChange={handleImageAsFile} type="file" style={{ float: "left" }} />
                        </span>
                        <br />
                        <Button variant="dark" type="submit" style={{ marginRight: "200px", marginTop: "20px" }}>
                            Add Post
                        </Button>
                    </Form>
                </Jumbotron>
            </Container>
        </div >
    )
}