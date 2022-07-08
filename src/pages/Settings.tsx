import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./../store/actions/ProfileActions";

const Setting = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  console.log("state", state);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div>
            <img src="" />
          </div>

          <div
            onClick={() => {
              navigate(`/personalInfo/${id}`);
            }}
          >
            Edit Profile
          </div>
          <div
            onClick={() => {
              navigate(`/filter/`);
            }}
          >
            Filters Page
          </div>
          <div
            onClick={() => {
              navigate(`/usersetting/`);
            }}
          >
            Setting
          </div>
          <div
            onClick={() => {
              navigate(`/report/`);
            }}
          >
            Report Screen
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Setting;
