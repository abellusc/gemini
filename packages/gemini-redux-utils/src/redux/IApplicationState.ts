export interface IApplicationState {
    _loaded: boolean;
    app: IApplicationAppState;
    sys: ISystemInformation | null;
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
    data_directory: string,
}

export interface IError {
    message: string;
    code: number;
}

export interface IApplicationAppState {
    features_available: string[];
    feature_tab: string;
    current_url: string;
    errors: IError[],
    sys_info: {
        cpu: {
            temp: any;
            load: any;
            load_history: number[];
        }
    };
}

export enum SupportedFeature {
    DEFAULT = 'dashboard',
    DASHBOARD = 'home',
    CONFIGURE = 'configure',
    DEPLOY = 'deploy',
    OPTIMIZE = 'optimize',
    VALIDATE = 'validate'
}