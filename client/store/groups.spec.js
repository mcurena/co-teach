/* global describe beforeEach afterEach it */
import "jsdom-global/register";
import { expect } from "chai";
import { loadGroups, addGroupNoteServer } from "./groups";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

const fakeGroups = [
  {
    id: 1,
    skill: "mainIdea",
    rating: 3,
    dates: "Pending",
    notes: "None",
    active: true,
    userId: null,
    students: [
      {
        id: 1,
        name: "Angel Ureña"
      },
      {
        id: 4,
        name: "Salmon Ureña"
      },
      {
        id: 2,
        name: "Michelle Ureña"
      },
      {
        id: 3,
        name: "Tuna Ureña"
      }
    ],
    user: null
  },
  {
    id: 2,
    skill: "authorsPurpose",
    rating: 2,
    dates: "01/10, 01/13",
    notes: "None",
    active: true,
    userId: 2,
    students: [
      {
        id: 5,
        name: "Vanessa Rivera"
      },
      {
        id: 7,
        name: "Pilar Coronel"
      },
      {
        id: 6,
        name: "Cristina Coronel"
      },
      {
        id: 8,
        name: "Arian Markisic"
      }
    ],
    user: {
      id: 2,
      name: "Murphy",
      initials: "MC",
      email: "murphy@email.com"
    }
  },
  {
    id: 3,
    skill: "traitsEmotions",
    rating: 2,
    dates: "01/10",
    notes: "None",
    active: true,
    userId: 3,
    students: [
      {
        id: 10,
        name: "Raul Rivera"
      },
      {
        id: 9,
        name: "Ximena Rivera"
      },
      {
        id: 11,
        name: "Melissa Rivera"
      },
      {
        id: 12,
        name: "Steven Vargas"
      }
    ],
    user: {
      id: 3,
      name: "Michelle",
      initials: "MU",
      email: "michelle@email.com"
    }
  },
  {
    id: 4,
    skill: "pov",
    rating: 2,
    dates: "01/10, 01/13",
    notes: "None",
    active: true,
    userId: 4,
    students: [
      {
        id: 13,
        name: "Evalina Fernandez"
      },
      {
        id: 14,
        name: "Lucas Fernandez"
      },
      {
        id: 15,
        name: "Yonuel Fernandez"
      },
      {
        id: 16,
        name: "Dulce Ureña"
      }
    ],
    user: {
      id: 4,
      name: "Emily",
      initials: "ER",
      email: "emily@email.com"
    }
  },
  {
    id: 5,
    skill: "contextClues",
    rating: 1,
    dates: "01/10, 01/13, 01/16",
    notes: "None",
    active: true,
    userId: 1,
    students: [
      {
        id: 18,
        name: "Ramiro Coronel"
      },
      {
        id: 17,
        name: "Erica Fernandez"
      },
      {
        id: 19,
        name: "Nelly Moya"
      },
      {
        id: 20,
        name: "Olga Novoa"
      }
    ],
    user: {
      id: 1,
      name: "Cody",
      initials: "CD",
      email: "cody@email.com"
    }
  }
];
const fakeGroup = {
  id: 1,
  skill: "mainIdea",
  rating: 3,
  dates: "Pending",
  notes: "Hi",
  active: true,
  userId: null,
  students: [
    {
      id: 1,
      name: "Angel Ureña"
    },
    {
      id: 4,
      name: "Salmon Ureña"
    },
    {
      id: 2,
      name: "Michelle Ureña"
    },
    {
      id: 3,
      name: "Tuna Ureña"
    }
  ],
  user: null
};

describe("Group Thunk Creators", () => {
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

  describe("loadGroups", () => {
    it("eventually dispatches the GET_GROUPS action", async () => {
      mockAxios.onGet("/api/groups").replyOnce(200, fakeGroups);
      await store.dispatch(loadGroups());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal("GET_GROUPS");
      expect(actions[0].groups).to.be.deep.equal(fakeGroups);
    });
  });

  describe("addGroupNoteServer", () => {
    xit("eventually dispatches the ADD_GROUP_NOTE action", async () => {
      const info = {
        id: 1,
        notes: "Hi"
      };
      mockAxios.onPut("/api/groups/addNote").replyOnce(200, info);
      await store.dispatch(addGroupNoteServer(info));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal("ADD_GROUP_NOTE");
      expect(actions[0].group).to.be.deep.equal(fakeGroup);
    });
  });
});
