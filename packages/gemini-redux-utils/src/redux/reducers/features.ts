import { SupportedFeature } from "../IApplicationState";
import { IFSA } from '../IFSA'

// only accept valid feature names -> active tab
export function setFeatureTab(currentFeatureName: string, featureName: string): string {
    console.log('Received feature tab update:', currentFeatureName, '=>', featureName);
    if (!!((SupportedFeature as any)[featureName])) {
        console.error('unsupported feature:', featureName)
        return currentFeatureName;
    }

    return featureName;
}