import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Comments from './Comments';
import session from "../utils/session";

export default function UserPosts(props) {

  const imgStyle = {
    height:"300px",
    width:"300px"
  }

  const cardStyle = {
    width:"306px",
    justifyContent: "space-around",
    borderRadius: "5px",
    border: "solid black",
    borderWidth: "100%",
    margin:"auto",
    marginBottom:"100px"

  }

  return (
    <div>
      <Row >
        {props.posts.map(post =>
          <Col className="col-lg-4 col-md-6 col-sm-12 col-12">
            <Card style={cardStyle}>
              <img src={post.image} alt="profile-pic" style={imgStyle} />
              <p style={{ textAlign: "left", padding: "5px" }}>
                <span style={{ fontWeight: "bold" }}>{session.getUserName()}</span>
                <span>  {post.caption}</span>
              </p>
              {/* <p style={{
                textDecoration: "underline", textAlign: "left",
                marginLeft: "5px", color: "grey"
              }}>Comments
              </p>
              <Comments postId={post._id} /> */}
            </Card>
          </Col>
        )}
      </Row>
    </div>
  )
}
