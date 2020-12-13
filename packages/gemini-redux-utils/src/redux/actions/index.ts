import { IFSA } from '../IFSA';

export function hydrateFromSystem(sysInfo: any): IFSA {
    return {
        type: 'HYDRATE_FROM_SYSTEM',
        payload: {
            sysInfo,
        }
    };
}

export function setFeatureTab(featureTab: string): IFSA {
    return {
        type: 'SET_FEATURE_TAB',
        payload: {
            featureTab,
        }
    };
}
