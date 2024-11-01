export type AppConfig = {
  port: number;
};

const appConfig = (): AppConfig => ({
  port: +process.env.PORT,
});

export default appConfig;
