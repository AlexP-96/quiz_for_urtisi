import { ENVIRONMENT_STATUS } from "../shared/constants";

const productConfig = {
  port: process.env.PORT || 8085,
  jwtSecret: process.env.JWT_SECRET || "alexp",
};

const developmentConfig = {
  port: process.env.PORT || 8085,
  jwtSecret: process.env.JWT_SECRET || "alexp",
}

const config: any = {
  'development': developmentConfig,
  'production': productConfig
}

export default config[process.env.NODE_ENV ?? ENVIRONMENT_STATUS.DEV];