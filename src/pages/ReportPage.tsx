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

const Report = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [value, setValue] = React.useState<any>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div>
            <div>
              <h2>Report</h2>
            </div>

            <h2>PLease Report </h2>

            <TextareaAutosize
              aria-label="minimum height"
              minRows={15}
              placeholder="Your Report"
              style={{ width: 200 }}
              onChange={(t) => {
                setValue(t);
              }}
            />
          </div>
          <Button
            variant="contained"
            size="medium"
            color="success"
            onClick={() => {
              navigate("/setting");
            }}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Report;
