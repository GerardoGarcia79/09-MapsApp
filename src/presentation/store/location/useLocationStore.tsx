import {create} from 'zustand';
import {Location} from '../../../infrastructure/interfaces/location';
import {getCurrentLocation} from '../../../actions/location/location';

interface LocationState {
  lastKnownLocation: Location | null;
  getLocation: () => Promise<Location | null>;
}

export const useLocationStore = create<LocationState>()(set => ({
  lastKnownLocation: null,
  getLocation: async () => {
    const location = await getCurrentLocation();
    set(state => ({...state, lastKnownLocation: location}));
    return location;
  },
}));
