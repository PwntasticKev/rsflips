// import initializeFirebase from '../plugins/firebase';
//
// const firestore = initializeFirebase();
//
// const state = () => ({
//   users: []
// });
//
// const mutations = {
//   setUsers(state, users) {
//     state.users = users;
//   }
// };
//
// const actions = {
//   async loadUsers({ commit }) {
//     try {
//       const collectionRef = firestore.collection('users');
//       const docsRef = await collectionRef.get();
//       const userList = docsRef.docs.map(doc => ({ ...doc.data(), id: doc.id }));
//       commit('setUsers', userList);
//     } catch (e) {
//       return Promise.reject(e);
//     }
//   }
// };
//
// const getters = {
//   users: state => state.users
// };
//
// export default {
//   namespaced: true,
//   getters,
//   state,
//   actions,
//   mutations
// };
