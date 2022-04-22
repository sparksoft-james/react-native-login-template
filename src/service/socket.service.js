// import Echo from 'laravel-echo';
// import io from 'socket.io-client';
// import {SOCKET_IP} from '../utils/constants';
// import {socket} from '../screens/action';

// import AsyncStorage from '@react-native-community/async-storage';
// import storeRegistry from '../redux/storeRegistry';

// export async function initSocket(facility_id, facility_session_id) {
//   console.log('socket id value', facility_id, facility_session_id);
//   window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: SOCKET_IP,
//     client: io,
//   });
//   console.log(
//     'running initial socket:',
//     `membership_suite_core_database_facility_${facility_id}_${facility_session_id}`,
//   );
//   // const facility_id = await AsyncStorage.getItem('@facility_id');
//   const store = storeRegistry.getStore();

//   window.Echo.channel(
//     `membership_suite_core_database_facility_${facility_id}_${facility_session_id}`,
//   ).listen('.check_in', response => {
//     console.log('check_in: ', response);
//     if (response?.responseCode === 0) {
//       store.dispatch(socket(response.data));
//     } else if (response.data) {
//       store.dispatch(socket(response.data));
//     }
//   });
// }

// export async function closeSocket() {
//   window.Echo.leaveChannel('fightzone_database_test');
// }
