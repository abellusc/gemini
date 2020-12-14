import { IError } from '../IApplicationState';
import { IFSA } from '../IFSA';

export function hydrateFromSystem(sysInfo: any): IFSA<{sysInfo: any}> {
    return {
        type: 'HYDRATE_FROM_SYSTEM',
        payload: {
            sysInfo
        }
    };
}

export function setFeatureTab(featureTab: string): IFSA<{featureTab: string}> {
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

export function setSystemStatus(status: any): IFSA<{ cpu: any }> {
    return {
        type: 'SET_SYSTEM_STATUS',
        payload: status || null,
    }
}
