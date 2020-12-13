export interface IApplicationState {
    config: IApplicationConfig;
    app: IApplicationAppState;
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