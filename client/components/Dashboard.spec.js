// 'use strict';

// const chai = require('chai');
// const expect = chai.expect;
// const chaiThings = require('chai-things');
// chai.use(chaiThings);

// import 'jsdom-global/register';
// import enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// enzyme.configure({ adapter: new Adapter() });
// import React from 'react';
// import { Dashboard } from './Dashboard';
// import { createShallow } from '@material-ui/core/test-utils';

// const groups = [
//   {
//     id: 1,
//     skill: 'mainIdea',
//     rating: 3,
//     dates: 'Pending',
//     notes: 'None',
//     active: true,
//     userId: null,
//     students: [
//       {
//         id: 1,
//         name: 'Angel Ureña'
//       },
//       {
//         id: 4,
//         name: 'Salmon Ureña'
//       },
//       {
//         id: 2,
//         name: 'Michelle Ureña'
//       },
//       {
//         id: 3,
//         name: 'Tuna Ureña'
//       }
//     ],
//     user: null
//   },
//   {
//     id: 2,
//     skill: 'authorsPurpose',
//     rating: 2,
//     dates: '01/10, 01/13',
//     notes: 'None',
//     active: true,
//     userId: 2,
//     students: [
//       {
//         id: 5,
//         name: 'Vanessa Rivera'
//       },
//       {
//         id: 7,
//         name: 'Pilar Coronel'
//       },
//       {
//         id: 6,
//         name: 'Cristina Coronel'
//       },
//       {
//         id: 8,
//         name: 'Arian Markisic'
//       }
//     ],
//     user: {
//       id: 2,
//       name: 'Murphy',
//       initials: 'MC',
//       email: 'murphy@email.com'
//     }
//   },
//   {
//     id: 3,
//     skill: 'traitsEmotions',
//     rating: 2,
//     dates: '01/10',
//     notes: 'None',
//     active: true,
//     userId: 3,
//     students: [
//       {
//         id: 10,
//         name: 'Raul Rivera'
//       },
//       {
//         id: 9,
//         name: 'Ximena Rivera'
//       },
//       {
//         id: 11,
//         name: 'Melissa Rivera'
//       },
//       {
//         id: 12,
//         name: 'Steven Vargas'
//       }
//     ],
//     user: {
//       id: 3,
//       name: 'Michelle',
//       initials: 'MU',
//       email: 'michelle@email.com'
//     }
//   },
//   {
//     id: 4,
//     skill: 'pov',
//     rating: 2,
//     dates: '01/10, 01/13',
//     notes: 'None',
//     active: true,
//     userId: 4,
//     students: [
//       {
//         id: 13,
//         name: 'Evalina Fernandez'
//       },
//       {
//         id: 14,
//         name: 'Lucas Fernandez'
//       },
//       {
//         id: 15,
//         name: 'Yonuel Fernandez'
//       },
//       {
//         id: 16,
//         name: 'Dulce Ureña'
//       }
//     ],
//     user: {
//       id: 4,
//       name: 'Emily',
//       initials: 'ER',
//       email: 'emily@email.com'
//     }
//   },
//   {
//     id: 5,
//     skill: 'contextClues',
//     rating: 1,
//     dates: '01/10, 01/13, 01/16',
//     notes: 'None',
//     active: true,
//     userId: 1,
//     students: [
//       {
//         id: 18,
//         name: 'Ramiro Coronel'
//       },
//       {
//         id: 17,
//         name: 'Erica Fernandez'
//       },
//       {
//         id: 19,
//         name: 'Nelly Moya'
//       },
//       {
//         id: 20,
//         name: 'Olga Novoa'
//       }
//     ],
//     user: {
//       id: 1,
//       name: 'Cody',
//       initials: 'CD',
//       email: 'cody@email.com'
//     }
//   }
// ];

// const styles = theme => ({
//   layout: {
//     width: 'auto',
//     marginLeft: theme.spacing.unit * 2,
//     marginRight: theme.spacing.unit * 2,
//     [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
//       width: 1100,
//       marginLeft: 'auto',
//       marginRight: 'auto'
//     }
//   },
//   cardGrid: {
//     padding: `${theme.spacing.unit * 3}px 0`,
//     display: 'flex',
//     flexDirection: 'row',
//     justify: 'center',
//     alignItems: 'flex-start'
//   },

//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing.unit * 3
//   },
//   title: {
//     flexGrow: 1
//   }
// });

// describe('<Dashboard /> component', () => {
//   let shallow;
//   beforeEach(() => {
//     shallow = createShallow();
//   });
//   xit('renders four grids', () => {
//     const wrapper = shallow(<Dashboard groups={groups} classes={styles()} />);
//     console.log(wrapper);
//     expect(wrapper.find('h3')).to.have.length(4);
//   });

//   xit('renders group cards for each group passed down as props', () => {
//     const wrapper = shallow(<Dashboard groups={groups} />);
//     const cards = wrapper.find('i');
//     expect(cards).to.have.length(groups.length);
//   });
// });
