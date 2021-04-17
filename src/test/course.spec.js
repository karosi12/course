"use strict";
import app from '../app';
import expect from 'expect.js';
import request from 'supertest';
import JWT from "jsonwebtoken";
import FactoryGirl from './factory/index';
import Course from "../model/course";
import User from "../model/user";
import UserService from "../services/userServices";
const SECRET = process.env.JWT_SECRET;
let user, courseId, factoryUser, factoryCourse, token;
describe("#Course", () => {
  before(async function () {
    this.timeout(40000);
    factoryUser = await FactoryGirl.attrs('User');
    factoryCourse = await FactoryGirl.attrs('Course');
    await User.remove({});
    await Course.remove({});
    user = await createUser(factoryUser);
    const loginData = await login(factoryUser, factoryUser.password);
    if(!loginData.data) return { message: loginData.message}
    token = loginData.data.token;
    factoryCourse = Object.assign({}, {student_id: user._id},factoryCourse)
  });
  describe("Add course", () => {
    it("#create question", async ()=> {
      try {
        const res = await request(app).post('/api/course')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(factoryCourse)
        .expect(201);
        expect(res.body.statusCode).to.equal(201);
        expect(res.body.message).to.equal("course created successfully");
        expect(res.body.data.isDeleted).to.equal(false);
        expect(res.body).have.property("success");
        expect(res.body).have.property("statusCode");
        expect(res.body).have.property("message");
        expect(res.body).have.property("data");
        expect(res.body.data).have.property("_id");
        expect(res.body.data).have.property("student_id");
        expect(res.body.data).have.property("course_name");
        expect(res.body.data).have.property("registration_date");
        expect(res.body.data).have.property("createdAt");
        expect(res.body.data).have.property("updatedAt");
        courseId = res.body.data._id
      } catch (error) {
        throw new Error(error);
      }
    });
  });
  describe("Fetch question", () => {
    it("#get all course", async ()=> {
      try {
        const res = await request(app).get(`/api/courses?student_id=${user._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200);
        expect(res.body.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal("You have 1 enrollments");
        expect(res.body).have.property("success");
        expect(res.body).have.property("statusCode");
        expect(res.body).have.property("message");
        expect(res.body).have.property("data");
        expect(res.body.data[0]).have.property("_id");
        expect(res.body.data[0]).have.property("course_name");
        expect(res.body.data[0]).have.property("student_id");
        expect(res.body.data[0]).have.property("registration_date");
        expect(res.body.data[0]).have.property("isDeleted");
        expect(res.body.data[0]).have.property("createdAt");
        expect(res.body.data[0]).have.property("updatedAt");
      } catch (error) {
        throw new Error(error);
      }
    });
    it("#get course", async ()=> {
      try {
        const res = await request(app).get(`/api/course/${courseId}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200);
        expect(res.body.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal("course retrieved successfully");
        expect(res.body).have.property("success");
        expect(res.body).have.property("statusCode");
        expect(res.body).have.property("message");
        expect(res.body).have.property("data");
        expect(res.body.data).have.property("_id");
        expect(res.body.data).have.property("course_name");
        expect(res.body.data).have.property("student_id");
        expect(res.body.data).have.property("registration_date");
        expect(res.body.data).have.property("isDeleted");
        expect(res.body.data).have.property("createdAt");
        expect(res.body.data).have.property("updatedAt");
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
const login = async (data, password) => {
  const user = await UserService.getUser({email: data.email});
  if(!user.data) return {message: user.message, data: null};
  const loginData = user.data;
  const validPassword =  loginData.validatePassword(password)
  if (!validPassword) return {message: 'Invalid Credentials', data: null};
  const tokenData = { id: user.data._id, fullName: user.data.fullName };
  const token = await JWT.sign(tokenData, SECRET, { expiresIn: process.env.tokenExpiresIn });
  const result = { user: user.data, token };
  return {message: "Login successful", data: result};
}
const createUser = async (data) => {
  const user = new User();
  user.fullName = data.fullName; 
  user.email = data.email; 
  user.generateHash(data.password); 
  return await user.save();
}
