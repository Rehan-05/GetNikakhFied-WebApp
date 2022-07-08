import { Collapse } from "antd";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../store/reducers";
import Collapsible from "react-collapsible";

import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { FaPaperclip } from "react-icons/fa";

const ProfileImages = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [value, setValue] = React.useState<any>("");
  const [matchType, setMatchType] = React.useState<any>(false);
  const imageUrl = "https://shadi.anadeemus.ca/profile/";

  const FileInputChange = (event: any) => {
    let type = event.target.files[0].type;
    let file = event.target.files[0];
    if (type !== "image/jpeg" && type !== "image/png" && type !== "image/GIF") {
      setMatchType(false);
    } else {
      setMatchType(true);
    }
    console.log("file", file);
    const fileData = new FormData();
    setValue(file);
    fileData.append("file", file);
    fileData.append("type", "images");
    fileData.append("object", "certificates");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                textAlign: "center",
                width: 96,
                height: 96,
                borderRadius: 50,
                overflow: "hidden",
                margin: 20,
              }}
            >
              <label
                htmlFor="file-upload-profile"
                className=""
                style={{
                  position: "absolute",
                  left: "52%",
                  backgroundColor: "gray",
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  width: 30,
                  height: 30,
                }}
              >
                <FaPaperclip color="white" />
              </label>
              <input
                id="file-upload-profile"
                type="file"
                style={{ display: "none" }}
                name="certificate"
                onChange={FileInputChange}
                accept=".jpg, .jpeg, .png"
              />
              <img
                src={
                  value
                    ? imageUrl + value?.name
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoIrOYja2QSdE0QTb3UDKI_ksIiIGEEY2ERw&usqp=CAU"
                }
                alt={"image"}
                style={{
                  objectFit: "cover",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderWidth: 3,
                  backgroundColor: "gray",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12}></Col>
      </Row>

      <Row>
        <Col md={12}></Col>
      </Row>
    </Container>
  );
};

export default ProfileImages;
