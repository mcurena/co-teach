/* global describe beforeEach afterEach it */
import "jsdom-global/register";
import { expect } from "chai";
import { loadStudents } from "./students";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe("Student Thunk Creators", () => {
  let store;
  let mockAxios;

  const initialState = { students: [{ name: "AL" }] };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe("loadStudents", () => {
    it("eventually dispatches the GET_STUDENTS action", async () => {
      const fakeStudents = [{ name: "MC" }, { name: "ER" }];
      mockAxios.onGet("/api/students").replyOnce(200, fakeStudents);
      await store.dispatch(loadStudents());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal("GET_STUDENTS");
      expect(actions[0].students).to.be.deep.equal(fakeStudents);
    });
  });
});
