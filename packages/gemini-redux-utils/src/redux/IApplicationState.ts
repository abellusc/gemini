export interface IApplicationState {
    _loaded: boolean;
    app: IApplicationAppState;
    sys: ISystemInformation;
}

export interface ISystemInformation {
    platform: {
        name: string;
        version: string;
    },
    gpu: {
        controllers: any[];
    },
    cpu: {
        model: string;
        cores: number;
        speed: string;
    }
}

export interface IApplicationConfig {
    working_directory: string,
    install_directory: string,
    data_directory: string
}

export interface IApplicationAppState {
    features_available: string[];
    feature_tab: string;
}

export enum SupportedFeature {
    DEFAULT = 'dashboard',
    DASHBOARD = 'home',
    CONFIGURE = 'configure',
    DEPLOY = 'deploy',
    OPTIMIZE = 'optimize',
    VALIDATE = 'validate'
}