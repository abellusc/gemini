import { IError } from '../IApplicationState';
import { IFSA } from '../IFSA';

export function hydrateFromSystem(sysInfo: any): IFSA<any> {
    return {
        type: 'HYDRATE_FROM_SYSTEM',
        payload: {
            sysInfo
        }
    };
}

export function setFeatureTab(featureTab: string): IFSA<any> {
    return {
        type: 'SET_FEATURE_TAB',
        payload: {
            featureTab,
        }
    };
}

export function throwError(code: number, message: string): IFSA<IError> {
    return {
        type: 'THROW_ERROR',
        payload: {
            code,
            message
        },
        error: true,
    }
}
