import {create} from 'zustand';
import {Location} from '../../../infrastructure/interfaces/location';
import {
  getCurrentLocation,
  clearWatchLocation,
  watchCurrentLocation,
} from '../../../actions/location/location';

interface LocationState {
  lastKnownLocation: Location | null;
  userLocations: Location[];
  watchId: number | null;
  getLocation: () => Promise<Location | null>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocations: [],
  watchId: null,

  getLocation: async () => {
    const location = await getCurrentLocation();
    set(state => ({...state, lastKnownLocation: location}));
    return location;
  },
  watchLocation: () => {
    const watchId = get().watchId;
    if (watchId) {
      get().clearWatchLocation();
    }

    const id = watchCurrentLocation(location => {
      set(state => ({
        ...state,
        lastKnownLocation: location,
        userLocations: [...state.userLocations, location],
      }));
    });

    set(state => ({...state, watchId: id}));
  },
  clearWatchLocation: () => {
    const watchId = get().watchId;
    if (watchId) {
      clearWatchLocation(watchId);
    }
  },
}));
